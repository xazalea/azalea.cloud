import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../theme/theme';

/**
 * WebVM with Backend
 * Uses the WebVM submodule built and running in the browser
 * The backend server runs inside this WebVM instance
 */
export const WebVMWithBackend: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [backendReady, setBackendReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Determine WebVM URL - try local build first, fallback to hosted
    let webvmUrl = '/webvm/index.html';
    
    // Test if local WebVM build exists
    const testAndLoad = async () => {
      try {
        const test = await fetch('/webvm/index.html', { method: 'HEAD', cache: 'no-cache' });
        if (!test.ok) {
          throw new Error('Local build not found');
        }
      } catch (e) {
        // Fallback to hosted WebVM
        webvmUrl = 'https://webvm.io/';
        setError('Using hosted WebVM (run "npm run build:webvm" to build locally)');
      }
      
      // Create iframe for WebVM
      const iframe = document.createElement('iframe');
      iframe.src = webvmUrl;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.style.backgroundColor = theme.surface;
      iframe.allow = 'clipboard-read; clipboard-write; fullscreen';
      iframe.title = 'AzaleaCloud Backend - WebVM';
      iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups allow-modals';
      
      iframe.onload = () => {
        setLoading(false);
        
        // Check backend health after WebVM loads
        const checkBackend = async () => {
          try {
            // Try WebVM backend first
            let response: Response | null = null;
            try {
              response = await fetch('http://localhost:3001/api/health', {
                method: 'GET',
                signal: AbortSignal.timeout(2000),
              });
            } catch {
              // WebVM backend not available
            }
            
            // Fallback to browser backend (always available)
            if (!response || !response.ok) {
              response = await fetch('/api/backend/health', {
                method: 'GET',
                signal: AbortSignal.timeout(2000),
              });
            }
            
            if (response && response.ok) {
              setBackendReady(true);
              setError(null);
            } else {
              setTimeout(checkBackend, 2000);
            }
          } catch (error) {
            // Backend not ready yet, retry
            setTimeout(checkBackend, 2000);
          }
        };
        
        // Start checking after 5 seconds (WebVM needs time to initialize)
        setTimeout(checkBackend, 5000);
      };
      
      iframe.onerror = () => {
        setLoading(false);
        setError('Failed to load WebVM');
      };
      
      iframeRef.current = iframe;
      if (containerRef.current) {
        containerRef.current.appendChild(iframe);
      }
    };
    
    testAndLoad();

    return () => {
      if (containerRef.current && iframeRef.current?.parentNode) {
        containerRef.current.removeChild(iframeRef.current);
      }
    };
  }, [theme]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.surface,
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          padding: '8px 16px',
          backgroundColor: theme.surfaceVariant,
          borderBottom: `1px solid ${theme.border}`,
          borderRadius: '8px 8px 0 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          fontSize: '12px',
          color: theme.textSecondary,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-icons" style={{ fontSize: '16px' }}>
            dns
          </span>
          <span>WebVM Backend Server</span>
        </div>
        <div
          style={{
            fontSize: '11px',
            color: backendReady ? theme.success : theme.textSecondary,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: backendReady ? theme.success : theme.textSecondary,
            }}
          />
          {backendReady ? 'Backend Ready' : 'Starting...'}
        </div>
      </div>
      {error && (
        <div
          style={{
            padding: '4px 16px',
            backgroundColor: theme.surfaceVariant,
            borderBottom: `1px solid ${theme.border}`,
            fontSize: '11px',
            color: theme.textSecondary,
          }}
        >
          {error}
        </div>
      )}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          minHeight: 0,
        }}
      />
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: theme.textSecondary,
            zIndex: 10,
          }}
        >
          <span className="material-icons" style={{ fontSize: '48px', marginBottom: '16px', display: 'block' }}>
            computer
          </span>
          <div>Loading WebVM...</div>
        </div>
      )}
    </div>
  );
};
