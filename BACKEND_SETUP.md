# Backend Setup Guide

The AzaleaCloud backend runs in WebVM to handle Docker commands and desktop management.

## Architecture

```
Browser (Frontend)
    ↓ HTTP API calls
WebVM (Backend Server on port 3001)
    ↓ Docker commands
Docker Container (VNC Desktop on port 8080)
```

## Backend Server

The backend server (`backend/server.js`) is a Node.js HTTP server that:
- Runs inside WebVM
- Handles Docker container management
- Provides REST API endpoints for desktop operations
- Runs on port 3001

## API Endpoints

### Health Check
```
GET /api/health
```
Returns: `{ status: 'ok', timestamp: 1234567890 }`

### Start Desktop
```
POST /api/desktop/start
```
Returns: `{ success: true, containerId: "...", port: 8080, vncUrl: "http://localhost:8080/vnc.html" }`

### Stop Desktop
```
POST /api/desktop/stop
Body: { containerId: "..." }
```
Returns: `{ success: true }`

## Initialization

The backend can be initialized in two ways:

### 1. Automatic (Recommended)
When AzaleaCloud provider is selected, the terminal will show initialization instructions.

### 2. Manual
Run the initialization script in the WebVM terminal:

```bash
cd /home/user/backend
node server.js &
```

## Docker Requirements

The backend requires Docker to be available in WebVM. The Docker image used is:
- `dorowu/ubuntu-desktop-lxde-vnc` - Ubuntu desktop with VNC

## Network Access

The backend server listens on `0.0.0.0:3001` to be accessible from the browser.
The VNC desktop is accessible on `localhost:8080/vnc.html`.

## Troubleshooting

1. **Backend not responding**
   - Check if Node.js is installed: `node --version`
   - Check if server is running: `ps aux | grep node`
   - Check logs: `cat /tmp/backend.log`

2. **Docker not available**
   - Docker may need to be installed in WebVM
   - Check: `docker --version`

3. **Port conflicts**
   - Backend uses port 3001
   - VNC desktop uses port 8080
   - Make sure these ports are available

