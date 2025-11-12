import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../theme/theme';
import { apiFallback, fetchWithFallback, APIFallbackError } from '../../services/apiFallbackService';
import { SessionKeepAlive } from '../../services/sessionKeepAlive';

interface RealCloudShellProps {
  onDesktopClick?: () => void;
  desktopLoading?: boolean;
}

/**
 * Real Google Cloud Shell Component
 * Uses the actual Cloud Shell scripts and rebrands to Azalea
 * Automatically intercepts Google sign-in and authenticates in the background
 */
export const RealCloudShell: React.FC<RealCloudShellProps> = ({
  onDesktopClick,
  desktopLoading,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<'checking' | 'authenticating' | 'authenticated' | 'failed'>('checking');

  useEffect(() => {
    let messageHandler: ((event: MessageEvent) => void) | null = null;
    const keepAliveService = SessionKeepAlive.getInstance();
    
    const initializeCloudShell = async () => {
      try {
        setAuthStatus('checking');
        setAuthStatus('authenticating');
        
        // Load Cloud Shell in iframe - OAuth will work naturally
        await loadCloudShellScripts((handler) => {
          messageHandler = handler;
        });
        
        setAuthStatus('authenticated');
        setLoading(false);
        
        // Start browser-based keep-alive service
        console.log('[Cloud Shell] Starting browser-based session keep-alive...');
        keepAliveService.start(180000); // 3 minutes interval
        
        // Try to inject keep-alive into Cloud Shell iframe
        if (containerRef.current) {
          const iframe = containerRef.current.querySelector('iframe');
          if (iframe) {
            // Wait a bit for Cloud Shell to fully load
            setTimeout(() => {
              keepAliveService.injectIntoCloudShell(iframe);
            }, 10000);
          }
        }
      } catch (err) {
        console.error('Initialization error:', err);
        setError(err instanceof Error ? err.message : 'Initialization failed');
        setAuthStatus('failed');
        setLoading(false);
      }
    };

    initializeCloudShell();
    
    // Cleanup on unmount
    return () => {
      if (messageHandler) {
        window.removeEventListener('message', messageHandler);
      }
      // Stop keep-alive service
      keepAliveService.stop();
    };
  }, []);

  /**
   * Sets up proxy for Cloud Shell API requests to bypass CORS
   * Intercepts ALL requests to shell.cloud.google.com AND our domain's /cloudshell/* paths
   * Also handles OAuth redirects by opening popup windows
   */
  const setupCloudShellProxy = (): void => {
    // Track 401 errors to provide better feedback and trigger OAuth if needed
    let authErrorCount = 0;
    const maxAuthErrors = 5;
    let oauthPopup: Window | null = null;
    
    // Intercept window.open to handle OAuth popups
    const originalOpen = window.open;
    window.open = function(url?: string | URL, target?: string, features?: string): Window | null {
      const urlStr = url?.toString() || '';
      
      // If this is an OAuth popup, open it and monitor for completion
      if (urlStr.includes('accounts.google.com/o/oauth2') || 
          urlStr.includes('accounts.google.com/ServiceLogin') ||
          urlStr.includes('oauth2')) {
        console.log('[Cloud Shell] Opening OAuth popup:', urlStr);
        oauthPopup = originalOpen.call(window, url, target, features);
        
        // Monitor the popup for OAuth completion
        if (oauthPopup) {
          const checkPopup = setInterval(() => {
            try {
              if (oauthPopup?.closed) {
                clearInterval(checkPopup);
                console.log('[Cloud Shell] OAuth popup closed - authentication may have completed');
                // Reset auth error count after OAuth attempt
                authErrorCount = 0;
                // Reload Cloud Shell to retry with new auth
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            } catch (e) {
              // Cross-origin error - popup still open
            }
          }, 500);
        }
        
        return oauthPopup;
      }
      
      return originalOpen.call(window, url, target, features);
    };
    
    // Intercept fetch requests to Cloud Shell
    const originalFetch = window.fetch;
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      try {
        // Normalize URL
        let urlStr: string;
        if (typeof input === 'string') {
          urlStr = input;
        } else if (input instanceof URL) {
          urlStr = input.href;
        } else {
          urlStr = input.url;
        }
        
        // Handle relative URLs
        if (urlStr.startsWith('/')) {
          urlStr = window.location.origin + urlStr;
        } else if (!urlStr.includes('://')) {
          urlStr = new URL(urlStr, window.location.href).href;
        }
        
        // Suppress localhost:3001 errors (WebVM backend is optional)
        if (urlStr.includes('localhost:3001')) {
          // Silently handle - WebVM backend is optional
          try {
            const response = await fetch(urlStr, { ...init, signal: AbortSignal.timeout(1000) });
            return response;
          } catch {
            // Silently fail - fallback will be used
            return new Response(null, { status: 503, statusText: 'Service Unavailable' });
          }
        }
      
      // First, check if this is a call to one of our API endpoints that should use fallback
      // This catches jserror and other API calls from Cloud Shell scripts
      if (urlStr.includes('/api/environment') || 
          urlStr.includes('/api/auth/token') || 
          urlStr.includes('/api/proxy/cloudshell') ||
          urlStr.includes('/clienterror/jserror')) {
        // Use fetchWithFallback for these endpoints
        try {
          const method = init?.method || (typeof input === 'object' && 'method' in input ? (input as Request).method : 'GET');
          if (method === 'GET') {
            return await apiFallback.get(urlStr, init);
          } else if (method === 'POST' || method === 'PUT') {
            const body = init?.body || (typeof input === 'object' && 'body' in input ? (input as Request).body : undefined);
            return method === 'POST' 
              ? await apiFallback.post(urlStr, body, init)
              : await apiFallback.put(urlStr, body, init);
          } else {
            return await fetchWithFallback(urlStr, { ...init, method });
          }
        } catch (error) {
          // Handle API fallback errors
          if (error instanceof APIFallbackError) {
            console.error('[Cloud Shell Proxy]', error.getUserMessage());
          }
          // If fallback fails, try original fetch
          return originalFetch(input, init);
        }
      }
      
      // Don't proxy OAuth requests - they need to go directly to Google
      if (urlStr.includes('accounts.google.com') || 
          urlStr.includes('oauth2.googleapis.com') ||
            urlStr.includes('oauth2') ||
            urlStr.includes('googleapis.com/auth')) {
        return originalFetch(input, init);
      }
      
      // Don't proxy CSP (Content Security Policy) reporting endpoint
      if (urlStr.includes('csp.withgoogle.com')) {
        return originalFetch(input, init);
      }
      
        // Don't proxy gstatic resources directly - they should go through our proxy endpoint
        // But allow if it's already going through our proxy
        if (urlStr.includes('gstatic.com') && !urlStr.includes('/api/proxy/gstatic')) {
          // For scripts, we need to proxy them, but for other resources, direct is fine
          if (urlStr.includes('/_/cloudshell-scs/_/js/')) {
            // This is a Cloud Shell script - should already be handled, but if not, proxy it
            const scriptPath = urlStr.replace('https://www.gstatic.com', '');
            const proxyUrl = `/api/proxy/gstatic?path=${encodeURIComponent(scriptPath)}`;
            return originalFetch(proxyUrl, init);
          }
          return originalFetch(input, init);
        }
        
        // Don't proxy fonts.googleapis.com
        if (urlStr.includes('fonts.googleapis.com') || urlStr.includes('fonts.gstatic.com')) {
          return originalFetch(input, init);
        }
        
        // Block or proxy play.google.com requests (Cloud Shell analytics)
        if (urlStr.includes('play.google.com')) {
          // Block analytics requests to avoid CORS errors
          return new Response(null, { status: 204 }); // No Content
        }
      
        // Proxy ALL requests to shell.cloud.google.com through API proxy
        if (urlStr.includes('shell.cloud.google.com') || urlStr.includes('/cloudshell/') || urlStr.includes('cloudshell.clients6.google.com')) {
          let targetUrl = urlStr;
          
          // Convert relative /cloudshell/* paths to full URLs
          if (urlStr.includes('/cloudshell/') && !urlStr.includes('shell.cloud.google.com')) {
            try {
              const urlObj = new URL(urlStr);
              const path = urlObj.pathname.replace(/^\/cloudshell/, '');
              targetUrl = `https://shell.cloud.google.com${path}${urlObj.search}${urlObj.hash}`;
            } catch (e) {
              console.warn('[Cloud Shell] Failed to parse URL:', urlStr, e);
              return originalFetch(input, init);
            }
          }
          
          // Use API proxy directly (UV proxy disabled due to service worker issues)
        let proxyPath = '';
          try {
            const urlObj = new URL(targetUrl);
            proxyPath = urlObj.pathname + urlObj.search + urlObj.hash;
          } catch (e) {
            console.warn('[Cloud Shell] Failed to parse target URL:', targetUrl, e);
            return originalFetch(input, init);
        }
        
        const proxyUrl = `/api/proxy/cloudshell?path=${encodeURIComponent(proxyPath.replace(/^\//, ''))}`;
        
        try {
            const method = init?.method || (typeof input === 'object' && 'method' in input ? (input as Request).method : 'GET');
            let response: Response;
            
            if (method === 'GET' || method === 'HEAD') {
              response = await apiFallback.get(proxyUrl, {
                ...init,
                headers: {
                  ...init?.headers,
                  'X-Original-URL': targetUrl,
                },
              });
            } else {
              const body = init?.body || (typeof input === 'object' && 'body' in input ? (input as Request).body : undefined);
              if (method === 'POST') {
                response = await apiFallback.post(proxyUrl, body, {
                  ...init,
                  headers: {
                    ...init?.headers,
                    'X-Original-URL': targetUrl,
                  },
                });
              } else if (method === 'PUT') {
                response = await apiFallback.put(proxyUrl, body, {
          ...init,
          headers: {
            ...init?.headers,
            'X-Original-URL': targetUrl,
          },
        });
              } else {
                response = await fetchWithFallback(proxyUrl, {
                  ...init,
                  method,
                  headers: {
                    ...init?.headers,
                    'X-Original-URL': targetUrl,
                  },
                });
              }
            }
          
          // Track 401 errors (expected during OAuth flow)
          if (response.status === 401) {
            authErrorCount++;
            // Don't log 401s as errors - they're expected during authentication
            // Suppress console errors for 401s during initial auth
            if (authErrorCount <= maxAuthErrors) {
              // Only log first few 401s, then suppress
              if (authErrorCount <= 2) {
              console.log(`[Cloud Shell] Authentication required (${authErrorCount}/${maxAuthErrors}) - OAuth flow will be triggered automatically`);
              }
            }
            
            // If we get too many 401s and no OAuth popup is open, try to trigger OAuth manually
            if (authErrorCount >= 3 && !oauthPopup) {
              console.log('[Cloud Shell] Multiple 401 errors detected - attempting to trigger OAuth');
              // Try to open OAuth directly
              const oauthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=618104708054-9r9s1c4alg36erliucho9t52n32n6dgq.apps.googleusercontent.com&redirect_uri=https://shell.cloud.google.com/oauth2callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/drive`;
              oauthPopup = window.open(oauthUrl, 'oauth', 'width=500,height=600');
            }
            
            // Return response but suppress error logging
            // Create a response that won't trigger console errors
            return new Response(response.body, {
              status: 401,
              statusText: 'Unauthorized',
              headers: response.headers,
            });
          } else if (response.status < 400) {
            // Reset counter on successful requests
            authErrorCount = 0;
          }
          
          return response;
        } catch (error) {
          // If it's a 401, it's expected during OAuth - don't treat as error
          if (error instanceof APIFallbackError && error.vercelStatus === 401) {
            authErrorCount++;
            // Suppress logging after first few 401s
            if (authErrorCount <= 2) {
              console.log(`[Cloud Shell] Authentication required (${authErrorCount}/${maxAuthErrors}) - OAuth flow will be triggered automatically`);
            }
            // Return a response-like object for 401s (suppress console errors)
            return new Response(null, { status: 401, statusText: 'Unauthorized' });
          }
          // For other errors, try original fetch as last resort
          // Only log if it's not a connection refused error (expected for localhost:3001)
          if (!(error instanceof Error && error.message.includes('ERR_CONNECTION_REFUSED'))) {
            console.warn('[Cloud Shell] Proxy error, trying direct fetch:', error);
          }
          return originalFetch(input, init);
        }
      }
      
      return originalFetch(input, init);
      } catch (error) {
        // If anything goes wrong, fall back to original fetch
        console.warn('[Cloud Shell] Fetch interceptor error:', error);
        return originalFetch(input, init);
      }
    };

    // Also intercept XMLHttpRequest (Cloud Shell uses this heavily)
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method: string, url: string | URL, async?: boolean, username?: string | null, password?: string | null) {
      try {
        let urlStr = url.toString();
        
        // Handle relative URLs
        if (urlStr.startsWith('/')) {
          urlStr = window.location.origin + urlStr;
        } else if (!urlStr.includes('://')) {
          urlStr = new URL(urlStr, window.location.href).href;
        }
      
      // Don't proxy OAuth requests - they need to go directly to Google
      if (urlStr.includes('accounts.google.com') || 
          urlStr.includes('oauth2.googleapis.com') ||
            urlStr.includes('oauth2') ||
            urlStr.includes('googleapis.com/auth')) {
        return originalXHROpen.call(this, method, url, async ?? true, username ?? null, password ?? null);
      }
      
      // Don't proxy CSP (Content Security Policy) reporting endpoint
      if (urlStr.includes('csp.withgoogle.com')) {
        return originalXHROpen.call(this, method, url, async ?? true, username ?? null, password ?? null);
      }
      
        // Don't proxy gstatic resources
        if (urlStr.includes('gstatic.com')) {
          return originalXHROpen.call(this, method, url, async ?? true, username ?? null, password ?? null);
        }
        
        // Don't proxy fonts.googleapis.com
        if (urlStr.includes('fonts.googleapis.com') || urlStr.includes('fonts.gstatic.com')) {
          return originalXHROpen.call(this, method, url, async ?? true, username ?? null, password ?? null);
        }
        
        // Suppress localhost:3001 errors (WebVM backend is optional)
        if (urlStr.includes('localhost:3001')) {
          // Silently handle - return a dummy URL that will fail gracefully
          return originalXHROpen.call(this, method, 'about:blank', async ?? true, username ?? null, password ?? null);
        }
        
        // Block play.google.com requests (Cloud Shell analytics)
        if (urlStr.includes('play.google.com')) {
          // Return a dummy URL that will fail gracefully
          return originalXHROpen.call(this, method, 'about:blank', async ?? true, username ?? null, password ?? null);
        }
      
        // Proxy ALL Cloud Shell requests - both shell.cloud.google.com and our domain's /cloudshell/*
        if (urlStr.includes('shell.cloud.google.com') || urlStr.includes('/cloudshell/') || urlStr.includes('cloudshell.clients6.google.com')) {
          let targetUrl = urlStr;
          
          // Convert relative /cloudshell/* paths to full URLs
          if (urlStr.includes('/cloudshell/') && !urlStr.includes('shell.cloud.google.com')) {
            try {
              const urlObj = new URL(urlStr);
              const path = urlObj.pathname.replace(/^\/cloudshell/, '');
              targetUrl = `https://shell.cloud.google.com${path}${urlObj.search}${urlObj.hash}`;
          } catch (e) {
              console.warn('[Cloud Shell] Failed to parse XHR URL:', urlStr, e);
              return originalXHROpen.call(this, method, url, async ?? true, username ?? null, password ?? null);
          }
        }
        
          // Use API proxy directly (UV proxy disabled)
        let proxyPath = '';
          try {
            const urlObj = new URL(targetUrl);
            proxyPath = urlObj.pathname + urlObj.search + urlObj.hash;
          } catch (e) {
            console.warn('[Cloud Shell] Failed to parse XHR target URL:', targetUrl, e);
            return originalXHROpen.call(this, method, url, async ?? true, username ?? null, password ?? null);
        }
        
        const proxyUrl = `/api/proxy/cloudshell?path=${encodeURIComponent(proxyPath.replace(/^\//, ''))}`;
        (this as any)._proxied = true;
        (this as any)._originalUrl = targetUrl;
        (this as any)._proxyUrl = proxyUrl;
        (this as any)._method = method;
        (this as any)._useUVProxy = false;
        return originalXHROpen.call(this, method, proxyUrl, async ?? true, username ?? null, password ?? null);
      }
      
      return originalXHROpen.call(this, method, url, async ?? true, username ?? null, password ?? null);
      } catch (error) {
        console.warn('[Cloud Shell] XHR open interceptor error:', error);
        return originalXHROpen.call(this, method, url, async ?? true, username ?? null, password ?? null);
      }
    };
    
    XMLHttpRequest.prototype.send = function(body?: Document | XMLHttpRequestBodyInit | null) {
      if ((this as any)._proxied) {
        try {
        // Set withCredentials for UV proxy requests (important for cookies)
        if ((this as any)._useUVProxy && (this as any)._withCredentials) {
          this.withCredentials = true;
        }
        
        // Add X-Original-URL header for API proxy requests (not needed for UV proxy)
        if (!(this as any)._useUVProxy) {
            try {
          this.setRequestHeader('X-Original-URL', (this as any)._originalUrl);
            } catch (e) {
              // Header might already be set, ignore
            }
          }
          
          // Suppress 401 errors from showing in console
          const originalOnError = this.onerror;
          const originalOnLoad = this.onload;
          this.onerror = function(event) {
            // Suppress 401 errors (expected during OAuth)
            if (this.status === 401) {
              // Don't call original error handler for 401s
              return;
            }
            if (originalOnError) {
              originalOnError.call(this, event);
            }
          };
        } catch (e) {
          // Silently ignore errors
        }
      }
      return originalXHRSend.call(this, body);
    };
    
    // Intercept WebSocket connections (Cloud Shell may use WebSockets)
    const originalWebSocket = (window as any).WebSocket;
    if (originalWebSocket) {
      (window as any).WebSocket = function(url: string | URL, protocols?: string | string[]) {
        const urlStr = typeof url === 'string' ? url : url.toString();
        
        // Don't proxy OAuth WebSockets
        if (urlStr.includes('accounts.google.com') || 
            urlStr.includes('oauth2.googleapis.com')) {
          return new originalWebSocket(url, protocols);
        }
        
        // Proxy Cloud Shell WebSocket connections
        if (urlStr.includes('shell.cloud.google.com') || urlStr.includes('cloudshell.clients6.google.com')) {
          // For now, allow direct WebSocket connections
          // WebSocket proxying would require a more complex setup
          console.log('[Cloud Shell] WebSocket connection:', urlStr);
          return new originalWebSocket(url, protocols);
        }
        
        return new originalWebSocket(url, protocols);
      };
      
      // Copy static properties
      Object.setPrototypeOf((window as any).WebSocket, originalWebSocket);
      Object.setPrototypeOf((window as any).WebSocket.prototype, originalWebSocket.prototype);
    }
  };

  /**
   * Applies Azalea branding to Cloud Shell UI
   */
  const applyAzaleaBranding = () => {
    // Inject custom CSS for rebranding
    const style = document.createElement('style');
    style.id = 'azalea-cloudshell-branding';
    style.textContent = `
      /* Rebrand Cloud Shell to Azalea */
      .csh-app-header,
      .csh-app-title,
      [class*="header"],
      [class*="title"] {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
      }
      
      /* Hide Google branding where possible */
      [class*="google"],
      [class*="gcp"] {
        opacity: 0.8;
      }
      
      /* Azalea accent colors */
      .csh-app [class*="primary"],
      .csh-app [class*="accent"] {
        color: ${theme.accent} !important;
      }
      
      /* Custom Azalea styling */
      .azalea-brand {
        display: inline-block;
        font-weight: 600;
        color: ${theme.accent};
      }
    `;
    
    if (!document.getElementById('azalea-cloudshell-branding')) {
      document.head.appendChild(style);
    }

    // Update page title
    document.title = 'Azalea Cloud Shell';

    // Try to update any visible branding text
    const observer = new MutationObserver(() => {
      // Look for Google/Cloud Shell branding and replace with Azalea
      const elements = document.querySelectorAll('[class*="title"], [class*="brand"], [class*="header"]');
      elements.forEach((el) => {
        if (el.textContent?.includes('Google') || el.textContent?.includes('Cloud Shell')) {
          el.textContent = el.textContent
            .replace(/Google Cloud Shell/g, 'Azalea Cloud Shell')
            .replace(/Google/g, 'Azalea');
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  };

  const loadCloudShellScripts = async (onMessageHandler?: (handler: (event: MessageEvent) => void) => void): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!containerRef.current) {
        reject(new Error('Container not available'));
        return;
      }

      // Note: shell.cloud.google.com sets X-Frame-Options: deny, so we can't use iframe
      // Instead, we load Cloud Shell scripts directly and handle OAuth via popup/redirect

      // Set up ppConfig (required by Cloud Shell) - MUST be set before any scripts load
      (window as any).ppConfig = {
        productName: 'a8a32321959c812aaca06d2067277be7',
        deleteIsEnforced: false,
        sealIsEnforced: false,
        heartbeatRate: 0.5,
        periodicReportingRateMillis: 60000.0,
        disableAllReporting: false
      };

      // Set CSH_SERVER_VARS (Cloud Shell server variables) - MUST be set before scripts load
      // Use the EXACT same encoded string from shell.html
      (window as any).CSH_SERVER_VARS = "\x5b\x5b\x22mynameisrohanandthisismyemail@gmail.com\x22,\x220\x22,\x22Rohan\x22,\x22Salem\x22\x5d,\x5b\x22https:\/\/shell.cloud.google.com\x22,\x22https:\/\/cloudshell.clients6.google.com\x22,\x22cloud-sshrelay-server_20251105.01_RC00\x22,null,\x22618104708054-9r9s1c4alg36erliucho9t52n32n6dgq.apps.googleusercontent.com\x22,\x22AIzaSyBj8JySZNOCTBCnK2w-CHlwJnpwcQkQ7Hk\x22,\x22https:\/\/cloudresourcemanager.clients6.google.com\x22,\x5bnull,null,null,\x22https:\/\/www.gstatic.com\/devops\/connect\/loader\/tool_library.js\x22\x5d,\x22https:\/\/www.googleapis.com\/auth\/userinfo.email https:\/\/www.googleapis.com\/auth\/userinfo.profile https:\/\/www.googleapis.com\/auth\/cloud-platform https:\/\/www.googleapis.com\/auth\/drive\x22,60,\x22https:\/\/workstations.googleapis.com\x22\x5d,\x5bnull,null,null,null,null,null,\x5b\x5bnull,102163142\x5d,\x5bnull,102162558\x5d,\x5bnull,115965161\x5d,\x5bnull,70980719\x5d,\x5bnull,71639050\x5d,\x5bnull,44537330\x5d,\x5bnull,44536920\x5d,\x5bnull,18800188\x5d,\x5bnull,103035570\x5d,\x5bnull,105075601\x5d,\x5bnull,44490095\x5d\x5d,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,1,null,null,1,null,null,null,null,1,null,null,null,null,1,null,1,null,null,1,null,null,1,1,1,null,1,1,1,null,null,1,null,null,null,null,1\x5d,null,\x5b\x5b\x22xtemp.xemail@gmail.com\x22,\x221\x22,\x22Temp\x22\x5d,\x5b\x22incogito.acc@gmail.com\x22,\x222\x22,\x22Incog\x22\x5d,\x5b\x22rndm.grpe@gmail.com\x22,\x223\x22,\x22Rohan\x22\x5d,\x5b\x22rohansalemisapro@gmail.com\x22,\x224\x22,\x22rohan\x22,\x22salem\x22\x5d,\x5b\x22rohansalem8@gmail.com\x22,\x225\x22,\x22Rohan\x22,\x22Salem\x22\x5d,\x5b\x22rndm.ptato@gmail.com\x22,\x226\x22,\x22Potato\x22\x5d\x5d,\x5b\x5b\x22gcr.io\/cloudshell-images\/cloudshell:latest\x22,\x22gcr.io\/cloudrun\/button:latest\x22,\x22gcr.io\/ds-artifacts-cloudshell\/deploystack_custom_image\x22\x5d,\x5b\x22github.com\/google\/\x22,\x22github.com\/googlestaging\/\x22,\x22github.com\/googleapis\/\x22,\x22github.com\/googlecloudplatform\/\x22,\x22github.com\/googlemaps\/\x22,\x22github.com\/googleworkspace\/\x22,\x22github.com\/terraform-google-modules\/\x22,\x22go.googlesource.com\/\x22\x5d,\x5b\x22github.com\/GoogleContainerTools\/skaffold\x22\x5d\x5d,\x5b\x5d,\x5b\x5b\x22github.com\/OnlineHacKing\/\x22,\x22github.com\/Bhaviktutorials\/\x22,\x22github.com\/sherlock-project\/\x22,\x22github.com\/htr-tech\/zphisher\/\x22,\x22github.com\/soxoj\/maigret\/\x22,\x22github.com\/fikrado\/\x22\x5d,\x5b\x22github.com\/JoelGMSec\/Cloudtopolis\x22\x5d\x5d\x5d";
      (window as any).CSH_LOAD_T0 = Date.now();

      // Define _DumpException function (required by Cloud Shell)
      (window as any)._DumpException = function(e: any) {
        console.error('[Cloud Shell] Error:', e);
        // Don't throw - Cloud Shell handles errors internally
      };

      // Create the Cloud Shell root element
      const cloudShellRoot = document.createElement('cloud-shell-root');
      cloudShellRoot.className = 'csh-app';
      containerRef.current.appendChild(cloudShellRoot);

      // Add body class for Cloud Shell styling
      document.body.classList.add('csh-app-body', 'mat-app-background');

      // Set base href (required by Cloud Shell) - MUST be set before scripts load
        const baseElement = document.querySelector('base');
        if (!baseElement) {
          const base = document.createElement('base');
          base.href = '/';
          document.head.insertBefore(base, document.head.firstChild);
        }

      // Load CSS first (required for proper rendering)
      const loadCSS = (href: string): Promise<void> => {
        return new Promise((resolve, reject) => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = href;
          link.onload = () => resolve();
          link.onerror = () => {
            console.warn(`[Cloud Shell] Failed to load CSS: ${href}`);
            resolve(); // Continue even if CSS fails
          };
          document.head.appendChild(link);
        });
      };

      // UV proxy disabled - service worker has issues
      // Using API proxy directly for better reliability
      const loadUVProxy = async (): Promise<boolean> => {
        // UV proxy disabled until service worker issues are resolved
        return false;
      };
      
      // Main loading sequence
      const initializeCloudShell = async () => {
        try {
          // Step 1: Load CSS files in parallel
          console.log('[Cloud Shell] Loading CSS files...');
          await Promise.all([
            loadCSS('https://www.gstatic.com/_/cloudshell-scs/_/ss/k=cloudshell-scs.csh.REhykk9w-JI.L.W.O/am=AAAD/d=0/rs=AKpenNb-zyE8LdUST7d_ssVbEfzNbhCdZQ/m=cloudshell'),
            loadCSS('https://fonts.googleapis.com/icon?family=Material+Icons'),
            loadCSS('https://fonts.googleapis.com/css?family=Google+Material+Icons')
          ]);
          console.log('[Cloud Shell] CSS files loaded');

          // Step 2: Skip UV proxy for now (service worker issues)
          // UV proxy is disabled until service worker issues are resolved
          console.log('[Cloud Shell] Skipping UV proxy (using API proxy directly)');
          const uvReady = false; // Disabled for now

          // Step 3: Set up proxy interceptors (MUST be before Cloud Shell scripts load)
          console.log('[Cloud Shell] Setting up proxy interceptors...');
          setupCloudShellProxy();
          console.log('[Cloud Shell] Proxy interceptors ready');

          // Step 4: Load main Cloud Shell script (proxied to avoid CORS)
          console.log('[Cloud Shell] Loading main Cloud Shell script...');
          const scriptUrl = 'https://www.gstatic.com/_/cloudshell-scs/_/js/k=cloudshell-scs.csh.en.AYpRfyRWRGQ.es5.O/am=AAAD/d=1/rs=AKpenNb23Sc0ShEzLJnDAJFR8jOOG-NU6A/m=cloudshell';
          // Proxy through our API to avoid CORS
          const scriptPath = scriptUrl.replace('https://www.gstatic.com', '');
          const proxiedScriptUrl = `/api/proxy/gstatic?path=${encodeURIComponent(scriptPath)}`;
          
          // Load script via fetch and inject it to avoid CORS issues
          try {
            const scriptResponse = await fetch(proxiedScriptUrl);
            if (!scriptResponse.ok) {
              throw new Error(`Failed to fetch script: ${scriptResponse.status} ${scriptResponse.statusText}`);
            }
            
            const scriptContent = await scriptResponse.text();
            
            // Create and inject script
        const script = document.createElement('script');
            script.textContent = scriptContent;
            script.async = false;
            
        script.onload = () => {
          (window as any).CSH_LOAD_T1 = Date.now();
              const loadTime = ((window as any).CSH_LOAD_T1 - (window as any).CSH_LOAD_T0) / 1000;
              console.log(`[Cloud Shell] Main script loaded in ${loadTime.toFixed(2)}s`);
              console.log('[Cloud Shell] Azalea Cloud Shell initialized');
              console.log('[Cloud Shell] API requests will be proxied through', uvReady ? 'UV proxy' : 'API proxy');
              
              // Inject keep-alive script into Cloud Shell context
              try {
                // Inject server-side keep-alive setup script
                const keepAliveScript = `
                  (function() {
                    console.log('[Cloud Shell] Injecting keep-alive setup...');
                    // This will be executed in Cloud Shell context
                    // The actual keep-alive will be set up via .customize_environment script
                    if (typeof window !== 'undefined') {
                      window.__azaleaKeepAliveEnabled = true;
                      console.log('[Cloud Shell] Keep-alive enabled in Cloud Shell context');
                    }
                  })();
                `;
                const keepAliveElement = document.createElement('script');
                keepAliveElement.textContent = keepAliveScript;
                document.head.appendChild(keepAliveElement);
              } catch (e) {
                console.warn('[Cloud Shell] Failed to inject keep-alive script:', e);
              }
              
              // Give Cloud Shell a moment to initialize and render
          setTimeout(() => {
                // Check if Cloud Shell has initialized
                const rootElement = document.querySelector('cloud-shell-root');
                if (rootElement && rootElement.children.length > 0) {
                  console.log('[Cloud Shell] Cloud Shell UI rendered successfully');
                } else {
                  console.warn('[Cloud Shell] Cloud Shell UI not yet rendered, but script loaded');
                }
            resolve();
              }, 1000);
        };
            
        script.onerror = (error) => {
              console.error('[Cloud Shell] Failed to execute main script:', error);
              reject(new Error('Failed to execute Cloud Shell script'));
        };
            
        document.head.appendChild(script);
          } catch (fetchError) {
            console.error('[Cloud Shell] Failed to fetch main script:', fetchError);
            reject(new Error(`Failed to load Cloud Shell script: ${fetchError instanceof Error ? fetchError.message : 'Unknown error'}`));
          }
        } catch (error) {
          console.error('[Cloud Shell] Initialization error:', error);
          reject(error instanceof Error ? error : new Error('Unknown initialization error'));
        }
      };

      // Start initialization
      initializeCloudShell();
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.surface,
        position: 'relative',
      }}
    >
      {/* Loading/Auth Status */}
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.surface,
            zIndex: 10,
            gap: '24px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            {authStatus === 'checking' && (
              <>
                <span className="material-icons" style={{ fontSize: '48px', color: theme.accent, marginBottom: '16px', display: 'block' }}>
                  cloud
                </span>
                <div style={{ fontSize: '18px', fontWeight: 600, color: theme.text, marginBottom: '8px' }}>
                  Initializing Azalea Cloud Shell...
                </div>
                <div style={{ fontSize: '14px', color: theme.textSecondary }}>
                  Setting up automatic authentication
                </div>
              </>
            )}
            {authStatus === 'authenticating' && (
              <>
                <span className="material-icons" style={{ fontSize: '48px', color: theme.accent, marginBottom: '16px', display: 'block', animation: 'spin 1s linear infinite' }}>
                  refresh
                </span>
                <div style={{ fontSize: '18px', fontWeight: 600, color: theme.text, marginBottom: '8px' }}>
                  Authenticating Automatically...
                </div>
                <div style={{ fontSize: '14px', color: theme.textSecondary }}>
                  Using metadata server authentication
                </div>
              </>
            )}
            {authStatus === 'authenticated' && (
              <>
                <span className="material-icons" style={{ fontSize: '48px', color: theme.success, marginBottom: '16px', display: 'block' }}>
                  check_circle
                </span>
                <div style={{ fontSize: '18px', fontWeight: 600, color: theme.text, marginBottom: '8px' }}>
                  Loading Azalea Cloud Shell...
                </div>
                <div style={{ fontSize: '14px', color: theme.textSecondary, marginBottom: '12px' }}>
                  Cloud Shell will handle authentication automatically
                </div>
                <div style={{ fontSize: '12px', color: theme.textSecondary, opacity: 0.7, maxWidth: '400px', lineHeight: '1.5' }}>
                  Note: You may see 401 errors in the console during initial authentication. This is normal - Cloud Shell will automatically open an OAuth popup to complete authentication.
                </div>
              </>
            )}
            {authStatus === 'failed' && error && (
              <>
                <span className="material-icons" style={{ fontSize: '48px', color: theme.error, marginBottom: '16px', display: 'block' }}>
                  error_outline
                </span>
                <div style={{ fontSize: '18px', fontWeight: 600, color: theme.error, marginBottom: '8px' }}>
                  Authentication Failed
                </div>
                <div style={{ fontSize: '14px', color: theme.textSecondary }}>
                  {error}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            padding: '48px',
            textAlign: 'center',
          }}
        >
          <span className="material-icons" style={{ fontSize: '64px', color: theme.error }}>
            error_outline
          </span>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: theme.error, marginBottom: '12px' }}>
              Failed to Load Cloud Shell
            </div>
            <div style={{ fontSize: '16px', color: theme.textSecondary, marginBottom: '24px' }}>
              {error}
            </div>
            <button
              onClick={() => {
                setError(null);
                setLoading(true);
                setAuthStatus('checking');
                // Retry initialization
                const initializeCloudShell = async () => {
                  try {
                    await loadCloudShellScripts();
                    setLoading(false);
                    setAuthStatus('authenticated');
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Initialization failed');
                    setLoading(false);
                  }
                };
                initializeCloudShell();
              }}
              style={{
                padding: '12px 24px',
                backgroundColor: theme.accent,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 600,
                marginTop: '16px',
              }}
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
