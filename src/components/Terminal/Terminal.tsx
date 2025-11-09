import React, { useEffect, useRef, useCallback } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import '@xterm/xterm/css/xterm.css';
import { useTheme } from '../../theme/theme';
import { CloudShellService } from '../../services/cloudShellService';
import { TerminalControls } from './TerminalControls';

interface TerminalProps {
  onCommand?: (command: string) => void;
  initialOutput?: string;
  instanceId?: string;
  compact?: boolean;
  onDesktopClick?: () => void;
  showDesktopButton?: boolean;
}

export const Terminal: React.FC<TerminalProps> = ({ 
  onCommand, 
  initialOutput,
  instanceId,
  compact = false,
  onDesktopClick,
  showDesktopButton = false,
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const { theme } = useTheme();
  const cloudShellService = useRef(new CloudShellService());
  const currentLineRef = useRef('');

  const handleCommand = useCallback(async (command: string) => {
    const parts = command.split(' ');
    const cmd = parts[0].toLowerCase();

    // Handle clear command immediately
    if (cmd === 'clear') {
      xtermRef.current?.clear();
      return;
    }

    // Use cloud shell service for command execution
    try {
      const result = await cloudShellService.current.executeCommand(command);
      
      if (result.exitCode === 0) {
        xtermRef.current?.writeln(result.output);
      } else {
        xtermRef.current?.writeln(`\x1b[1;31m${result.output}\x1b[0m`);
      }
    } catch (error) {
      xtermRef.current?.writeln(`\x1b[1;31mError: ${error instanceof Error ? error.message : 'Unknown error'}\x1b[0m`);
    }

    // Also call the onCommand callback if provided
    if (onCommand) {
      onCommand(command);
    }
  }, [onCommand]);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize xterm
    const xterm = new XTerm({
      cursorBlink: true,
      fontSize: compact ? 12 : 14,
      fontFamily: '"Roboto Mono", "Courier New", monospace',
      lineHeight: 1.2,
      letterSpacing: 0,
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

    // Write initial output
    if (initialOutput) {
      xterm.writeln(initialOutput);
    }

    // Welcome message
    const prompt = instanceId 
      ? `\x1b[1;32mazalea@cloud-${instanceId}\x1b[0m:\x1b[1;34m~\x1b[0m$ `
      : `\x1b[1;32mazalea@cloud\x1b[0m:\x1b[1;34m~\x1b[0m$ `;
    
    xterm.writeln('\x1b[1;36mWelcome to AzaleaCloud Terminal\x1b[0m');
    xterm.writeln('Type \x1b[1;33mhelp\x1b[0m for available commands.\r\n');

    // Command handling
    xterm.onData((data) => {
      if (data === '\r' || data === '\n') {
        // Enter pressed
        xterm.write('\r\n');
        if (currentLineRef.current.trim()) {
          handleCommand(currentLineRef.current.trim());
        }
        currentLineRef.current = '';
        xterm.write(prompt);
      } else if (data === '\x7f' || data === '\b') {
        // Backspace
        if (currentLineRef.current.length > 0) {
          currentLineRef.current = currentLineRef.current.slice(0, -1);
          xterm.write('\b \b');
        }
      } else if (data === '\x03') {
        // Ctrl+C
        xterm.write('^C\r\n');
        currentLineRef.current = '';
        xterm.write(prompt);
      } else if (data === '\x04') {
        // Ctrl+D (EOF)
        xterm.write('^D\r\n');
        currentLineRef.current = '';
        xterm.write(prompt);
      } else if (data.charCodeAt(0) >= 32) {
        // Printable characters
        currentLineRef.current += data;
        xterm.write(data);
      }
    });

    // Initial prompt
    xterm.write(prompt);

    // Handle resize
    const handleResize = () => {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit();
      }
    };
    
    // Use ResizeObserver for better resize handling
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
  }, [theme, handleCommand, instanceId, compact, initialOutput]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.surface,
        borderRadius: compact ? '4px' : '8px',
        overflow: 'hidden',
      }}
    >
      {!compact && (
        <>
          {showDesktopButton && onDesktopClick && (
            <TerminalControls onDesktopClick={onDesktopClick} showDesktop={showDesktopButton} />
          )}
          <div
            style={{
              padding: '8px 16px',
              backgroundColor: theme.surfaceVariant,
              borderBottom: `1px solid ${theme.border}`,
              borderRadius: showDesktopButton ? '0' : '8px 8px 0 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: theme.textSecondary,
            }}
          >
            <span className="material-icons" style={{ fontSize: '16px' }}>
              terminal
            </span>
            <span>AzaleaCloud Terminal</span>
          </div>
        </>
      )}
      <div
        ref={terminalRef}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          padding: compact ? '8px' : '16px',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};
