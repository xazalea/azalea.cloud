'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@heroui/react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalWindowProps {
  windowId: string;
}

export function TerminalWindow({ windowId }: TerminalWindowProps) {
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output' | 'error'; text: string }>>([
    { type: 'output', text: 'Web Terminal - Attempting to access system...' },
    { type: 'output', text: 'Note: Direct command execution may be limited by browser security.' },
    { type: 'output', text: 'Type "help" for available commands.\n' },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight);
  }, [history]);

  const executeCommand = async (command: string) => {
    const cmd = command.trim().toLowerCase();
    const parts = cmd.split(' ');
    const [baseCmd, ...args] = parts;

    // Add input to history
    setHistory(prev => [...prev, { type: 'input', text: `$ ${command}` }]);

    // Try to execute via various methods
    try {
      switch (baseCmd) {
        case 'help':
          setHistory(prev => [...prev, {
            type: 'output',
            text: `Available commands:
  help - Show this help message
  whoami - Get current user info
  pwd - Get current location
  curl [url] - Fetch URL content
  navigate [url] - Navigate browser to URL
  localhost - Try to access localhost services
  system - Show system information
  escape - Attempt to escape iframe restrictions
  exec [command] - Execute command via API (if available)
  clear - Clear terminal
`
          }]);
          break;

        case 'whoami':
          // Try to get user agent and system info
          const userAgent = navigator.userAgent;
          const platform = navigator.platform;
          const language = navigator.language;
          setHistory(prev => [...prev, {
            type: 'output',
            text: `User Agent: ${userAgent}\nPlatform: ${platform}\nLanguage: ${language}\nLocation: ${window.location.href}`
          }]);
          break;

        case 'pwd':
          setHistory(prev => [...prev, {
            type: 'output',
            text: `Current URL: ${window.location.href}\nOrigin: ${window.location.origin}\nProtocol: ${window.location.protocol}`
          }]);
          break;

        case 'curl':
        case 'fetch':
          if (args[0]) {
            try {
              // Try to fetch the URL
              const url = args[0].startsWith('http') ? args[0] : `http://${args[0]}`;
              const response = await fetch(url, { mode: 'no-cors' });
              setHistory(prev => [...prev, {
                type: 'output',
                text: `Fetching ${url}...\nStatus: ${response.status || 'CORS blocked - trying alternative methods'}`
              }]);
            } catch (error) {
              setHistory(prev => [...prev, {
                type: 'error',
                text: `Error: ${error instanceof Error ? error.message : 'Failed to fetch'}`
              }]);
            }
          } else {
            setHistory(prev => [...prev, { type: 'error', text: 'Usage: curl <url>' }]);
          }
          break;

        case 'exec':
        case 'run':
          // Try to execute via API (if available)
          if (args.length > 0) {
            const commandToExec = args.join(' ');
            try {
              const response = await fetch('/api/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command: commandToExec }),
              });
              const result = await response.json();
              if (result.success) {
                setHistory(prev => [...prev, {
                  type: 'output',
                  text: result.output || 'Command executed successfully'
                }]);
              } else {
                setHistory(prev => [...prev, {
                  type: 'error',
                  text: result.error || 'Command failed'
                }]);
              }
            } catch (error) {
              setHistory(prev => [...prev, {
                type: 'error',
                text: `API error: ${error instanceof Error ? error.message : 'Failed to execute'}`
              }]);
            }
          } else {
            setHistory(prev => [...prev, { type: 'error', text: 'Usage: exec <command>' }]);
          }
          break;

        case 'navigate':
        case 'open':
          if (args[0]) {
            const url = args[0].startsWith('http') ? args[0] : `http://${args[0]}`;
            // Try multiple navigation methods
            try {
              window.open(url, '_blank');
              setHistory(prev => [...prev, { type: 'output', text: `Attempting to open ${url} in new tab...` }]);
            } catch (error) {
              // Try iframe method
              setHistory(prev => [...prev, { type: 'output', text: `Trying alternative method for ${url}...` }]);
            }
          } else {
            setHistory(prev => [...prev, { type: 'error', text: 'Usage: navigate <url>' }]);
          }
          break;

        case 'localhost':
          // Try to access common localhost services
          const localhostPorts = [3000, 8080, 5000, 8000, 3001, 5173, 4000];
          setHistory(prev => [...prev, { type: 'output', text: 'Attempting to access localhost services...' }]);
          
          for (const port of localhostPorts) {
            try {
              const testUrl = `http://localhost:${port}`;
              // Try to create an iframe or fetch
              setHistory(prev => [...prev, {
                type: 'output',
                text: `Testing localhost:${port}...`
              }]);
            } catch (error) {
              // Continue
            }
          }
          break;

        case 'escape':
          // Try to escape iframe restrictions
          setHistory(prev => [...prev, { type: 'output', text: 'Attempting to escape iframe restrictions...' }]);
          
          // Method 1: Try to break out of iframe
          if (window.self !== window.top) {
            try {
              window.top!.location.href = window.location.href;
              setHistory(prev => [...prev, { type: 'output', text: 'Successfully escaped iframe!' }]);
            } catch (error) {
              setHistory(prev => [...prev, {
                type: 'error',
                text: 'Cannot escape iframe (X-Frame-Options protection)'
              }]);
            }
          } else {
            setHistory(prev => [...prev, { type: 'output', text: 'Not in an iframe' }]);
          }
          break;

        case 'system':
          // Get system information
          const sysInfo = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            location: window.location.href,
            origin: window.location.origin,
            protocol: window.location.protocol,
          };
          setHistory(prev => [...prev, {
            type: 'output',
            text: `System Information:\n${JSON.stringify(sysInfo, null, 2)}`
          }]);
          break;

        case 'clear':
        case 'cls':
          setHistory(prev => prev.slice(0, 3)); // Keep initial messages
          break;

        default:
          setHistory(prev => [...prev, {
            type: 'error',
            text: `Command not found: ${baseCmd}. Type "help" for available commands.`
          }]);
      }
    } catch (error) {
      setHistory(prev => [...prev, {
        type: 'error',
        text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      }]);
    }

    setCurrentInput('');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (currentInput.trim()) {
        executeCommand(currentInput);
      }
    }
  };

  return (
    <div className="w-full h-full bg-black text-green-400 font-mono text-sm flex flex-col">
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-4 space-y-1"
        style={{ scrollbarWidth: 'thin' }}
      >
        {history.map((item, index) => (
          <div
            key={index}
            className={
              item.type === 'input'
                ? 'text-green-300'
                : item.type === 'error'
                ? 'text-red-400'
                : 'text-green-400'
            }
          >
            {item.text.split('\n').map((line, i) => (
              <div key={i}>{line || '\u00A0'}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-green-500/30 p-2 flex items-center gap-2">
        <TerminalIcon className="w-4 h-4 text-green-400" />
        <Input
          ref={inputRef}
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter command..."
          classNames={{
            input: 'text-green-400 bg-transparent',
            inputWrapper: 'bg-transparent border-green-500/30',
          }}
          className="flex-1"
          autoFocus
        />
      </div>
    </div>
  );
}

