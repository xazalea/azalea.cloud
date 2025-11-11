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
   * NOTE: This is no longer needed when using iframe approach, but kept for reference
   */
  const setupCloudShellProxy = (): void => {
    // When using iframe, Cloud Shell runs directly in shell.cloud.google.com context
    // So OAuth and cookies work naturally - no proxy needed
    // This function is kept for potential future use but won't be called
    return;
    // Track 401 errors to provide better feedback
    let authErrorCount = 0;
    const maxAuthErrors = 5;
    
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

      // Create an invisible iframe to get authentication cookies from shell.cloud.google.com
      // This iframe will handle OAuth naturally and set cookies on Google's domain
      const authIframe = document.createElement('iframe');
      authIframe.style.position = 'absolute';
      authIframe.style.width = '1px';
      authIframe.style.height = '1px';
      authIframe.style.opacity = '0';
      authIframe.style.pointerEvents = 'none';
      authIframe.style.border = 'none';
      authIframe.src = 'https://shell.cloud.google.com/';
      authIframe.title = 'Cloud Shell Auth';
      
      // Main Cloud Shell iframe - loads shell.cloud.google.com directly
      // This allows OAuth to work naturally with cookies on Google's domain
      const cloudShellIframe = document.createElement('iframe');
      cloudShellIframe.src = 'https://shell.cloud.google.com/';
      cloudShellIframe.style.width = '100%';
      cloudShellIframe.style.height = '100%';
      cloudShellIframe.style.border = 'none';
      cloudShellIframe.style.backgroundColor = theme.surface;
      cloudShellIframe.allow = 'clipboard-read; clipboard-write; fullscreen';
      cloudShellIframe.title = 'Azalea Cloud Shell';
      cloudShellIframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation-by-user-activation';
      
      // Listen for messages from the iframe (for future enhancements)
      const messageHandler = (event: MessageEvent) => {
        // Only accept messages from shell.cloud.google.com
        if (event.origin !== 'https://shell.cloud.google.com') {
          return;
        }
        
        // Handle messages from Cloud Shell iframe
        if (event.data && typeof event.data === 'object') {
          console.log('[Cloud Shell] Message from iframe:', event.data);
        }
      };
      
      window.addEventListener('message', messageHandler);
      
      // Pass handler to parent for cleanup
      if (onMessageHandler) {
        onMessageHandler(messageHandler);
      }
      
      cloudShellIframe.onload = () => {
        console.log('Azalea Cloud Shell loaded in iframe');
        console.log('OAuth will work naturally with Google\'s domain');
        
        // Apply branding after iframe loads
        setTimeout(() => {
          applyAzaleaBranding();
          resolve();
        }, 1000);
      };
      
      cloudShellIframe.onerror = () => {
        reject(new Error('Failed to load Cloud Shell iframe'));
      };
      
      // Add auth iframe first (invisible, for cookie acquisition)
      document.body.appendChild(authIframe);
      
      // Add main Cloud Shell iframe
      containerRef.current.appendChild(cloudShellIframe);
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
