import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../theme/theme';

/**
 * AzaleaSSHX - WebVM with sshx.io integration
 * Runs sshx start script on backend, gets final URL, serves as iframe
 */
export const WebVMSSHX: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [sshxUrl, setSshxUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startSSHX = async () => {
      try {
        setLoading(true);
        setError(null);

        // Call backend to start sshx
        const response = await fetch('http://localhost:3001/api/sshx/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.success && data.url) {
          setSshxUrl(data.url);
        } else if (data.fallback) {
          // Use fallback URL
          setSshxUrl(data.fallback);
        } else {
          throw new Error(data.error || 'Failed to start sshx');
        }
      } catch (err) {
        console.error('Failed to start sshx:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Fallback to sshx.io homepage
        setSshxUrl('https://sshx.io/');
      } finally {
        setLoading(false);
      }
    };

    startSSHX();
  }, []);

  useEffect(() => {
    if (!containerRef.current || !sshxUrl) return;

    // Clear any existing iframe
    containerRef.current.innerHTML = '';

    // Create iframe with final SSHX URL
    const iframe = document.createElement('iframe');
    iframe.src = sshxUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.backgroundColor = theme.surface;
    iframe.allow = 'clipboard-read; clipboard-write; fullscreen';
    iframe.title = 'AzaleaSSHX - sshx.io Collaborative Terminal';

    containerRef.current.appendChild(iframe);

    return () => {
      if (containerRef.current && iframe.parentNode) {
        containerRef.current.removeChild(iframe);
      }
    };
  }, [sshxUrl, theme]);

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
      }}
    >
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: theme.surfaceVariant,
          borderBottom: `1px solid ${theme.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '16px',
              fontWeight: 600,
              color: theme.text,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'inline-block' }}
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span style={{ fontFamily: 'monospace' }}>sshx</span>
            <span style={{ fontSize: '11px', opacity: 0.7, fontWeight: 400 }}>
              collaborative terminal
            </span>
          </div>
          <div
            style={{
              fontSize: '12px',
              color: sshxUrl && !loading ? theme.success : theme.textSecondary,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: sshxUrl && !loading ? theme.success : theme.textSecondary,
              }}
            />
            {loading ? 'Starting sshx...' : sshxUrl ? 'Connected' : 'Error'}
          </div>
        </div>
        {sshxUrl && (
          <button
            onClick={() => {
              navigator.clipboard.writeText(sshxUrl);
              alert('Session URL copied to clipboard!');
            }}
            style={{
              padding: '6px 12px',
              backgroundColor: 'transparent',
              color: theme.accent,
              border: `1px solid ${theme.border}`,
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            title="Copy session URL"
          >
            <span className="material-icons" style={{ fontSize: '16px' }}>
              link
            </span>
            Copy URL
          </button>
        )}
      </div>
      <div
        ref={containerRef}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {loading && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.surface,
              zIndex: 10,
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <span className="material-icons" style={{ fontSize: '48px', color: theme.accent }}>
              download
            </span>
            <div style={{ textAlign: 'center', color: theme.textSecondary }}>
              <div style={{ fontSize: '16px', marginBottom: '8px' }}>Starting sshx...</div>
              <div style={{ fontSize: '12px' }}>This may take a moment</div>
            </div>
          </div>
        )}
        {error && !loading && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.surface,
              zIndex: 10,
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <span className="material-icons" style={{ fontSize: '48px', color: theme.error }}>
              error_outline
            </span>
            <div style={{ textAlign: 'center', color: theme.textSecondary }}>
              <div style={{ fontSize: '16px', marginBottom: '8px', color: theme.error }}>Error</div>
              <div style={{ fontSize: '12px' }}>{error}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
