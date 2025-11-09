/**
 * Custom Next.js Server with WebSocket Support
 * This server handles both HTTP and WebSocket connections
 */

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const WebSocket = require('ws');
const net = require('net');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// VNC Server Configuration
const VNC_HOST = process.env.VNC_SERVER_HOST || 'localhost';
const VNC_PORT = parseInt(process.env.VNC_SERVER_PORT || '5900', 10);
const VNC_PASSWORD = process.env.VNC_PASSWORD || '';

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // WebSocket Server for VNC Proxy
  const wss = new WebSocket.Server({ 
    server,
    path: '/api/vnc/ws'
  });

  wss.on('connection', (ws, req) => {
    console.log('WebSocket client connected');
    
    let vncSocket = null;
    let isAuthenticated = false;

    // Connect to VNC Server
    const connectToVNC = () => {
      vncSocket = net.createConnection(VNC_PORT, VNC_HOST, () => {
        console.log('Connected to VNC server');
        ws.send(JSON.stringify({ type: 'status', status: 'Connected to VNC server' }));
        
        // Send VNC handshake
        // VNC protocol: Server sends version first
        // This is simplified - full VNC protocol would be implemented here
      });

      vncSocket.on('data', (data) => {
        // Forward VNC server data to WebSocket client
        if (ws.readyState === WebSocket.OPEN) {
          // Convert binary data to base64 for WebSocket transmission
          const base64 = data.toString('base64');
          ws.send(JSON.stringify({ 
            type: 'frame', 
            data: base64,
            format: 'raw'
          }));
        }
      });

      vncSocket.on('error', (err) => {
        console.error('VNC connection error:', err);
        ws.send(JSON.stringify({ 
          type: 'error', 
          error: 'VNC connection failed: ' + err.message 
        }));
      });

      vncSocket.on('close', () => {
        console.log('VNC connection closed');
        ws.send(JSON.stringify({ type: 'status', status: 'VNC disconnected' }));
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      });
    };

    // Handle messages from WebSocket client
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        
        switch (data.type) {
          case 'init':
            // Initialize connection
            connectToVNC();
            break;
            
          case 'mouse':
            // Forward mouse events to VNC
            if (vncSocket && vncSocket.writable) {
              // Send VNC pointer event
              // VNC protocol: PointerEvent message
              // This is simplified - proper VNC protocol encoding needed
              const buffer = Buffer.alloc(6);
              buffer.writeUInt8(5, 0); // Message type: PointerEvent
              buffer.writeUInt8(data.button || 0, 1);
              buffer.writeUInt16BE(data.x || 0, 2);
              buffer.writeUInt16BE(data.y || 0, 4);
              vncSocket.write(buffer);
            }
            break;
            
          case 'key':
            // Forward keyboard events to VNC
            if (vncSocket && vncSocket.writable) {
              // Send VNC key event
              // VNC protocol: KeyEvent message
              const buffer = Buffer.alloc(8);
              buffer.writeUInt8(4, 0); // Message type: KeyEvent
              buffer.writeUInt8(data.down ? 1 : 0, 1); // Down flag
              buffer.writeUInt16BE(0, 2); // Padding
              buffer.writeUInt32BE(data.keyCode || 0, 4); // Key
              vncSocket.write(buffer);
            }
            break;
            
          case 'wheel':
            // Handle mouse wheel
            if (vncSocket && vncSocket.writable) {
              // VNC doesn't have native wheel support, simulate with buttons
              // Button 4 = scroll up, Button 5 = scroll down
              const button = data.deltaY > 0 ? 5 : 4;
              const buffer = Buffer.alloc(6);
              buffer.writeUInt8(5, 0);
              buffer.writeUInt8(button, 1);
              buffer.writeUInt16BE(data.x || 0, 2);
              buffer.writeUInt16BE(data.y || 0, 4);
              vncSocket.write(buffer);
              
              // Release button immediately
              setTimeout(() => {
                const releaseBuffer = Buffer.alloc(6);
                releaseBuffer.writeUInt8(5, 0);
                releaseBuffer.writeUInt8(0, 1);
                releaseBuffer.writeUInt16BE(data.x || 0, 2);
                releaseBuffer.writeUInt16BE(data.y || 0, 4);
                if (vncSocket && vncSocket.writable) {
                  vncSocket.write(releaseBuffer);
                }
              }, 50);
            }
            break;
        }
      } catch (err) {
        console.error('Error handling WebSocket message:', err);
        ws.send(JSON.stringify({ 
          type: 'error', 
          error: 'Invalid message format' 
        }));
      }
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
      if (vncSocket) {
        vncSocket.end();
      }
    });

    ws.on('error', (err) => {
      console.error('WebSocket error:', err);
    });

    // Send initial connection status
    ws.send(JSON.stringify({ 
      type: 'status', 
      status: 'WebSocket connected, initializing VNC...' 
    }));
  });

  server.once('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> VNC Proxy WebSocket: ws://${hostname}:${port}/api/vnc/ws`);
    console.log(`> VNC Server: ${VNC_HOST}:${VNC_PORT}`);
  });
});

