import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../theme/theme';

/**
 * AzaleaSSHX - WebVM with sshx.io integration
 * This connects WebVM to sshx.io service for shared sessions
 */
export const WebVMSSHX: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [sshxUrl, setSshxUrl] = useState<string>('');
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // WebVM configuration with sshx.io integration
    const webvmConfig = {
      IMAGE_URL: 'https://disks.webvm.io/debian_mini_20230519_5022088024.ext2',
      IMAGE_TYPE: 'cloud',
      CMD: ['/bin/bash'],
      ARGS: [],
      ENV: {
        HOME: '/home/user',
        TERM: 'xterm',
        USER: 'user',
        SHELL: '/bin/bash',
        EDITOR: 'vim',
        LANG: 'en_US.UTF-8',
        LC_ALL: 'C',
      },
      CWD: '/home/user',
      SSHX_URL: sshxUrl || undefined,
    };

    // Create iframe for WebVM with sshx.io
    const iframe = document.createElement('iframe');
    
    // If sshx.io URL is provided, use it; otherwise use standard WebVM
    if (sshxUrl) {
      // Connect to sshx.io service
      // sshx.io provides a WebSocket-based terminal sharing service
      // Format: wss://sshx.io/session-id
      iframe.src = `https://webvm.io/#sshx=${encodeURIComponent(sshxUrl)}`;
    } else {
      iframe.src = 'https://webvm.io/';
    }
    
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.backgroundColor = theme.surface;
    iframe.allow = 'clipboard-read; clipboard-write';
    iframe.title = 'AzaleaSSHX - WebVM with sshx.io';

    containerRef.current.appendChild(iframe);

    return () => {
      if (containerRef.current && iframe.parentNode) {
        containerRef.current.removeChild(iframe);
      }
    };
  }, [theme, sshxUrl]);

  const handleConnectSSHX = () => {
    const url = prompt('Enter sshx.io session URL (e.g., wss://sshx.io/your-session-id):');
    if (url) {
      setConnecting(true);
      setSshxUrl(url);
      // The iframe will reload with the new URL
      setTimeout(() => setConnecting(false), 1000);
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
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-icons" style={{ fontSize: '18px', color: theme.accent }}>
            link
          </span>
          <span style={{ fontSize: '14px', color: theme.text }}>
            {sshxUrl ? 'Connected to sshx.io' : 'Not connected to sshx.io'}
          </span>
        </div>
        <button
          onClick={handleConnectSSHX}
          disabled={connecting}
          style={{
            padding: '6px 12px',
            backgroundColor: theme.accent,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '4px',
            cursor: connecting ? 'not-allowed' : 'pointer',
            fontSize: '12px',
            fontWeight: 500,
            opacity: connecting ? 0.6 : 1,
          }}
        >
          {connecting ? 'Connecting...' : sshxUrl ? 'Change Session' : 'Connect to sshx.io'}
        </button>
      </div>
      <div
        ref={containerRef}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

