import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../theme/theme';
import { createWebVMConfig, buildWebVMUrl, WEBVM_IMAGES } from '../../lib/webvm-integration';

/**
 * WebVM with Backend
 * WebVM instance that automatically starts the backend server
 */
export const WebVMWithBackend: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [backendReady, setBackendReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create WebVM config with backend auto-start
    // The backend will be started via a custom command that runs on WebVM startup
    const config = createWebVMConfig(WEBVM_IMAGES.DEBIAN_MINI, {
      CMD: ['/bin/bash'],
      ARGS: ['-c', `
        # Auto-start AzaleaCloud Backend
        echo "Starting AzaleaCloud Backend Server..."
        
        # Create backend directory
        mkdir -p /home/user/backend
        cd /home/user/backend
        
        # Create server.js
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

        # Start backend in background
        node server.js > /tmp/backend.log 2>&1 &
        echo $! > /tmp/backend.pid
        echo "Backend server started on port 3001"
        
        # Keep shell alive
        exec /bin/bash
      `],
      ENV: {
        HOME: '/home/user',
        TERM: 'xterm',
        USER: 'user',
        SHELL: '/bin/bash',
      },
      CWD: '/home/user',
    });

    // Build WebVM URL
    const webvmUrl = buildWebVMUrl(config);

    // Create iframe for WebVM
    const iframe = document.createElement('iframe');
    iframe.src = webvmUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.backgroundColor = theme.surface;
    iframe.allow = 'clipboard-read; clipboard-write';
    iframe.title = 'AzaleaCloud Backend - WebVM';
    
    iframe.onload = () => {
      setLoading(false);
      // Check backend health after a delay
      const checkBackend = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/health', {
            method: 'GET',
            signal: AbortSignal.timeout(5000),
          });
          if (response.ok) {
            setBackendReady(true);
          } else {
            // Retry after 2 seconds
            setTimeout(checkBackend, 2000);
          }
        } catch (error) {
          // Backend not ready yet, retry
          setTimeout(checkBackend, 2000);
        }
      };
      
      // Start checking after 3 seconds
      setTimeout(checkBackend, 3000);
    };

    containerRef.current.appendChild(iframe);

    return () => {
      if (containerRef.current && iframe.parentNode) {
        containerRef.current.removeChild(iframe);
      }
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
            dns
          </span>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: theme.text }}>
              AzaleaCloud Backend (WebVM)
            </div>
            <div style={{ fontSize: '11px', color: theme.textSecondary }}>
              Auto-starting backend server...
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: '12px',
            color: backendReady ? theme.success : theme.textSecondary,
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
              backgroundColor: backendReady ? theme.success : theme.textSecondary,
            }}
          />
          {backendReady ? 'Backend Ready' : 'Starting...'}
        </div>
      </div>
      <div
        ref={containerRef}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          display: loading ? 'none' : 'block',
        }}
      />
      {loading && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '16px',
            color: theme.textSecondary,
          }}
        >
          <span className="material-icons" style={{ fontSize: '48px' }}>
            dns
          </span>
          <div>Loading WebVM with backend server...</div>
        </div>
      )}
    </div>
  );
};

