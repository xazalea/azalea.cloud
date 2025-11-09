import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../theme/theme';

interface DesktopViewerProps {
  vncUrl: string;
  onClose?: () => void;
}

/**
 * Desktop Viewer Component
 * Displays VNC desktop using iframe
 */
export const DesktopViewer: React.FC<DesktopViewerProps> = ({ vncUrl, onClose }) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create iframe for VNC desktop
    const iframe = document.createElement('iframe');
    iframe.src = vncUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.allow = 'clipboard-read; clipboard-write; fullscreen';
    iframe.title = 'AzaleaCloud Desktop';
    
    iframe.onload = () => {
      setLoading(false);
      setError(null);
    };
    
    iframe.onerror = () => {
      setLoading(false);
      setError('Failed to load desktop. Make sure the container is running.');
    };

    containerRef.current.appendChild(iframe);

    return () => {
      if (containerRef.current && iframe.parentNode) {
        containerRef.current.removeChild(iframe);
      }
    };
  }, [vncUrl]);

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
      {/* Desktop Header */}
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
          <span className="material-icons" style={{ fontSize: '20px', color: theme.accent }}>
            desktop_windows
          </span>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: theme.text }}>
              AzaleaCloud Desktop
            </div>
            <div style={{ fontSize: '11px', color: theme.textSecondary }}>
              Ubuntu LXDE Desktop Environment
            </div>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              padding: '6px 12px',
              backgroundColor: theme.error,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span className="material-icons" style={{ fontSize: '16px' }}>
              close
            </span>
            Close
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '16px',
            color: theme.textSecondary,
          }}
        >
          <span className="material-icons" style={{ fontSize: '48px' }}>
            desktop_windows
          </span>
          <div>Loading desktop environment...</div>
          <div style={{ fontSize: '12px' }}>Starting Ubuntu LXDE VNC server</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '16px',
            color: theme.error,
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <span className="material-icons" style={{ fontSize: '48px' }}>
            error_outline
          </span>
          <div>{error}</div>
          <div style={{ fontSize: '12px', color: theme.textSecondary }}>
            Make sure the Docker container is running: docker run -p 8080:80 dorowu/ubuntu-desktop-lxde-vnc
          </div>
        </div>
      )}

      {/* VNC Desktop */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          display: loading || error ? 'none' : 'block',
          minHeight: 0,
        }}
      />
    </div>
  );
};

