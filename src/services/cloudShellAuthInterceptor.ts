/**
 * Cloud Shell Authentication Interceptor
 * Intercepts Google OAuth flow and automatically authenticates with our tokens
 */

import { CloudMetadataService } from '../../lib/services/cloudMetadataService';
import { loadGapi, initGapiClient } from '../../lib/api/gapiLoader';

export class CloudShellAuthInterceptor {
  private metadataService: CloudMetadataService;
  private accessToken: string | null = null;
  private isIntercepting = false;

  constructor() {
    this.metadataService = new CloudMetadataService({
      autoRefresh: true,
      refreshBufferMinutes: 5,
    });
  }

  /**
   * Starts intercepting Google authentication and auto-authenticates
   */
  async startInterception(): Promise<void> {
    if (this.isIntercepting) return;

    this.isIntercepting = true;

    // Try to get token from metadata server if in GCP
    try {
      const isCloud = await this.metadataService.isCloudEnvironment();
      if (isCloud) {
        this.accessToken = await this.metadataService.getAccessToken();
        console.log('Got token from metadata server for auto-auth');
      } else {
        // Not in GCP - try to get token from our backend/auth system
        // This would be a service account token or user token
        await this.getTokenFromBackend();
      }
    } catch (err) {
      console.log('Will attempt to get token from backend');
      await this.getTokenFromBackend();
    }

    // Load Google API
    await loadGapi();

    // Intercept gapi.auth2 initialization
    this.interceptGapiAuth2();

    // Intercept OAuth requests
    this.interceptOAuthRequests();

    // Initialize gapi with our credentials
    await this.initializeGapiWithAuth();

    // Set up token refresh
    this.setupTokenRefresh();
  }

  /**
   * Gets token from backend/auth system
   */
  private async getTokenFromBackend(): Promise<void> {
    try {
      // Try to get token from our auth system
      // This could be from Firebase, our backend, or stored credentials
      const response = await fetch('/api/auth/token', {
        method: 'GET',
        credentials: 'include',
      }).catch(() => null);

      if (response?.ok) {
        const data = await response.json();
        if (data.token) {
          this.accessToken = data.token;
          console.log('Got token from backend for auto-auth');
          return;
        }
      }
    } catch (err) {
      // Continue - will try other methods
    }

    // If backend doesn't have token, Cloud Shell will show its own auth
    // But we'll still intercept to provide token if we get one later
    console.log('No backend token available, will intercept OAuth flow');
  }

  /**
   * Sets up automatic token refresh
   */
  private setupTokenRefresh(): void {
    // Refresh token every 50 minutes (tokens typically last 1 hour)
    setInterval(async () => {
      await this.updateToken();
    }, 50 * 60 * 1000);
  }

  /**
   * Intercepts gapi.auth2.init to provide automatic authentication
   */
  private interceptGapiAuth2(): void {
    if (!window.gapi) return;

    // Wait for gapi.auth2 to be available
    const checkAuth2 = setInterval(() => {
      if (window.gapi?.auth2) {
        clearInterval(checkAuth2);
        
        const originalInit = window.gapi.auth2.init;
        window.gapi.auth2.init = async (config: any) => {
          console.log('Intercepting gapi.auth2.init for auto-authentication');
          
          // Call original init
          const authInstance = await originalInit.call(window.gapi.auth2, config);
          
          // Auto-sign in if we have a token
          if (this.accessToken && authInstance) {
            try {
              await this.setAuthToken(authInstance);
            } catch (err) {
              console.error('Failed to auto-authenticate:', err);
            }
          }
          
          return authInstance;
        };
      }
    }, 100);

    // Stop checking after 10 seconds
    setTimeout(() => clearInterval(checkAuth2), 10000);
  }

  /**
   * Sets authentication token on gapi auth instance
   */
  private async setAuthToken(authInstance: any): Promise<void> {
    if (!this.accessToken || !authInstance) return;

    try {
      // Set token on gapi client
      if (window.gapi?.client) {
        window.gapi.client.setToken({
          access_token: this.accessToken,
        });
      }

      // Try to get current user and update with our token
      const currentUser = authInstance.currentUser?.get();
      if (currentUser) {
        // User already signed in, update token
        currentUser.getAuthResponse(true);
      } else {
        // Try to sign in silently with our token
        try {
          await authInstance.signIn({
            prompt: 'none',
          }).catch(() => {
            // If silent sign-in fails, we'll use the token directly
            console.log('Silent sign-in not available, using token directly');
          });
        } catch (err) {
          console.log('Using token-based authentication');
        }
      }
      
      console.log('Auto-authenticated Cloud Shell with token');
    } catch (err) {
      console.error('Error setting auth token:', err);
    }
  }

  /**
   * Intercepts OAuth requests and popups to provide automatic authentication
   */
  private interceptOAuthRequests(): void {
    // Intercept window.open for OAuth popups
    const originalOpen = window.open;
    window.open = function(url?: string | URL, target?: string, features?: string): Window | null {
      const urlStr = url?.toString() || '';
      
      // If this is an OAuth popup, try to auto-authenticate
      if (urlStr.includes('accounts.google.com/o/oauth2') || 
          urlStr.includes('accounts.google.com/ServiceLogin')) {
        console.log('Intercepting OAuth popup:', urlStr);
        
        // If we have a token, we can try to complete OAuth automatically
        // Otherwise, let the popup open normally
      }
      
      return originalOpen.call(window, url, target, features);
    };

    // Intercept fetch requests to OAuth endpoints
    const originalFetch = window.fetch;
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
      
      // Intercept OAuth/auth requests and inject our token
      if ((url.includes('accounts.google.com/o/oauth2') || 
           url.includes('oauth2.googleapis.com') ||
           url.includes('accounts.google.com/ServiceLogin')) &&
          this.accessToken) {
        
        // Add our token to the request
        if (!init) init = {};
        if (!init.headers) init.headers = {};
        
        const headers = init.headers as HeadersInit;
        if (headers instanceof Headers) {
          headers.set('Authorization', `Bearer ${this.accessToken}`);
        } else if (Array.isArray(headers)) {
          headers.push(['Authorization', `Bearer ${this.accessToken}`]);
        } else {
          (headers as Record<string, string>)['Authorization'] = `Bearer ${this.accessToken}`;
        }
      }
      
      return originalFetch(input, init);
    };

    // Also intercept XMLHttpRequest
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method: string, url: string | URL, ...args: any[]) {
      (this as any)._url = url;
      return originalXHROpen.call(this, method, url, ...args);
    };
    
    XMLHttpRequest.prototype.send = function(body?: any) {
      const url = (this as any)._url;
      if (url && (url.includes('accounts.google.com') || url.includes('oauth2')) && 
          this.authInterceptor?.accessToken) {
        this.setRequestHeader('Authorization', `Bearer ${this.authInterceptor.accessToken}`);
      }
      return originalXHRSend.call(this, body);
    };
    
    // Store reference to interceptor
    (XMLHttpRequest.prototype as any).authInterceptor = this;

    // Monitor for OAuth iframes and try to auto-complete
    const observer = new MutationObserver(() => {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach((iframe) => {
        const src = iframe.src || iframe.getAttribute('src');
        if (src && (src.includes('accounts.google.com') || src.includes('oauth2'))) {
          console.log('Detected OAuth iframe, attempting auto-authentication');
          // Try to inject token into iframe (may be blocked by CORS)
          try {
            const iframeWindow = iframe.contentWindow;
            if (iframeWindow && this.accessToken) {
              // This will likely be blocked by CORS, but we try
              (iframeWindow as any).azaleaToken = this.accessToken;
            }
          } catch (e) {
            // CORS blocked - expected
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  /**
   * Initializes gapi client with automatic authentication
   */
  private async initializeGapiWithAuth(): Promise<void> {
    if (!window.gapi || !window.gapi.client) return;

    try {
      // Initialize gapi client with Cloud Shell config
      await initGapiClient({
        apiKey: 'AIzaSyBj8JySZNOCTBCnK2w-CHlwJnpwcQkQ7Hk',
        clientId: '618104708054-9r9s1c4alg36erliucho9t52n32n6dgq.apps.googleusercontent.com',
        discoveryDocs: [
          'https://cloudresourcemanager.googleapis.com/$discovery/rest',
          'https://workstations.googleapis.com/$discovery/rest',
        ],
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/drive',
      });

      // Set access token if available
      if (this.accessToken && window.gapi.client) {
        window.gapi.client.setToken({
          access_token: this.accessToken,
        });
        console.log('Set gapi client token for auto-authentication');
      }
    } catch (err) {
      console.error('Failed to initialize gapi with auth:', err);
    }
  }

  /**
   * Gets the current access token
   */
  getAccessToken(): string | null {
    return this.accessToken;
  }

  /**
   * Updates the access token
   */
  async updateToken(): Promise<void> {
    try {
      const isCloud = await this.metadataService.isCloudEnvironment();
      if (isCloud) {
        this.accessToken = await this.metadataService.getAccessToken();
      }
    } catch (err) {
      console.error('Failed to update token:', err);
    }
  }
}

