import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import 'xterm/css/xterm.css';
import { useTheme } from '../../theme/theme';
import { CloudShellService } from '../../services/cloudShellService';

interface TerminalProps {
  onCommand?: (command: string) => void;
  initialOutput?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ onCommand, initialOutput }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const { theme } = useTheme();
  const cloudShellService = useRef(new CloudShellService());

  const handleCommand = React.useCallback(async (command: string) => {
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
      fontSize: 14,
      fontFamily: '"Fira Code", "Courier New", monospace',
      theme: {
        background: theme.surface,
        foreground: theme.text,
        cursor: theme.accent,
        selection: theme.surfaceVariant,
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
    xterm.writeln('\x1b[1;36mWelcome to AzaleaCloud Terminal\x1b[0m');
    xterm.writeln('Type \x1b[1;33mhelp\x1b[0m for available commands.\r\n');

    // Command handling
    let currentLine = '';
    xterm.onData((data) => {
      if (data === '\r') {
        // Enter pressed
        xterm.write('\r\n');
        if (currentLine.trim()) {
          handleCommand(currentLine.trim());
        }
        currentLine = '';
        xterm.write('\x1b[1;32mazalea@cloud\x1b[0m:\x1b[1;34m~\x1b[0m$ ');
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
        xterm.write('\x1b[1;32mazalea@cloud\x1b[0m:\x1b[1;34m~\x1b[0m$ ');
      } else {
        currentLine += data;
        xterm.write(data);
      }
    });

    // Initial prompt
    xterm.write('\x1b[1;32mazalea@cloud\x1b[0m:\x1b[1;34m~\x1b[0m$ ');

    // Handle resize
    const handleResize = () => {
      fitAddon.fit();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      xterm.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, handleCommand]);

  return (
    <div
      ref={terminalRef}
      style={{
        width: '100%',
        height: '100%',
        padding: '16px',
        backgroundColor: theme.surface,
        borderRadius: '8px',
      }}
    />
  );
};

