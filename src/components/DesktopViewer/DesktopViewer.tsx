import React, { useEffect, useState } from 'react';
import { useTheme } from '../../theme/theme';

interface DesktopViewerProps {
  vncUrl: string;
  onClose?: () => void;
}

/**
 * Desktop Viewer Component
 * Opens VNC desktop in a new window/tab with fullscreen support
 */
export const DesktopViewer: React.FC<DesktopViewerProps> = ({ vncUrl, onClose }) => {
  const { theme } = useTheme();
  const [desktopWindow, setDesktopWindow] = useState<Window | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Open desktop in a new window
    const openDesktop = () => {
      try {
        const newWindow = window.open(
          vncUrl,
          'azalea-desktop',
          'width=1280,height=720,resizable=yes,scrollbars=yes,status=yes,location=yes'
        );

        if (!newWindow) {
          setError('Failed to open desktop window. Please allow popups for this site.');
          return;
        }

        setDesktopWindow(newWindow);

        // Monitor window close (safe, doesn't access cross-origin content)
        const checkClosed = setInterval(() => {
          try {
            if (newWindow.closed) {
              clearInterval(checkClosed);
              setDesktopWindow(null);
              if (onClose) {
                onClose();
              }
            }
          } catch (e) {
            // Cross-origin access blocked, stop checking
            clearInterval(checkClosed);
          }
        }, 500);

        return () => {
          clearInterval(checkClosed);
        };
      } catch (error) {
        setError(`Failed to open desktop: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    openDesktop();
  }, [vncUrl, onClose]);

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

      {/* Status Display */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        {desktopWindow && !error && (
          <>
            <span className="material-icons" style={{ fontSize: '48px', color: theme.success }}>
              check_circle
            </span>
            <div style={{ fontSize: '18px', fontWeight: 600, color: theme.text }}>
              Desktop opened in new window
            </div>
            <div style={{ fontSize: '14px', color: theme.textSecondary }}>
              The desktop should have opened in a new tab. If it didn't, please allow popups for this site.
            </div>
            <div style={{ fontSize: '12px', color: theme.textSecondary, marginTop: '16px' }}>
              <div>
                If you see "Connection reset", the VNC server may not be running.
                Make sure Docker is running and the container is started.
              </div>
            </div>
            <button
              onClick={() => {
                if (desktopWindow && !desktopWindow.closed) {
                  desktopWindow.focus();
                } else {
                  // Reopen if closed
                  const newWindow = window.open(vncUrl, 'azalea-desktop', 'width=1280,height=720,resizable=yes');
                  if (newWindow) {
                    setDesktopWindow(newWindow);
                  }
                }
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: theme.accent,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '16px',
              }}
            >
              <span className="material-icons" style={{ fontSize: '18px' }}>
                open_in_new
              </span>
              Open Desktop Window
            </button>
          </>
        )}

        {error && (
          <>
            <span className="material-icons" style={{ fontSize: '48px', color: theme.error }}>
              error_outline
            </span>
            <div style={{ color: theme.error, fontSize: '16px', fontWeight: 600 }}>{error}</div>
            <div style={{ fontSize: '12px', color: theme.textSecondary, marginTop: '8px' }}>
              Make sure the Docker container is running: docker run -p 8080:80 dorowu/ubuntu-desktop-lxde-vnc
            </div>
            <button
              onClick={() => {
                const newWindow = window.open(vncUrl, 'azalea-desktop', 'width=1280,height=720,resizable=yes');
                if (newWindow) {
                  setDesktopWindow(newWindow);
                  setError(null);
                } else {
                  setError('Please allow popups for this site to open the desktop.');
                }
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: theme.accent,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                marginTop: '16px',
              }}
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

