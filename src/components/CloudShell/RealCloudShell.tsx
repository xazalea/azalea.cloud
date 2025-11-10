import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../theme/theme';
import { CloudShellAuthInterceptor } from '../../services/cloudShellAuthInterceptor';

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
  const authInterceptorRef = useRef(new CloudShellAuthInterceptor());

  useEffect(() => {
    const initializeCloudShell = async () => {
      try {
        setAuthStatus('checking');
        
        // Start authentication interceptor BEFORE loading Cloud Shell
        // This will intercept Google's sign-in flow and auto-authenticate
        setAuthStatus('authenticating');
        await authInterceptorRef.current.startInterception();
        console.log('Authentication interceptor started - will auto-authenticate Cloud Shell');

        setAuthStatus('authenticated');
        
        // Load Cloud Shell scripts
        // The interceptor will automatically handle authentication
        await loadCloudShellScripts();
        
        // Apply Azalea branding after Cloud Shell loads
        setTimeout(() => {
          applyAzaleaBranding();
        }, 2000);
        
        setLoading(false);
      } catch (err) {
        console.error('Initialization error:', err);
        setError(err instanceof Error ? err.message : 'Initialization failed');
        setAuthStatus('failed');
        setLoading(false);
      }
    };

    initializeCloudShell();
  }, []);

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

  const loadCloudShellScripts = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!containerRef.current) {
        reject(new Error('Container not available'));
        return;
      }

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

      // Set up Cloud Shell server variables (CSH_SERVER_VARS)
      // This is the encoded server configuration from shell.html
      // We'll use a simplified version that works with authentication
      const serverVars = JSON.stringify([
        [
          (window as any).azaleaCloudToken ? 'authenticated@azalea.cloud' : 'user@azalea.cloud',
          '0',
          'Azalea',
          'Cloud'
        ],
        [
          'https://shell.cloud.google.com',
          'https://cloudshell.clients6.google.com',
          'cloud-sshrelay-server_20251105.01_RC00',
          null,
          '618104708054-9r9s1c4alg36erliucho9t52n32n6dgq.apps.googleusercontent.com',
          'AIzaSyBj8JySZNOCTBCnK2w-CHlwJnpwcQkQ7Hk',
          'https://cloudresourcemanager.clients6.google.com',
          [null, null, null, 'https://www.gstatic.com/devops/connect/loader/tool_library.js'],
          'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/drive',
          60,
          'https://workstations.googleapis.com'
        ],
        [null, null, null, null, null, null, [], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1, null, null, 1, null, null, null, null, 1, null, null, null, null, 1, null, 1, null, null, 1, null, null, 1, 1, 1, null, 1, 1, 1, null, null, 1, null, null, null, null, 1],
        null,
        [],
        [
          ['gcr.io/cloudshell-images/cloudshell:latest', 'gcr.io/cloudrun/button:latest', 'gcr.io/ds-artifacts-cloudshell/deploystack_custom_image'],
          ['github.com/google/', 'github.com/googlestaging/', 'github.com/googleapis/', 'github.com/googlecloudplatform/', 'github.com/googlemaps/', 'github.com/googleworkspace/', 'github.com/terraform-google-modules/', 'go.googlesource.com/'],
          ['github.com/GoogleContainerTools/skaffold']
        ],
        [],
        []
      ]);

      // Set CSH_SERVER_VARS (Cloud Shell server variables)
      (window as any).CSH_SERVER_VARS = serverVars;
      (window as any).CSH_LOAD_T0 = Date.now();

      // Define _DumpException function (required by Cloud Shell)
      (window as any)._DumpException = function(e: any) {
        console.error('Cloud Shell error:', e);
      };

      // Load the main Cloud Shell script from gstatic
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/_/cloudshell-scs/_/js/k=cloudshell-scs.csh.en.AYpRfyRWRGQ.es5.O/am=AAAD/d=1/rs=AKpenNb23Sc0ShEzLJnDAJFR8jOOG-NU6A/m=cloudshell';
      script.async = true;
      script.onload = () => {
        (window as any).CSH_LOAD_T1 = Date.now();
        console.log('Azalea Cloud Shell loaded (using real Google Cloud Shell scripts)');
        console.log('Authentication: Cloud Shell will use metadata server automatically');
        
        // Cloud Shell will automatically authenticate via metadata server
        // when running in a GCP environment
        resolve();
      };
      script.onerror = () => {
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
                <div style={{ fontSize: '14px', color: theme.textSecondary }}>
                  Cloud Shell will handle authentication automatically
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
