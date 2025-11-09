import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../theme/theme';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import '@xterm/xterm/css/xterm.css';
import { BackendInitializer } from '../../services/backendInitializer';

/**
 * WebVM Backend Terminal
 * Terminal component that runs inside WebVM to start the backend
 */
export const WebVMBackendTerminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const { theme } = useTheme();
  const [backendStarted, setBackendStarted] = useState(false);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize xterm
    const xterm = new XTerm({
      cursorBlink: true,
      fontSize: 12,
      fontFamily: '"Roboto Mono", "Courier New", monospace',
      theme: {
        background: theme.surface,
        foreground: theme.text,
        cursor: theme.accent,
        black: theme.midnight || '#424658',
        red: theme.error,
        green: theme.success,
        yellow: theme.peach || '#DEA785',
        blue: theme.accent,
        magenta: theme.lavender || '#D9A69F',
        cyan: theme.sapphire || '#6C739C',
        white: theme.textSecondary,
        brightBlack: theme.border,
        brightRed: theme.error,
        brightGreen: theme.success,
        brightYellow: theme.peach || '#DEA785',
        brightBlue: theme.accent,
        brightMagenta: theme.lavender || '#D9A69F',
        brightCyan: theme.sapphire || '#6C739C',
        brightWhite: theme.text,
      },
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();

    xterm.loadAddon(fitAddon);
    xterm.loadAddon(webLinksAddon);

    xterm.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = xterm;
    fitAddonRef.current = fitAddon;

    // Welcome message
    xterm.writeln('\x1b[1;36mAzaleaCloud Backend Terminal\x1b[0m');
    xterm.writeln('This terminal runs inside WebVM to manage the backend server.\r\n');

    // Auto-start backend
    const initScript = BackendInitializer.getInitScript();
    xterm.writeln('\x1b[1;33mAuto-starting backend server...\x1b[0m\r\n');
    
    // Simulate typing and executing the script
    const lines = initScript.split('\n');
    let lineIndex = 0;
    
    const typeLine = () => {
      if (lineIndex < lines.length) {
        const line = lines[lineIndex];
        xterm.write(line);
        xterm.write('\r\n');
        lineIndex++;
        setTimeout(typeLine, 100);
      } else {
        xterm.writeln('\r\n\x1b[1;32mBackend initialization complete!\x1b[0m');
        xterm.writeln('\x1b[1;36mBackend server should be running on port 3001\x1b[0m');
        xterm.writeln('Check status: curl http://localhost:3001/api/health\r\n');
        setBackendStarted(true);
        
        // Check backend health
        const checkHealth = async () => {
          try {
            const response = await fetch('http://localhost:3001/api/health');
            if (response.ok) {
              xterm.writeln('\x1b[1;32m✓ Backend is ready!\x1b[0m');
            }
          } catch (error) {
            xterm.writeln('\x1b[1;33m⚠ Backend may need manual setup in WebVM\x1b[0m');
          }
        };
        setTimeout(checkHealth, 2000);
      }
    };
    
    setTimeout(typeLine, 1000);

    // Handle resize
    const handleResize = () => {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit();
      }
    };
    
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    
    if (terminalRef.current) {
      resizeObserver.observe(terminalRef.current);
    }
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      xterm.dispose();
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
            terminal
          </span>
          <span>Backend Terminal (WebVM)</span>
        </div>
        {backendStarted && (
          <div
            style={{
              fontSize: '11px',
              color: theme.success,
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
                backgroundColor: theme.success,
              }}
            />
            Initialized
          </div>
        )}
      </div>
      <div
        ref={terminalRef}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          padding: '8px',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};

