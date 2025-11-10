# Tunneling Setup Guide

AzaleaCloud supports tunneling services to expose the VNC desktop to the internet without using localhost.

## Why Tunneling?

When running in a browser, `localhost` URLs won't work because:
- The browser can't access `localhost` from a remote server
- VNC servers typically run on localhost
- We need a public URL to access the desktop

## Supported Tunneling Services

### 1. Cloudflare Tunnel (cloudflared) - Recommended

**Free and fast, no account required**

```bash
# Install cloudflared
# macOS
brew install cloudflared

# Linux
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
chmod +x cloudflared-linux-amd64
sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared

# Start tunnel
cloudflared tunnel --url http://localhost:8080
```

This will output a URL like: `https://random-subdomain.trycloudflare.com`

### 2. ngrok

**Requires free account**

```bash
# Install ngrok
# Download from https://ngrok.com/download

# Start tunnel (requires auth token)
ngrok http 8080
```

### 3. localtunnel

**Free, no account required**

```bash
# Install
npm install -g localtunnel

# Start tunnel
lt --port 8080
```

## Configuration

### Option 1: Use Current Origin (Default)

By default, AzaleaCloud uses your current origin. This works if:
- You have a reverse proxy set up
- The VNC server is accessible via your domain
- You're using a service like Vercel with API routes

### Option 2: Set Custom Tunnel URL

```typescript
import { TunnelService } from './services/tunnelService';

const tunnelService = TunnelService.getInstance();
tunnelService.setCustomUrl('https://your-tunnel-url.trycloudflare.com');
```

### Option 3: Environment Variable

Set in your environment:
```env
VNC_TUNNEL_URL=https://your-tunnel-url.trycloudflare.com
```

## Backend Integration

If you have a backend server, you can set up tunneling there:

```javascript
// backend/tunnel.js
const { spawn } = require('child_process');

function startTunnel(port) {
  const tunnel = spawn('cloudflared', ['tunnel', '--url', `http://localhost:${port}`]);
  
  tunnel.stdout.on('data', (data) => {
    const output = data.toString();
    // Extract URL from output
    const urlMatch = output.match(/https:\/\/[^\s]+\.trycloudflare\.com/);
    if (urlMatch) {
      console.log('Tunnel URL:', urlMatch[0]);
      // Store or return this URL
    }
  });
  
  return tunnel;
}
```

## Production Setup

### Using Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /vnc/ {
        proxy_pass http://localhost:8080/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

### Using Docker with Tunneling

```dockerfile
FROM node:18-alpine

# Install cloudflared
RUN wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 \
    && chmod +x cloudflared-linux-amd64 \
    && mv cloudflared-linux-amd64 /usr/local/bin/cloudflared

# Your app code...
```

## Troubleshooting

### Tunnel URL Not Working

1. **Check tunnel is running**: `ps aux | grep cloudflared`
2. **Verify port**: Make sure port 8080 is correct
3. **Check firewall**: Ensure port is accessible
4. **Test URL**: Try accessing the tunnel URL directly in browser

### Connection Reset

1. **VNC server not running**: Start Docker container
2. **Wrong port**: Verify VNC server port
3. **Tunnel expired**: Restart tunnel service

### CORS Issues

If you see CORS errors:
- Add CORS headers to your VNC server
- Or use a reverse proxy
- Or configure tunnel service to handle CORS

## Best Practices

1. **Use HTTPS**: Always use HTTPS tunnels in production
2. **Secure Tunnels**: Use authentication if possible
3. **Monitor**: Set up monitoring for tunnel health
4. **Backup**: Have multiple tunnel options ready
5. **Auto-restart**: Set up auto-restart for tunnel services

## Example: Full Setup with Cloudflare Tunnel

```bash
# 1. Start VNC container
docker run -d -p 8080:80 --name azalea-desktop dorowu/ubuntu-desktop-lxde-vnc

# 2. Start tunnel
cloudflared tunnel --url http://localhost:8080

# 3. Copy the tunnel URL (e.g., https://abc123.trycloudflare.com)

# 4. In your app, set the tunnel URL
# The app will automatically use this URL instead of localhost
```

## API Endpoints (Future)

Future versions may include API endpoints to:
- Start/stop tunnels programmatically
- Get tunnel status
- Manage multiple tunnels
- Auto-configure tunnels

