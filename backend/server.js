#!/usr/bin/env node
/**
 * AzaleaCloud Backend Server
 * Runs in WebVM to handle Docker commands and desktop management
 */

const http = require('http');
const { exec } = require('child_process');
const { promisify } = require('util');
const VercelTunnelDaemon = require('./vercelTunnelDaemon');

const execAsync = promisify(exec);
const PORT = 3001;

// Store active tunnel daemons
const activeTunnels = new Map();

// Store active containers
const containers = new Map();

/**
 * Execute Docker command
 */
async function runDockerCommand(command) {
  try {
    const { stdout, stderr } = await execAsync(`docker ${command}`, {
      timeout: 30000,
      maxBuffer: 1024 * 1024 * 10, // 10MB
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

/**
 * Start desktop container
 */
async function startDesktop() {
  try {
    // Check if container already exists
    const { stdout: existingContainers } = await execAsync(
      'docker ps -a --filter "ancestor=dorowu/ubuntu-desktop-lxde-vnc" --format "{{.ID}}"'
    );
    
    if (existingContainers.trim()) {
      const containerId = existingContainers.trim().split('\n')[0];
      // Start existing container
      await runDockerCommand(`start ${containerId}`);
      
      // Start tunnel daemon if not already running
      if (!activeTunnels.has(containerId)) {
        const vercelUrl = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL || 'https://azalea-cloud.vercel.app';
        const tunnelUrl = `${vercelUrl.replace(/^https?:/, 'wss:')}/api/tunnel/accept`;
        try {
          const daemon = new VercelTunnelDaemon(`localhost:8080`, tunnelUrl);
          daemon.start();
          activeTunnels.set(containerId, daemon);
          console.log(`Started tunnel daemon for existing container ${containerId}`);
        } catch (error) {
          console.error('Failed to start tunnel daemon:', error);
        }
      }
      
      const vercelUrl = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL || 'https://azalea-cloud.vercel.app';
      // Use full URL with proper encoding for VNC
      const vncUrl = `${vercelUrl}/api/proxy?port=8080&path=${encodeURIComponent('/vnc.html')}`;
      
      return {
        success: true,
        containerId,
        port: 8080,
        vncUrl,
      };
    }

    // Create new container
    const { stdout: containerId } = await execAsync(
      'docker run -d -p 8080:80 --name azalea-desktop-$(date +%s) dorowu/ubuntu-desktop-lxde-vnc'
    );
    
    const id = containerId.trim();
    containers.set(id, {
      id,
      port: 8080,
      status: 'running',
      createdAt: Date.now(),
    });

    // Start tunnel daemon for this desktop
    const vercelUrl = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL || 'https://azalea-cloud.vercel.app';
    const tunnelUrl = `${vercelUrl.replace(/^https?:/, 'wss:')}/api/tunnel/accept`;
    
    try {
      const daemon = new VercelTunnelDaemon(`localhost:8080`, tunnelUrl);
      daemon.start();
      activeTunnels.set(id, daemon);
      console.log(`Started tunnel daemon for container ${id}`);
      
      // Return Vercel proxy URL instead of localhost with proper encoding
      const vncUrl = `${vercelUrl}/api/proxy?port=8080&path=${encodeURIComponent('/vnc.html')}`;
      
      return {
        success: true,
        containerId: id,
        port: 8080,
        vncUrl,
      };
    } catch (error) {
      console.error('Failed to start tunnel daemon:', error);
      // Fallback to localhost URL
      return {
        success: true,
        containerId: id,
        port: 8080,
        vncUrl: `http://localhost:8080/vnc.html`,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Stop desktop container
 */
async function stopDesktop(containerId) {
  try {
    // Stop tunnel daemon if running
    if (activeTunnels.has(containerId)) {
      const daemon = activeTunnels.get(containerId);
      daemon.close();
      activeTunnels.delete(containerId);
      console.log(`Stopped tunnel daemon for container ${containerId}`);
    }
    
    const result = await runDockerCommand(`stop ${containerId}`);
    if (result.success) {
      containers.delete(containerId);
    }
    return result;
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Get container status
 */
async function getContainerStatus(containerId) {
  try {
    const { stdout } = await execAsync(`docker ps -a --filter "id=${containerId}" --format "{{.Status}}"`);
    return {
      success: true,
      status: stdout.trim() || 'not found',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * HTTP Server
 */
const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
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

    if (path === '/api/desktop/status' && req.method === 'GET') {
      const containerId = url.searchParams.get('containerId');
      if (containerId) {
        const result = await getContainerStatus(containerId);
        res.writeHead(200);
        res.end(JSON.stringify(result));
      } else {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'containerId required' }));
      }
      return;
    }

    if (path === '/api/containers' && req.method === 'GET') {
      const { stdout } = await execAsync('docker ps -a --format "{{.ID}}|{{.Names}}|{{.Status}}"');
      const containers = stdout.trim().split('\n').map(line => {
        const [id, name, ...statusParts] = line.split('|');
        return { id, name, status: statusParts.join('|') };
      });
      res.writeHead(200);
      res.end(JSON.stringify({ containers }));
      return;
    }

    if (path === '/api/sshx/start' && req.method === 'POST') {
      try {
        // Install sshx if not already installed
        const { stdout: sshxCheck } = await execAsync('which sshx || echo "not found"');
        if (sshxCheck.trim() === 'not found') {
          console.log('Installing sshx...');
          await execAsync('curl -sSf https://sshx.io/get | sh', {
            timeout: 60000,
            maxBuffer: 1024 * 1024 * 10,
          });
        }

        // Start sshx and capture the session URL
        console.log('Starting sshx...');
        const { stdout: sshxOutput } = await execAsync('sshx', {
          timeout: 30000,
          maxBuffer: 1024 * 1024 * 10,
        });

        // Parse sshx output to extract session URL
        // sshx typically outputs something like: "Session: https://sshx.io/abc123"
        const urlMatch = sshxOutput.match(/https?:\/\/sshx\.io\/[a-zA-Z0-9-]+/);
        const sessionUrl = urlMatch ? urlMatch[0] : null;

        if (sessionUrl) {
          res.writeHead(200);
          res.end(JSON.stringify({ 
            success: true, 
            url: sessionUrl,
            sessionId: sessionUrl.split('/').pop(),
          }));
        } else {
          // If no URL found, return the sshx.io homepage URL
          res.writeHead(200);
          res.end(JSON.stringify({ 
            success: true, 
            url: 'https://sshx.io/',
            sessionId: null,
          }));
        }
      } catch (error) {
        console.error('SSHX start error:', error);
        res.writeHead(500);
        res.end(JSON.stringify({ 
          success: false, 
          error: error.message,
          fallback: 'https://sshx.io/',
        }));
      }
      return;
    }

    if (path === '/api/command/execute' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', async () => {
        try {
          const { command } = JSON.parse(body);
          
          if (!command || typeof command !== 'string') {
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'Command is required' }));
            return;
          }

          // Execute the command
          console.log(`Executing command: ${command}`);
          try {
            const { stdout, stderr } = await execAsync(command, {
              timeout: 30000,
              maxBuffer: 1024 * 1024 * 10, // 10MB
              cwd: process.env.HOME || '/home/user',
              env: { ...process.env, PATH: process.env.PATH || '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin' },
            });

            res.writeHead(200);
            res.end(JSON.stringify({
              success: true,
              output: stdout || '',
              error: stderr || '',
              exitCode: 0,
            }));
          } catch (execError) {
            // execAsync throws on non-zero exit codes, but we want to return the output
            const stdout = execError.stdout || '';
            const stderr = execError.stderr || '';
            const exitCode = execError.code || 1;

            res.writeHead(200);
            res.end(JSON.stringify({
              success: true,
              output: stdout,
              error: stderr,
              exitCode: exitCode,
            }));
          }
        } catch (error) {
          console.error('Command execution error:', error);
          res.writeHead(500);
          res.end(JSON.stringify({
            success: false,
            output: '',
            error: error.message || 'Unknown error',
            exitCode: 1,
          }));
        }
      });
      return;
    }

    if (path === '/api/cloudshell/init' && req.method === 'POST') {
      // Simulate cloud shell initialization (takes time like real Cloud Shell)
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        message: 'Cloud shell initialization started',
        estimatedTime: 30000, // 30 seconds
      }));
      return;
    }

    // 404
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`AzaleaCloud Backend Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

