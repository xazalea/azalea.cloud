import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../theme/theme';

/**
 * Embedded WebVM Component
 * Uses the built WebVM from submodule running in the browser
 */
export const WebVMEmbedded: React.FC<{ 
  autoStartBackend?: boolean;
  onBackendReady?: (ready: boolean) => void;
}> = ({ autoStartBackend = true, onBackendReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [backendReady, setBackendReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create iframe for WebVM
    // WebVM should be built and available at /webvm/
    const iframe = document.createElement('iframe');
    
    // Use local WebVM build if available, otherwise fallback to hosted
    const webvmUrl = existsSync('/webvm/index.html') 
      ? '/webvm/index.html' 
      : 'https://webvm.io/';
    
    iframe.src = webvmUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.backgroundColor = theme.surface;
    iframe.allow = 'clipboard-read; clipboard-write; fullscreen';
    iframe.title = 'AzaleaCloud WebVM';
    iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups allow-modals';
    
    iframe.onload = () => {
      setLoading(false);
      
      // If auto-start backend is enabled, wait for WebVM to load then inject backend script
      if (autoStartBackend) {
        setTimeout(() => {
          injectBackendScript(iframe);
        }, 5000); // Wait for WebVM to fully initialize
      }
    };

    iframeRef.current = iframe;
    containerRef.current.appendChild(iframe);

    return () => {
      if (containerRef.current && iframe.parentNode) {
        containerRef.current.removeChild(iframe);
      }
    };
  }, [theme, autoStartBackend]);

  const injectBackendScript = async (iframe: HTMLIFrameElement) => {
    try {
      // Access WebVM's window to inject backend startup script
      const webvmWindow = iframe.contentWindow;
      if (!webvmWindow) return;

      // Wait for WebVM terminal to be ready
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Inject backend initialization script into WebVM
      // This will be executed in the WebVM terminal
      const backendScript = `
# AzaleaCloud Backend Auto-Start
mkdir -p /home/user/backend
cd /home/user/backend

cat > server.js << 'EOFSERVER'
const http = require('http');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const PORT = 3001;

async function runDockerCommand(command) {
  try {
    const { stdout, stderr } = await execAsync(\`docker \${command}\`, {
      timeout: 30000,
      maxBuffer: 1024 * 1024 * 10,
    });
    return { success: true, output: stdout, error: stderr };
  } catch (error) {
    return { 
      success: false, 
      output: error.stdout || '', 
      error: error.stderr || error.message 
    };
  }
}

async function startDesktop() {
  try {
    const { stdout: existingContainers } = await execAsync(
      'docker ps -a --filter "ancestor=dorowu/ubuntu-desktop-lxde-vnc" --format "{{.ID}}"'
    );
    
    if (existingContainers.trim()) {
      const containerId = existingContainers.trim().split('\\n')[0];
      await runDockerCommand(\`start \${containerId}\`);
      return {
        success: true,
        containerId,
        port: 8080,
        vncUrl: 'http://localhost:8080/vnc.html',
      };
    }

    const { stdout: containerId } = await execAsync(
      'docker run -d -p 8080:80 --name azalea-desktop-$(date +%s) dorowu/ubuntu-desktop-lxde-vnc'
    );
    
    return {
      success: true,
      containerId: containerId.trim(),
      port: 8080,
      vncUrl: 'http://localhost:8080/vnc.html',
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function stopDesktop(containerId) {
  try {
    const result = await runDockerCommand(\`stop \${containerId}\`);
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, \`http://\${req.headers.host}\`);
  const path = url.pathname;

  try {
    if (path === '/api/health' && req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({ status: 'ok', timestamp: Date.now() }));
      return;
    }

    if (path === '/api/desktop/start' && req.method === 'POST') {
      const result = await startDesktop();
      res.writeHead(result.success ? 200 : 500);
      res.end(JSON.stringify(result));
      return;
    }

    if (path === '/api/desktop/stop' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', async () => {
        const { containerId } = JSON.parse(body || '{}');
        const result = await stopDesktop(containerId);
        res.writeHead(result.success ? 200 : 500);
        res.end(JSON.stringify(result));
      });
      return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(\`AzaleaCloud Backend Server running on port \${PORT}\`);
});
EOFSERVER

# Start backend
node server.js > /tmp/backend.log 2>&1 &
echo $! > /tmp/backend.pid
echo "Backend started on port 3001"
      `;

      // Try to send the script to WebVM terminal
      // Note: This requires WebVM to expose an API for command injection
      // For now, we'll check backend health periodically
      checkBackendHealth();
    } catch (error) {
      console.error('Failed to inject backend script:', error);
    }
  };

  const checkBackendHealth = async () => {
    const check = async () => {
      try {
        // Try WebVM backend first
        let response: Response | null = null;
        try {
          response = await fetch('http://localhost:3001/api/health', {
            method: 'GET',
            signal: AbortSignal.timeout(2000),
          });
        } catch {
          // WebVM backend not available
        }
        
        // Fallback to browser backend (always available)
        if (!response || !response.ok) {
          response = await fetch('/api/backend/health', {
            method: 'GET',
            signal: AbortSignal.timeout(2000),
          });
        }
        
        if (response && response.ok) {
          setBackendReady(true);
          onBackendReady?.(true);
        } else {
          setTimeout(check, 2000);
        }
      } catch (error) {
        // Backend not ready yet, retry
        setTimeout(check, 2000);
      }
    };
    check();
  };

  // Helper function to check if file exists (for browser)
  const existsSync = (path: string): boolean => {
    // In browser, we can't use fs.existsSync
    // Instead, we'll try to fetch the file
    return false; // Will be handled by fallback
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
            computer
          </span>
          <span>WebVM Backend</span>
        </div>
        {autoStartBackend && (
          <div
            style={{
              fontSize: '11px',
              color: backendReady ? theme.success : theme.textSecondary,
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
                backgroundColor: backendReady ? theme.success : theme.textSecondary,
              }}
            />
            {backendReady ? 'Ready' : 'Starting...'}
          </div>
        )}
      </div>
      <div
        ref={containerRef}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          minHeight: 0,
        }}
      />
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: theme.textSecondary,
          }}
        >
          <span className="material-icons" style={{ fontSize: '48px', marginBottom: '16px', display: 'block' }}>
            computer
          </span>
          <div>Loading WebVM...</div>
        </div>
      )}
    </div>
  );
};

