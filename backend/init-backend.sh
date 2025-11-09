#!/bin/bash
# Initialize and start AzaleaCloud Backend in WebVM

echo "=== AzaleaCloud Backend Initialization ==="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get update && apt-get install -y nodejs
fi

# Create backend directory
mkdir -p /home/user/backend
cd /home/user/backend

# Create server.js inline
cat > server.js << 'EOFSERVER'
const http = require('http');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const PORT = 3001;

async function runDockerCommand(command) {
  try {
    const { stdout, stderr } = await execAsync(`docker ${command}`, {
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
      const containerId = existingContainers.trim().split('\n')[0];
      await runDockerCommand(`start ${containerId}`);
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
    const result = await runDockerCommand(`stop ${containerId}`);
    if (result.success) {
      return { success: true };
    }
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

    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`AzaleaCloud Backend Server running on port ${PORT}`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
});
EOFSERVER

# Start server in background
echo "Starting backend server..."
node server.js > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > /tmp/backend.pid
echo "Backend started with PID: $BACKEND_PID"

# Wait a moment and check if it's running
sleep 2
if ps -p $BACKEND_PID > /dev/null; then
    echo "✓ Backend server is running"
    echo "Health check: curl http://localhost:3001/api/health"
else
    echo "✗ Backend server failed to start"
    cat /tmp/backend.log
fi

