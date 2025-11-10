#!/usr/bin/env node
/**
 * Cloud Metadata Server
 * Backend service that provides metadata server authentication endpoints
 * Similar to Google Cloud Shell's backend authentication
 */

const http = require('http');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const PORT = process.env.METADATA_SERVER_PORT || 3002;

const http = require('http');

/**
 * Makes HTTP request (Node.js compatible)
 */
function httpRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || 80,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {},
    };

    const req = http.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ ok: true, status: res.statusCode, text: () => Promise.resolve(data), json: () => Promise.resolve(JSON.parse(data)) });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Fetches token from metadata server
 */
async function fetchMetadataToken() {
  try {
    const response = await httpRequest(
      'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
      {
        headers: { 'Metadata-Flavor': 'Google' },
      }
    );

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch metadata token: ${error.message}`);
  }
}

/**
 * Fetches custom metadata token
 */
async function fetchCustomMetadataToken(key = 'long-lived-token') {
  try {
    const response = await httpRequest(
      `http://metadata.google.internal/computeMetadata/v1/instance/attributes/${key}`,
      {
        headers: { 'Metadata-Flavor': 'Google' },
      }
    );

    return await response.text();
  } catch (error) {
    throw new Error(`Failed to fetch custom metadata token: ${error.message}`);
  }
}

/**
 * Executes gcloud command with token
 */
async function executeGcloudCommand(command, token) {
  const tokenFile = `/tmp/gcloud_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.txt`;
  
  try {
    // Write token to file
    const fs = require('fs');
    fs.writeFileSync(tokenFile, token);
    
    // Execute gcloud command
    const { stdout, stderr } = await execAsync(
      `gcloud ${command} --access-token-file="${tokenFile}"`,
      {
        timeout: 60000,
        maxBuffer: 1024 * 1024 * 10, // 10MB
      }
    );

    // Clean up token file
    fs.unlinkSync(tokenFile);

    return {
      success: true,
      stdout,
      stderr,
      exitCode: 0,
    };
  } catch (error) {
    // Clean up token file
    try {
      const fs = require('fs');
      fs.unlinkSync(tokenFile);
    } catch {}

    return {
      success: false,
      stdout: error.stdout || '',
      stderr: error.stderr || error.message,
      exitCode: error.code || 1,
    };
  }
}

/**
 * HTTP Server
 */
const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  try {
    // Health check
    if (path === '/api/health' && req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({
        status: 'ok',
        service: 'cloud-metadata-server',
        timestamp: Date.now(),
      }));
      return;
    }

    // Get access token
    if (path === '/api/token' && req.method === 'GET') {
      try {
        const tokenData = await fetchMetadataToken();
        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          token: tokenData.access_token,
          expiresIn: tokenData.expires_in,
          tokenType: tokenData.token_type,
        }));
      } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({
          success: false,
          error: error.message,
        }));
      }
      return;
    }

    // Get custom metadata token
    if (path === '/api/token/custom' && req.method === 'GET') {
      const key = url.searchParams.get('key') || 'long-lived-token';
      try {
        const token = await fetchCustomMetadataToken(key);
        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          token,
        }));
      } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({
          success: false,
          error: error.message,
        }));
      }
      return;
    }

    // Execute gcloud command
    if (path === '/api/gcloud' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', async () => {
        try {
          const { command, useCustomToken, customTokenKey } = JSON.parse(body || '{}');
          
          if (!command) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'command is required' }));
            return;
          }

          // Get token
          let token;
          if (useCustomToken) {
            token = await fetchCustomMetadataToken(customTokenKey || 'long-lived-token');
          } else {
            const tokenData = await fetchMetadataToken();
            token = tokenData.access_token;
          }

          // Execute command
          const result = await executeGcloudCommand(command, token);
          
          res.writeHead(result.success ? 200 : 500);
          res.end(JSON.stringify(result));
        } catch (error) {
          res.writeHead(500);
          res.end(JSON.stringify({
            success: false,
            error: error.message,
          }));
        }
      });
      return;
    }

    // Check if in cloud environment
    if (path === '/api/environment' && req.method === 'GET') {
      try {
        const response = await httpRequest(
          'http://metadata.google.internal/computeMetadata/v1/instance/',
          {
            headers: { 'Metadata-Flavor': 'Google' },
          }
        );
        
        res.writeHead(200);
        res.end(JSON.stringify({
          isCloudEnvironment: response.ok,
        }));
      } catch {
        res.writeHead(200);
        res.end(JSON.stringify({
          isCloudEnvironment: false,
        }));
      }
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
  console.log(`Cloud Metadata Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Token endpoint: http://localhost:${PORT}/api/token`);
  console.log(`GCloud endpoint: http://localhost:${PORT}/api/gcloud`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down cloud metadata server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

