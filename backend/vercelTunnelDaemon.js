/**
 * Vercel Tunnel Daemon (Node.js version)
 * Based on https://github.com/scubbo/vercel-tunnel
 * 
 * Runs as a backend service to connect to Vercel listener
 * and forward requests to localhost services
 */

const WebSocket = require('ws');
const http = require('http');
const https = require('https');
const { URL } = require('url');

class VercelTunnelDaemon {
  constructor(targetHostname, tunnelUrl) {
    this.targetHostname = targetHostname;
    this.tunnelUrl = tunnelUrl;
    this.ws = null;
    this.connected = false;
    this.maxRetries = 5;
    this.retryCount = 0;
    this.retryDelay = 2000;
  }

  start() {
    const targetUrl = this.targetHostname.startsWith('http')
      ? this.targetHostname
      : `http://${this.targetHostname}`;
    this.parsedTarget = new URL(targetUrl);
    
    const wsUrl = new URL(this.tunnelUrl);
    
    this.connect(wsUrl);
  }

  connect(wsUrl) {
    console.log(`Connecting to tunnel listener at: ${wsUrl.toString()}`);
    
    this.ws = new WebSocket(wsUrl.toString());
    
    this.ws.on('open', () => {
      console.log('✅ Connected to tunnel listener');
      this.connected = true;
      this.retryCount = 0;
    });

    this.ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString());

        if (message.type === 'connected') {
          console.log('🔗 Tunnel connection established');
          return;
        }

        if (message.type === 'http_request') {
          this.handleHttpRequest(message);
          return;
        }

        console.warn('⚠️ Unknown message type:', message.type);
      } catch (error) {
        console.error('❌ Error parsing WebSocket message:', error);
      }
    });

    this.ws.on('close', (code, reason) => {
      console.log(`🔌 WebSocket connection closed: ${code} ${reason.toString()}`);
      this.connected = false;
      this.attemptReconnect(wsUrl);
    });

    this.ws.on('error', (error) => {
      console.error('❌ WebSocket error:', error);
      this.connected = false;
    });
  }

  handleHttpRequest(request) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    console.log(`📨 ${request.method} ${request.path}`);

    // Build target URL
    const targetUrl = new URL(request.path, this.parsedTarget);
    
    // Add query parameters
    if (request.query && Object.keys(request.query).length > 0) {
      Object.entries(request.query).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => targetUrl.searchParams.append(key, v));
        } else {
          targetUrl.searchParams.set(key, value);
        }
      });
    }

    // Choose HTTP or HTTPS module
    const httpModule = targetUrl.protocol === 'https:' ? https : http;

    // Prepare request options
    const options = {
      hostname: targetUrl.hostname,
      port: targetUrl.port || (targetUrl.protocol === 'https:' ? 443 : 80),
      path: targetUrl.pathname + targetUrl.search,
      method: request.method,
      headers: request.headers,
    };

    // Create the request
    const req = httpModule.request(options, (res) => {
      const responseChunks = [];

      res.on('data', (chunk) => {
        responseChunks.push(chunk);
      });

      res.on('end', () => {
        const responseBody = Buffer.concat(responseChunks);
        const contentType = res.headers['content-type'] || '';

        // Determine if response is binary or text
        let body;
        if (contentType.includes('application/json')) {
          try {
            body = JSON.parse(responseBody.toString());
          } catch {
            body = responseBody.toString();
          }
        } else if (contentType.startsWith('text/') || contentType.includes('html')) {
          body = responseBody.toString();
        } else {
          // For binary data, convert to base64
          body = responseBody.toString('base64');
        }

        // Filter out undefined values from headers
        const cleanHeaders = {};
        Object.entries(res.headers).forEach(([key, value]) => {
          if (value !== undefined) {
            cleanHeaders[key] = value;
          }
        });

        const response = {
          type: 'http_response',
          status: res.statusCode || 200,
          headers: cleanHeaders,
          body: body,
        };

        // Send response back through WebSocket
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(response));
          console.log(`📤 ${res.statusCode} ${request.method} ${request.path}`);
        }
      });
    });

    // Handle request errors
    req.on('error', (error) => {
      console.error(`❌ Request error for ${request.method} ${request.path}:`, error.message);

      const errorResponse = {
        type: 'http_response',
        status: 502,
        headers: { 'content-type': 'application/json' },
        body: { error: 'Bad Gateway', message: error.message },
      };

      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(errorResponse));
      }
    });

    // Send request body if present
    if (request.body) {
      if (typeof request.body === 'string') {
        req.write(request.body);
      } else if (Buffer.isBuffer(request.body)) {
        req.write(request.body);
      } else {
        req.write(JSON.stringify(request.body));
      }
    }

    req.end();
  }

  attemptReconnect(wsUrl) {
    if (this.retryCount >= this.maxRetries) {
      console.error(`❌ Failed to reconnect after ${this.maxRetries} attempts`);
      return;
    }

    this.retryCount++;
    console.log(`⚠️ Attempting to reconnect (${this.retryCount}/${this.maxRetries})...`);

    setTimeout(() => {
      this.connect(wsUrl);
    }, this.retryDelay);
  }

  close() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.connected = false;
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length !== 2) {
    console.log('Usage: node vercelTunnelDaemon.js <target-hostname> <tunnel-url>');
    console.log('Example: node vercelTunnelDaemon.js localhost:8080 wss://your-app.vercel.app/api/tunnel/accept');
    process.exit(1);
  }

  const [targetHostname, tunnelUrl] = args;
  
  console.log('Starting tunnel:');
  console.log(`  Target: ${targetHostname}`);
  console.log(`  Tunnel: ${tunnelUrl}`);
  console.log('');

  const daemon = new VercelTunnelDaemon(targetHostname, tunnelUrl);
  daemon.start();

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down tunnel...');
    daemon.close();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\nShutting down tunnel...');
    daemon.close();
    process.exit(0);
  });
}

module.exports = VercelTunnelDaemon;

