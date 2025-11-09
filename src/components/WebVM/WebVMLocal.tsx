import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../theme/theme';
import { createWebVMConfig, buildWebVMUrl, WEBVM_IMAGES } from '../../lib/webvm-integration';

/**
 * AzaleaLocal - Standalone WebVM
 * Integrates the actual WebVM project as a submodule
 * Uses the WebVM submodule for local integration
 */
export const WebVMLocal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Load WebVM configuration
    const loadWebVM = async () => {
      try {
        // Create WebVM config for standalone mode
        const config = createWebVMConfig(WEBVM_IMAGES.DEBIAN_MINI, {
          CMD: ['/bin/bash'],
        });

        // Build WebVM URL with configuration
        const webvmUrl = buildWebVMUrl(config);

        // Create iframe to load WebVM
        // In production, you would build the WebVM submodule and serve it locally
        // For now, we'll use the hosted version
        // To use local WebVM: serve the webvm/build directory and point iframe.src to it
        const iframe = document.createElement('iframe');
        iframe.src = webvmUrl;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.backgroundColor = theme.surface;
        iframe.allow = 'clipboard-read; clipboard-write';
        iframe.title = 'AzaleaLocal - WebVM';
        iframe.onload = () => setLoading(false);

        if (containerRef.current) {
          containerRef.current.appendChild(iframe);
        }

        return () => {
          if (containerRef.current && iframe.parentNode) {
            containerRef.current.removeChild(iframe);
          }
        };
      } catch (error) {
        console.error('Failed to load WebVM:', error);
        setLoading(false);
      }
    };

    loadWebVM();
  }, [theme]);

  if (loading) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.surface,
          borderRadius: '8px',
          color: theme.textSecondary,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <span className="material-icons" style={{ fontSize: '48px', marginBottom: '16px', display: 'block' }}>
            computer
          </span>
          <div>Loading WebVM...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
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
          gap: '8px',
          fontSize: '12px',
          color: theme.textSecondary,
        }}
      >
        <span className="material-icons" style={{ fontSize: '16px' }}>
          computer
        </span>
        <span>AzaleaLocal - Standalone WebVM</span>
      </div>
      <div
        ref={containerRef}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: theme.surface,
          borderRadius: '0 0 8px 8px',
        }}
      />
    </div>
  );
};
