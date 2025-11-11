import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../theme/theme';

/**
 * AzaleaSSHX - WebVM with sshx.io integration
 * Uses a direct sshx.io session URL
 */
export const WebVMSSHX: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  // Direct sshx.io session URL
  const sshxUrl = 'https://sshx.io/s/a8I0fyXd8m#zbC5SqX5ev84qk';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing iframe
    containerRef.current.innerHTML = '';

    // Create iframe with SSHX URL
    const iframe = document.createElement('iframe');
    iframe.src = sshxUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.backgroundColor = theme.surface;
    iframe.allow = 'clipboard-read; clipboard-write; fullscreen';
    iframe.title = 'AzaleaSSHX - sshx.io Collaborative Terminal';
    iframe.onload = () => {
      setLoading(false);
    };

    containerRef.current.appendChild(iframe);

    return () => {
      if (containerRef.current && iframe.parentNode) {
        containerRef.current.removeChild(iframe);
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
            {loading ? 'Loading sshx...' : 'Connected'}
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
              <div style={{ fontSize: '16px', marginBottom: '8px' }}>Loading sshx session...</div>
              <div style={{ fontSize: '12px' }}>Connecting to collaborative terminal</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
