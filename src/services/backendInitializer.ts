/**
 * Backend Initializer Service
 * Initializes the backend server in WebVM by executing commands
 */

export class BackendInitializer {
  /**
   * Initialize backend in WebVM terminal
   * This should be called when AzaleaCloud provider is selected
   */
  static getInitScript(): string {
    return `
# AzaleaCloud Backend Initialization
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

# Start server in background
node server.js > /tmp/backend.log 2>&1 &
echo $! > /tmp/backend.pid
echo "Backend server started"
    `.trim();
  }
}

