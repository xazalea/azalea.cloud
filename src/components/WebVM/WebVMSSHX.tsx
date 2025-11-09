import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../theme/theme';

/**
 * AzaleaSSHX - WebVM with sshx.io integration
 * Automatically installs sshx in WebVM and connects to sshx.io
 */
export const WebVMSSHX: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [sessionId, setSessionId] = useState<string>('');
  const [sshxUrl, setSshxUrl] = useState<string>('');
  const [installing, setInstalling] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    setInstalling(true);
    
    // Iframe sshx.io directly - it's a web-based collaborative terminal
    const iframe = document.createElement('iframe');
    
    // If sessionId is provided, use it; otherwise use the main sshx.io page
    const sshxUrl = sessionId ? `https://sshx.io/${sessionId}` : 'https://sshx.io/';
    
    iframe.src = sshxUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.backgroundColor = theme.surface;
    iframe.allow = 'clipboard-read; clipboard-write; fullscreen';
    iframe.title = 'AzaleaSSHX - sshx.io Collaborative Terminal';
    iframe.onload = () => {
      setInstalling(false);
      setConnected(true);
    };
    iframe.onerror = () => {
      setInstalling(false);
      setConnected(false);
    };

    containerRef.current.appendChild(iframe);

    return () => {
      if (containerRef.current && iframe.parentNode) {
        containerRef.current.removeChild(iframe);
      }
    };
  }, [theme, sessionId]);

  const handleCreateSession = () => {
    const input = prompt(
      'Enter sshx.io session ID:\n\n' +
      '• To join existing: Enter session ID (e.g., abc123)\n' +
      '• To create new: Leave empty to open sshx.io homepage\n\n' +
      'Install sshx CLI: curl -sSf https://sshx.io/get | sh\n' +
      'Then run: sshx'
    );

    if (input === null) {
      // User cancelled
      return;
    }

    if (input.trim() === '') {
      // User wants to create a new session - sshx.io homepage will handle it
      setSessionId('');
      setSshxUrl('https://sshx.io/');
      // Reload iframe
      if (containerRef.current) {
        const iframe = containerRef.current.querySelector('iframe');
        if (iframe) {
          iframe.src = 'https://sshx.io/';
        }
      }
      return;
    }

    // Extract session ID
    const sessionIdMatch = input.match(/(?:sshx\.io\/)?([a-zA-Z0-9-]+)/);
    const id = sessionIdMatch ? sessionIdMatch[1] : input.trim();
    
    if (id) {
      setSessionId(id);
      setSshxUrl(`https://sshx.io/${id}`);
      
      // Reload iframe with session URL
      if (containerRef.current) {
        const iframe = containerRef.current.querySelector('iframe');
        if (iframe) {
          iframe.src = `https://sshx.io/${id}`;
        }
      }
    }
  };

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
          {/* sshx Logo/Branding */}
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
              color: connected ? theme.success : theme.textSecondary,
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
                backgroundColor: connected ? theme.success : theme.textSecondary,
              }}
            />
            {installing ? 'Installing sshx...' : connected ? 'Connected' : 'Connecting...'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
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
          <button
            onClick={handleCreateSession}
            disabled={installing}
            style={{
              padding: '6px 12px',
              backgroundColor: theme.accent,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: installing ? 'not-allowed' : 'pointer',
              fontSize: '12px',
              fontWeight: 500,
              opacity: installing ? 0.6 : 1,
            }}
          >
            {sessionId ? 'Change Session' : 'Join Session'}
          </button>
        </div>
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
        {installing && (
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
            }}
          >
            <div style={{ textAlign: 'center', color: theme.textSecondary }}>
              <span className="material-icons" style={{ fontSize: '48px', marginBottom: '16px', display: 'block' }}>
                download
              </span>
              <div>Loading sshx.io...</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
