import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import '@xterm/xterm/css/xterm.css';
import { useTheme } from '../../theme/theme';
import { CloudShellService } from '../../services/cloudShellService';
import { TerminalControls } from './TerminalControls';
import { autoAuthService } from '../../services/autoAuthService';

interface TerminalProps {
  onCommand?: (command: string) => void;
  initialOutput?: string;
  instanceId?: string;
  compact?: boolean;
  onDesktopClick?: () => void;
  showDesktopButton?: boolean;
  desktopLoading?: boolean;
}

export const Terminal: React.FC<TerminalProps> = ({ 
  onCommand, 
  initialOutput,
  instanceId,
  compact = false,
  onDesktopClick,
  showDesktopButton = false,
  desktopLoading = false,
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const { theme } = useTheme();
  const cloudShellService = useRef(new CloudShellService());

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize xterm with better settings
    const xterm = new XTerm({
      cursorBlink: true,
      fontSize: 16,
      fontFamily: '"Fira Code", "Roboto Mono", "Courier New", monospace',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: 0.5,
      theme: {
        background: theme.surface,
        foreground: theme.text,
        cursor: theme.accent,
        cursorAccent: theme.surface,
        black: '#000000',
        red: theme.error,
        green: theme.success,
        yellow: theme.peach || '#DEA785',
        blue: theme.accent,
        magenta: theme.lavender || '#D9A69F',
        cyan: theme.sapphire || '#6C739C',
        white: theme.text,
        brightBlack: theme.border,
        brightRed: theme.error,
        brightGreen: theme.success,
        brightYellow: theme.peach || '#DEA785',
        brightBlue: theme.accent,
        brightMagenta: theme.lavender || '#D9A69F',
        brightCyan: theme.sapphire || '#6C739C',
        brightWhite: theme.text,
      },
      allowProposedApi: true,
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
    xterm.writeln('\x1b[1;36m╔═══════════════════════════════════════════════════════════╗\x1b[0m');
    xterm.writeln('\x1b[1;36m║\x1b[0m  \x1b[1;33mAzaleaCloud Terminal\x1b[0m                                    \x1b[1;36m║\x1b[0m');
    xterm.writeln('\x1b[1;36m╚═══════════════════════════════════════════════════════════╝\x1b[0m');
    xterm.writeln('');
    xterm.writeln('\x1b[1;33mInitializing cloud shell environment...\x1b[0m');
    xterm.writeln('');

    // Initialize cloud shell with progress
    (async () => {
      try {
        // Step 1: Check backend connection
        xterm.write('\x1b[33m[1/3]\x1b[0m Checking backend connection... ');
        try {
          // Try WebVM backend first
          let healthResponse: Response | null = null;
          try {
            healthResponse = await fetch('http://localhost:3001/api/health', {
              signal: AbortSignal.timeout(2000),
            });
          } catch {
            // WebVM backend not available, try browser backend
          }
          
          if (!healthResponse || !healthResponse.ok) {
            // Fallback to browser backend (always available)
            healthResponse = await fetch('/api/backend/health');
          }
          
          if (healthResponse && healthResponse.ok) {
            xterm.writeln('\x1b[32m✓ Connected\x1b[0m');
          } else {
            xterm.writeln('\x1b[33m⚠ Backend not available (using fallback mode)\x1b[0m');
          }
        } catch {
          xterm.writeln('\x1b[33m⚠ Backend not available (using fallback mode)\x1b[0m');
        }

        // Step 2: Check cloud environment
        xterm.write('\x1b[33m[2/3]\x1b[0m Checking cloud environment... ');
        await new Promise(resolve => setTimeout(resolve, 1000));
        const authStatus = await autoAuthService.waitForAuth();
        if (authStatus.isAuthenticated) {
          xterm.writeln('\x1b[32m✓ Authenticated via metadata server\x1b[0m');
        } else if (authStatus.isCloudEnvironment) {
          xterm.writeln('\x1b[33m⚠ Authentication in progress...\x1b[0m');
        } else {
          xterm.writeln('\x1b[33m⚠ Not in cloud environment (local mode)\x1b[0m');
        }

        // Step 3: Initialize session
        xterm.write('\x1b[33m[3/3]\x1b[0m Creating session... ');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await cloudShellService.current.createSession();
        xterm.writeln('\x1b[32m✓ Ready\x1b[0m');
        xterm.writeln('');
        xterm.writeln('\x1b[1;32mCloud shell ready! Type \x1b[1;33mhelp\x1b[0m \x1b[1;32mfor available commands.\x1b[0m\r\n');
      } catch (error) {
        xterm.writeln('\x1b[31m✗ Error during initialization\x1b[0m');
        xterm.writeln(`\x1b[31m${error instanceof Error ? error.message : 'Unknown error'}\x1b[0m`);
        xterm.writeln('');
        xterm.writeln('\x1b[33mContinuing in fallback mode...\x1b[0m\r\n');
      }
    })();

    if (initialOutput) {
      xterm.write(initialOutput);
    }

    // Command handling
    const handleCommand = async (command: string) => {
      if (!command.trim()) {
        xterm.write('\r\n');
        return;
      }

      xterm.write('\r\n');

      try {
        const result = await cloudShellService.current.executeCommand(command);
        // Write stdout
        if (result.output) {
          xterm.write(result.output);
        }
        // Write stderr in red if present
        if (result.error) {
          xterm.write(`\x1b[31m${result.error}\x1b[0m`);
        }
        // Show exit code if non-zero
        if (result.exitCode !== 0) {
          xterm.write(`\r\n\x1b[31mProcess exited with code ${result.exitCode}\x1b[0m`);
        }
      } catch (error) {
        xterm.write(`\r\n\x1b[31mError: ${error instanceof Error ? error.message : 'Unknown error'}\x1b[0m`);
      }

      // Write prompt
      const prompt = `\r\n\x1b[1;36m$\x1b[0m `;
      xterm.write(prompt);
    };

    // Initialize backend (if needed)
    // BackendInitializer is used in WebVM components

    // Set up input handler
    let currentLine = '';
    xterm.onData((data) => {
      if (data === '\r' || data === '\n') {
        handleCommand(currentLine);
        currentLine = '';
      } else if (data === '\x7f' || data === '\b') {
        // Backspace
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          xterm.write('\b \b');
        }
      } else if (data === '\x03') {
        // Ctrl+C
        xterm.write('^C\r\n');
        currentLine = '';
        const prompt = `\x1b[1;36m$\x1b[0m `;
        xterm.write(prompt);
      } else if (data >= ' ') {
        // Printable characters
        currentLine += data;
        xterm.write(data);
      }
    });

    // Write initial prompt
    const prompt = `\x1b[1;36m$\x1b[0m `;
    xterm.write(prompt);

    // Handle resize
    const handleResize = () => {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit();
      }
    };

    window.addEventListener('resize', handleResize);
    
    let resizeObserver: ResizeObserver | null = null;
    if (terminalRef.current) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(terminalRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      xterm.dispose();
    };
  }, [theme, instanceId, compact, initialOutput]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.surface,
        borderRadius: '0',
        overflow: 'hidden',
      }}
    >
      {!compact && showDesktopButton && onDesktopClick && (
        <TerminalControls 
          onDesktopClick={onDesktopClick} 
          showDesktop={showDesktopButton}
          loading={desktopLoading}
        />
      )}
      <div
        ref={terminalRef}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          minHeight: 0,
          padding: '16px',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};
