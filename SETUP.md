# AzaleaCloud Setup Guide

## Overview

AzaleaCloud provides browser-based access to a Windows 10 desktop using VNC (Virtual Network Computing). This guide will help you set up both the frontend application and the backend VNC server.

## Architecture

```
Browser (AzaleaCloud UI) 
    ↓ WebSocket
Next.js Server (WebSocket Proxy)
    ↓ TCP Socket
VNC Server (Windows 10 VM)
```

## Prerequisites

1. **Windows 10 Virtual Machine** with:
   - VNC Server installed and running
   - Network access from your Next.js server
   - Static IP address or hostname

2. **Node.js 18+** installed on your server

3. **VNC Server Software** (choose one):
   - **TightVNC** (Free, recommended): https://www.tightvnc.com/
   - **RealVNC** (Free for personal use): https://www.realvnc.com/
   - **UltraVNC** (Free): https://www.uvnc.com/

## Step 1: Install VNC Server on Windows 10

### Using TightVNC (Recommended)

1. Download TightVNC Server from https://www.tightvnc.com/download.php
2. Install TightVNC Server on your Windows 10 VM
3. During installation, set a password for VNC access
4. Configure TightVNC Server:
   - Open "TightVNC Server: Current User Properties"
   - Set port (default: 5900)
   - Configure firewall rules
   - Enable "Accept connections"
5. Note your VM's IP address or hostname

### Using RealVNC

1. Download RealVNC Server from https://www.realvnc.com/download/
2. Install and create a free account
3. Configure the server with a password
4. Note the connection details

## Step 2: Configure AzaleaCloud

1. Clone and install dependencies:
```bash
cd azalea-cloud
npm install
```

2. Create `.env.local` file:
```env
# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# WebSocket URL (auto-detected, but can override)
NEXT_PUBLIC_WS_URL=ws://localhost:3000/api/vnc/ws

# VNC Server Configuration
VNC_SERVER_HOST=192.168.1.100  # Your Windows 10 VM IP
VNC_SERVER_PORT=5900           # VNC server port
VNC_PASSWORD=your-vnc-password # VNC server password

# Node Environment
NODE_ENV=development
```

3. Update `server.js` if needed:
   - The server automatically connects to the VNC server specified in environment variables
   - VNC password authentication is handled in the connection process

## Step 3: Run AzaleaCloud

1. Start the development server:
```bash
npm run dev
```

2. Open your browser to `http://localhost:3000`

3. Click "Connect to Desktop" to establish a connection

## Step 4: Production Deployment

### Option 1: Vercel (with Custom Server)

Vercel doesn't support custom servers directly. You have two options:

**A. Use Vercel Serverless Functions + External WebSocket Server**
- Deploy Next.js frontend to Vercel
- Deploy WebSocket server separately (Railway, DigitalOcean, etc.)
- Update `NEXT_PUBLIC_WS_URL` to point to your WebSocket server

**B. Use Vercel + WebSocket Proxy Service**
- Use a service like Pusher, Ably, or Socket.io Cloud
- Modify the code to use their WebSocket service

### Option 2: Self-Hosted (Recommended for Full Control)

1. Build the application:
```bash
npm run build
```

2. Deploy to a server that supports Node.js:
   - **Railway**: https://railway.app
   - **DigitalOcean App Platform**: https://www.digitalocean.com/products/app-platform
   - **AWS EC2**: https://aws.amazon.com/ec2/
   - **Google Cloud Run**: https://cloud.google.com/run

3. Set environment variables on your hosting platform

4. Ensure your server can reach the VNC server (same network or VPN)

## Network Configuration

### Local Network Setup

If your VNC server is on the same local network:
- Use the local IP address (e.g., `192.168.1.100`)
- Ensure firewall allows connections on port 5900

### Remote Network Setup

If your VNC server is remote:
- Use a VPN to connect both servers
- Or use port forwarding/SSH tunneling
- Or use a cloud VNC service

### Firewall Rules

**Windows Firewall:**
1. Open Windows Defender Firewall
2. Add inbound rule for port 5900 (TCP)
3. Allow connections from your Next.js server IP

**Router/Network:**
- Port forward 5900 to your Windows 10 VM (if accessing remotely)
- Or use VPN for secure access

## Security Considerations

1. **Use Strong VNC Passwords**: Always use strong, unique passwords
2. **Enable TLS/SSL**: For production, use `wss://` (WebSocket Secure)
3. **VPN Recommended**: Use VPN for remote access instead of exposing VNC directly
4. **Rate Limiting**: Implement rate limiting on WebSocket connections
5. **Authentication**: Add user authentication to AzaleaCloud frontend

## Troubleshooting

### Connection Issues

**Problem**: "Failed to connect to desktop"
- Check VNC server is running on Windows 10 VM
- Verify `VNC_SERVER_HOST` and `VNC_SERVER_PORT` are correct
- Check firewall rules allow connections
- Test VNC connection with a desktop VNC client first

**Problem**: "WebSocket connection failed"
- Ensure custom server (`server.js`) is running
- Check WebSocket path is `/api/vnc/ws`
- Verify no proxy is blocking WebSocket connections

**Problem**: "VNC authentication failed"
- Verify `VNC_PASSWORD` is correct
- Check VNC server password requirements
- Some VNC servers require username + password

### Performance Issues

**Problem**: Slow or laggy desktop
- Reduce desktop resolution on Windows 10 VM
- Use lower color depth in VNC server settings
- Ensure good network connection between servers
- Consider using a VNC server with compression

### Keyboard/Mouse Not Working

**Problem**: Input events not registering
- Check WebSocket messages are being sent (browser console)
- Verify VNC protocol encoding in `server.js`
- Test with a desktop VNC client to isolate issues

## Advanced Configuration

### Multiple VMs

To support multiple Windows 10 VMs:

1. Modify `server.js` to handle multiple connections
2. Add session management
3. Create a VM selection UI
4. Store connection details in a database

### Custom VNC Protocol

For better performance, implement full VNC protocol:
- Use a library like `node-vnc` or `@novnc/novnc`
- Implement proper RFB protocol encoding/decoding
- Add compression support

## Alternative Solutions

If VNC doesn't meet your needs, consider:

1. **RDP (Remote Desktop Protocol)**: More efficient for Windows
   - Use `node-rdp` or similar library
   - Better performance than VNC

2. **Apache Guacamole**: Open-source remote desktop gateway
   - Supports RDP, VNC, SSH
   - Web-based client included

3. **Kasm Workspaces**: Container-based desktop streaming
   - More modern approach
   - Better isolation and security

## Support

For issues or questions:
- Open an issue on GitHub
- Check the troubleshooting section above
- Review VNC server documentation

---

**Note**: This setup provides a foundation for browser-based desktop access. For production use, consider additional security measures, authentication, and performance optimizations.

