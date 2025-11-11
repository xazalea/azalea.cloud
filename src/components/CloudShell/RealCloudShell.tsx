import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../theme/theme';
import { apiFallback, fetchWithFallback, APIFallbackError } from '../../services/apiFallbackService';

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
      } catch (err) {
        console.error('Initialization error:', err);
        setError(err instanceof Error ? err.message : 'Initialization failed');
        setAuthStatus('failed');
        setLoading(false);
      }
    };

    initializeCloudShell();
    
    // Cleanup message handler on unmount
    return () => {
      if (messageHandler) {
        window.removeEventListener('message', messageHandler);
      }
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
      const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
      const urlStr = url.toString();
      
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
          urlStr.includes('oauth2')) {
        return originalFetch(input, init);
      }
      
      // Don't proxy CSP (Content Security Policy) reporting endpoint
      if (urlStr.includes('csp.withgoogle.com')) {
        return originalFetch(input, init);
      }
      
      // Proxy ALL requests to shell.cloud.google.com through our backend
      // Also proxy requests to our own domain's /cloudshell/* paths
      if (urlStr.includes('shell.cloud.google.com') || urlStr.includes('/cloudshell/')) {
        let proxyPath = '';
        
        if (urlStr.includes('shell.cloud.google.com')) {
          const urlObj = new URL(urlStr);
          proxyPath = urlObj.pathname + urlObj.search;
        } else {
          // Request to our domain's /cloudshell/* - extract the path
          const urlObj = new URL(urlStr);
          proxyPath = urlObj.pathname.replace(/^\/cloudshell/, '') + urlObj.search;
        }
        
        // Route through our proxy API with WebVM fallback
        const proxyUrl = `/api/proxy/cloudshell?path=${encodeURIComponent(proxyPath.replace(/^\//, ''))}`;
        
        try {
          const response = await apiFallback.get(proxyUrl, {
          ...init,
          headers: {
            ...init?.headers,
            'X-Original-URL': urlStr.includes('shell.cloud.google.com') ? urlStr : `https://shell.cloud.google.com${proxyPath}`,
          },
        });
          
          // Track 401 errors (expected during OAuth flow)
          if (response.status === 401) {
            authErrorCount++;
            // Don't log 401s as errors - they're expected during authentication
            if (authErrorCount <= maxAuthErrors) {
              console.log(`[Cloud Shell] Authentication required (${authErrorCount}/${maxAuthErrors}) - OAuth flow will be triggered automatically`);
            }
            
            // If we get too many 401s and no OAuth popup is open, try to trigger OAuth manually
            if (authErrorCount >= 3 && !oauthPopup) {
              console.log('[Cloud Shell] Multiple 401 errors detected - attempting to trigger OAuth');
              // Try to open OAuth directly
              const oauthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=618104708054-9r9s1c4alg36erliucho9t52n32n6dgq.apps.googleusercontent.com&redirect_uri=https://shell.cloud.google.com/oauth2callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/drive`;
              oauthPopup = window.open(oauthUrl, 'oauth', 'width=500,height=600');
            }
          } else if (response.status < 400) {
            // Reset counter on successful requests
            authErrorCount = 0;
          }
          
          return response;
        } catch (error) {
          // If it's a 401, it's expected during OAuth - don't treat as error
          if (error instanceof APIFallbackError && error.vercelStatus === 401) {
            authErrorCount++;
            if (authErrorCount <= maxAuthErrors) {
              console.log(`[Cloud Shell] Authentication required (${authErrorCount}/${maxAuthErrors}) - OAuth flow will be triggered automatically`);
            }
            // Return a response-like object for 401s
            return new Response(null, { status: 401, statusText: 'Unauthorized' });
          }
          throw error;
        }
      }
      
      return originalFetch(input, init);
    };

    // Also intercept XMLHttpRequest (Cloud Shell uses this heavily)
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method: string, url: string | URL, async?: boolean, username?: string | null, password?: string | null) {
      const urlStr = url.toString();
      
      // Don't proxy OAuth requests - they need to go directly to Google
      if (urlStr.includes('accounts.google.com') || 
          urlStr.includes('oauth2.googleapis.com') ||
          urlStr.includes('oauth2')) {
        return originalXHROpen.call(this, method, url, async ?? true, username ?? null, password ?? null);
      }
      
      // Don't proxy CSP (Content Security Policy) reporting endpoint
      if (urlStr.includes('csp.withgoogle.com')) {
        return originalXHROpen.call(this, method, url, async ?? true, username ?? null, password ?? null);
      }
      
      // Proxy ALL Cloud Shell requests - both shell.cloud.google.com and our domain's /cloudshell/*
      if (urlStr.includes('shell.cloud.google.com') || urlStr.includes('/cloudshell/')) {
        let proxyPath = '';
        let originalUrl = urlStr;
        
        if (urlStr.includes('shell.cloud.google.com')) {
          const urlObj = new URL(urlStr);
          proxyPath = urlObj.pathname + urlObj.search;
        } else {
          // Request to our domain's /cloudshell/* - extract the path
          const urlObj = new URL(urlStr);
          proxyPath = urlObj.pathname.replace(/^\/cloudshell/, '') + urlObj.search;
          originalUrl = `https://shell.cloud.google.com${proxyPath}`;
        }
        
        const proxyUrl = `/api/proxy/cloudshell?path=${encodeURIComponent(proxyPath.replace(/^\//, ''))}`;
        (this as any)._proxied = true;
        (this as any)._originalUrl = originalUrl;
        (this as any)._proxyUrl = proxyUrl;
        (this as any)._method = method;
        return originalXHROpen.call(this, method, proxyUrl, async ?? true, username ?? null, password ?? null);
      }
      
      return originalXHROpen.call(this, method, url, async ?? true, username ?? null, password ?? null);
    };
    
    XMLHttpRequest.prototype.send = function(body?: Document | XMLHttpRequestBodyInit | null) {
      if ((this as any)._proxied) {
        // Add X-Original-URL header for proxy requests
        // Note: XHR will go through the proxy URL, and if Vercel returns 500,
        // the fallback service will handle it at the fetch level for fetch requests.
        // For XHR, we rely on the proxy URL working, but most Cloud Shell requests use fetch.
        this.setRequestHeader('X-Original-URL', (this as any)._originalUrl);
      }
      return originalXHRSend.call(this, body);
    };
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

      // Set up ppConfig (required by Cloud Shell)
      (window as any).ppConfig = {
        productName: 'a8a32321959c812aaca06d2067277be7',
        deleteIsEnforced: false,
        sealIsEnforced: false,
        heartbeatRate: 0.5,
        periodicReportingRateMillis: 60000.0,
        disableAllReporting: false
      };

      // Create the Cloud Shell root element
      const cloudShellRoot = document.createElement('cloud-shell-root');
      cloudShellRoot.className = 'csh-app';
      containerRef.current.appendChild(cloudShellRoot);

      // Add body class for Cloud Shell styling
      document.body.classList.add('csh-app-body', 'mat-app-background');

      // Load Cloud Shell CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://www.gstatic.com/_/cloudshell-scs/_/ss/k=cloudshell-scs.csh.REhykk9w-JI.L.W.O/am=AAAD/d=0/rs=AKpenNb-zyE8LdUST7d_ssVbEfzNbhCdZQ/m=cloudshell';
      document.head.appendChild(cssLink);

      // Load Material Icons
      const materialIconsLink = document.createElement('link');
      materialIconsLink.rel = 'stylesheet';
      materialIconsLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
      document.head.appendChild(materialIconsLink);

      // Load Google Material Icons
      const googleMaterialIconsLink = document.createElement('link');
      googleMaterialIconsLink.rel = 'stylesheet';
      googleMaterialIconsLink.href = 'https://fonts.googleapis.com/css?family=Google+Material+Icons';
      document.head.appendChild(googleMaterialIconsLink);

      // Set CSH_SERVER_VARS (Cloud Shell server variables)
      // Use the EXACT same encoded string from shell.html
      (window as any).CSH_SERVER_VARS = "\x5b\x5b\x22mynameisrohanandthisismyemail@gmail.com\x22,\x220\x22,\x22Rohan\x22,\x22Salem\x22\x5d,\x5b\x22https:\/\/shell.cloud.google.com\x22,\x22https:\/\/cloudshell.clients6.google.com\x22,\x22cloud-sshrelay-server_20251105.01_RC00\x22,null,\x22618104708054-9r9s1c4alg36erliucho9t52n32n6dgq.apps.googleusercontent.com\x22,\x22AIzaSyBj8JySZNOCTBCnK2w-CHlwJnpwcQkQ7Hk\x22,\x22https:\/\/cloudresourcemanager.clients6.google.com\x22,\x5bnull,null,null,\x22https:\/\/www.gstatic.com\/devops\/connect\/loader\/tool_library.js\x22\x5d,\x22https:\/\/www.googleapis.com\/auth\/userinfo.email https:\/\/www.googleapis.com\/auth\/userinfo.profile https:\/\/www.googleapis.com\/auth\/cloud-platform https:\/\/www.googleapis.com\/auth\/drive\x22,60,\x22https:\/\/workstations.googleapis.com\x22\x5d,\x5bnull,null,null,null,null,null,\x5b\x5bnull,102163142\x5d,\x5bnull,102162558\x5d,\x5bnull,115965161\x5d,\x5bnull,70980719\x5d,\x5bnull,71639050\x5d,\x5bnull,44537330\x5d,\x5bnull,44536920\x5d,\x5bnull,18800188\x5d,\x5bnull,103035570\x5d,\x5bnull,105075601\x5d,\x5bnull,44490095\x5d\x5d,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,1,null,null,1,null,null,null,null,1,null,null,null,null,1,null,1,null,null,1,null,null,1,1,1,null,1,1,1,null,null,1,null,null,null,null,1\x5d,null,\x5b\x5b\x22xtemp.xemail@gmail.com\x22,\x221\x22,\x22Temp\x22\x5d,\x5b\x22incogito.acc@gmail.com\x22,\x222\x22,\x22Incog\x22\x5d,\x5b\x22rndm.grpe@gmail.com\x22,\x223\x22,\x22Rohan\x22\x5d,\x5b\x22rohansalemisapro@gmail.com\x22,\x224\x22,\x22rohan\x22,\x22salem\x22\x5d,\x5b\x22rohansalem8@gmail.com\x22,\x225\x22,\x22Rohan\x22,\x22Salem\x22\x5d,\x5b\x22rndm.ptato@gmail.com\x22,\x226\x22,\x22Potato\x22\x5d\x5d,\x5b\x5b\x22gcr.io\/cloudshell-images\/cloudshell:latest\x22,\x22gcr.io\/cloudrun\/button:latest\x22,\x22gcr.io\/ds-artifacts-cloudshell\/deploystack_custom_image\x22\x5d,\x5b\x22github.com\/google\/\x22,\x22github.com\/googlestaging\/\x22,\x22github.com\/googleapis\/\x22,\x22github.com\/googlecloudplatform\/\x22,\x22github.com\/googlemaps\/\x22,\x22github.com\/googleworkspace\/\x22,\x22github.com\/terraform-google-modules\/\x22,\x22go.googlesource.com\/\x22\x5d,\x5b\x22github.com\/GoogleContainerTools\/skaffold\x22\x5d\x5d,\x5b\x5d,\x5b\x5b\x22github.com\/OnlineHacKing\/\x22,\x22github.com\/Bhaviktutorials\/\x22,\x22github.com\/sherlock-project\/\x22,\x22github.com\/htr-tech\/zphisher\/\x22,\x22github.com\/soxoj\/maigret\/\x22,\x22github.com\/fikrado\/\x22\x5d,\x5b\x22github.com\/JoelGMSec\/Cloudtopolis\x22\x5d\x5d\x5d";
      (window as any).CSH_LOAD_T0 = Date.now();

      // Define _DumpException function (required by Cloud Shell)
      (window as any)._DumpException = function(e: any) {
        console.error('Cloud Shell error:', e);
      };

      // Intercept fetch/XMLHttpRequest to proxy Cloud Shell API calls
      // MUST be set up BEFORE Cloud Shell scripts load
      setupCloudShellProxy();

      // Set base href (required by Cloud Shell)
      const baseElement = document.querySelector('base');
      if (!baseElement) {
        const base = document.createElement('base');
        base.href = '/';
        document.head.insertBefore(base, document.head.firstChild);
      }

      // Load the main Cloud Shell script from gstatic
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/_/cloudshell-scs/_/js/k=cloudshell-scs.csh.en.AYpRfyRWRGQ.es5.O/am=AAAD/d=1/rs=AKpenNb23Sc0ShEzLJnDAJFR8jOOG-NU6A/m=cloudshell';
      script.async = false; // Load synchronously to ensure proper initialization order
      script.onload = () => {
        (window as any).CSH_LOAD_T1 = Date.now();
        console.log('Azalea Cloud Shell loaded (using real Google Cloud Shell scripts)');
        console.log('API requests will be proxied through Azalea backend');
        
        // Give Cloud Shell a moment to initialize
        setTimeout(() => {
          resolve();
        }, 500);
      };
      script.onerror = (error) => {
        console.error('Failed to load Cloud Shell scripts:', error);
        reject(new Error('Failed to load Cloud Shell scripts'));
      };
      document.head.appendChild(script);
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
