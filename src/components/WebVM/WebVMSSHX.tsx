import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../theme/theme';
import { createWebVMConfig, buildWebVMUrl, WEBVM_IMAGES } from '../../lib/webvm-integration';

/**
 * AzaleaSSHX - WebVM with sshx.io integration
 * sshx.io is a secure, collaborative terminal sharing service
 */
export const WebVMSSHX: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [sshxUrl, setSshxUrl] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  const handleCreateSession = async () => {
    try {
      setConnecting(true);
      
      // Show a dialog to enter session ID or create new session
      const input = prompt(
        'Enter sshx.io session:\n\n' +
        '• To join existing: Enter session ID or URL (e.g., abc123 or https://sshx.io/abc123)\n' +
        '• To create new: Leave empty and install sshx CLI, then run "sshx" in your terminal\n\n' +
        'Install sshx: curl -sSf https://sshx.io/get | sh'
      );
      
      if (input === null) {
        // User cancelled
        setConnecting(false);
        return;
      }
      
      if (input.trim() === '') {
        // User wants to create a new session
        // Show instructions
        alert(
          'To create a new sshx session:\n\n' +
          '1. Install sshx: curl -sSf https://sshx.io/get | sh\n' +
          '2. Run: sshx\n' +
          '3. Copy the session ID from the output\n' +
          '4. Paste it here to connect WebVM to your session'
        );
        setConnecting(false);
        return;
      }
      
      // Extract session ID from URL if full URL provided
      const sessionIdMatch = input.match(/(?:sshx\.io\/)?([a-zA-Z0-9-]+)/);
      const id = sessionIdMatch ? sessionIdMatch[1] : input.trim();
      
      if (!id) {
        alert('Invalid session ID. Please enter a valid sshx session ID.');
        setConnecting(false);
        return;
      }
      
      setSessionId(id);
      setSshxUrl(`https://sshx.io/${id}`);
      connectToSSHX(id);
    } catch (error) {
      console.error('Failed to create sshx session:', error);
      alert('Failed to connect to sshx.io. Please check your connection.');
      setConnecting(false);
    }
  };

  const connectToSSHX = (sessionId: string) => {
    try {
      // sshx.io uses WebSocket for real-time terminal sharing
      // The WebSocket URL format is typically: wss://sshx.io/ws/{sessionId}
      const wsUrl = `wss://sshx.io/ws/${sessionId}`;
      
      const websocket = new WebSocket(wsUrl);
      
      websocket.onopen = () => {
        setConnected(true);
        setConnecting(false);
        setWs(websocket);
        console.log('Connected to sshx.io session:', sessionId);
      };

      websocket.onmessage = (event) => {
        // Handle terminal data from sshx.io
        if (terminalRef.current) {
          // In a real implementation, you'd use xterm.js to render the data
          // For now, we'll display it in the WebVM iframe
        }
      };

      websocket.onerror = (error) => {
        console.error('sshx.io WebSocket error:', error);
        setConnected(false);
        setConnecting(false);
        alert('Failed to connect to sshx.io session');
      };

      websocket.onclose = () => {
        setConnected(false);
        setWs(null);
        console.log('Disconnected from sshx.io');
      };
    } catch (error) {
      console.error('Failed to connect to sshx.io:', error);
      setConnecting(false);
    }
  };

  useEffect(() => {
    if (!containerRef.current || !sessionId) return;

    // Create WebVM config with sshx.io integration
    const config = createWebVMConfig(WEBVM_IMAGES.DEBIAN_MINI, {
      SSHX_SESSION: sessionId,
    });

    // Build WebVM URL with sshx.io session
    const webvmUrl = buildWebVMUrl(config);

    // Create iframe for WebVM with sshx.io integration
    const iframe = document.createElement('iframe');
    iframe.src = webvmUrl;
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
  }, [theme, sessionId]);

  const handleDisconnect = () => {
    if (ws) {
      ws.close();
      setWs(null);
    }
    setConnected(false);
    setSessionId('');
    setSshxUrl('');
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
            {connected ? `Connected: ${sessionId}` : 'Not connected'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {connected ? (
            <button
              onClick={handleDisconnect}
              style={{
                padding: '6px 12px',
                backgroundColor: theme.error,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 500,
              }}
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={handleCreateSession}
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
              {connecting ? 'Connecting...' : 'Connect to sshx.io'}
            </button>
          )}
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
              }}
              title="Copy session URL"
            >
              <span className="material-icons" style={{ fontSize: '16px' }}>
                link
              </span>
            </button>
          )}
        </div>
      </div>
      {!sessionId && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px',
            color: theme.textSecondary,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              marginBottom: '16px',
            }}
          >
            <svg
              width="64"
              height="64"
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
          </div>
          <h3 style={{ margin: '0 0 8px 0', color: theme.text, display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
          </h3>
          <p style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: theme.text }}>
            A secure web-based, collaborative terminal
          </p>
          <p style={{ margin: '0 0 24px 0', fontSize: '14px', maxWidth: '500px', lineHeight: '1.6' }}>
            Share your terminal with anyone by link, on a multiplayer infinite canvas. Real-time collaboration 
            with remote cursors and chat. End-to-end encrypted and ultra-fast mesh networking.
          </p>
          <div style={{ 
            backgroundColor: theme.surfaceVariant, 
            padding: '16px', 
            borderRadius: '8px', 
            marginBottom: '24px',
            maxWidth: '500px',
            textAlign: 'left',
          }}>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: theme.text }}>
              Features:
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: theme.textSecondary, lineHeight: '1.8' }}>
              <li>Collaborative - Invite people by sharing a secure, unique browser link</li>
              <li>End-to-end encrypted - Server never sees what you're typing</li>
              <li>Infinite canvas - Move and resize multiple terminals at once</li>
              <li>Live presence - See other people's names and cursors</li>
            </ul>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={handleCreateSession}
              disabled={connecting}
              style={{
                padding: '12px 24px',
                backgroundColor: theme.accent,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                cursor: connecting ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                opacity: connecting ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {connecting ? (
                <>
                  <span className="material-icons" style={{ fontSize: '18px' }}>sync</span>
                  Connecting...
                </>
              ) : (
                <>
                  <span className="material-icons" style={{ fontSize: '18px' }}>add</span>
                  Join or Create Session
                </>
              )}
            </button>
            <a
              href="https://sshx.io"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: theme.accent,
                border: `1px solid ${theme.border}`,
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span className="material-icons" style={{ fontSize: '18px' }}>open_in_new</span>
              Learn More
            </a>
          </div>
          <p style={{ margin: '16px 0 0 0', fontSize: '12px', opacity: 0.7, maxWidth: '500px' }}>
            Install sshx CLI: <code style={{ 
              backgroundColor: theme.surfaceVariant, 
              padding: '2px 6px', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '11px',
            }}>curl -sSf https://sshx.io/get | sh</code>
          </p>
        </div>
      )}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          display: sessionId ? 'block' : 'none',
        }}
      />
      <div
        ref={terminalRef}
        style={{
          display: 'none',
        }}
      />
    </div>
  );
};
