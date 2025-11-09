# AzaleaCloud Deployment Guide

## Quick Start

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment**:
```bash
cp env.example .env.local
# Edit .env.local with your VNC server details
```

3. **Run development server**:
```bash
npm run dev
```

4. **Open browser**:
Navigate to `http://localhost:3000`

## Production Deployment

### Option 1: Self-Hosted Server (Recommended)

**Best for**: Full control, custom WebSocket support

#### Using Railway

1. Push code to GitHub
2. Connect Railway to your repository
3. Add environment variables:
   - `VNC_SERVER_HOST`
   - `VNC_SERVER_PORT`
   - `VNC_PASSWORD`
   - `NODE_ENV=production`
4. Deploy!

#### Using DigitalOcean App Platform

1. Connect GitHub repository
2. Select Node.js buildpack
3. Set start command: `npm start`
4. Add environment variables
5. Deploy

#### Using AWS EC2

1. Launch EC2 instance (Ubuntu recommended)
2. Install Node.js 18+
3. Clone repository
4. Install dependencies: `npm install`
5. Build: `npm run build`
6. Use PM2 to run: `pm2 start server.js`
7. Configure nginx as reverse proxy
8. Set up SSL with Let's Encrypt

### Option 2: Vercel (Frontend Only)

**Note**: Vercel doesn't support custom servers with WebSocket. You'll need:

1. Deploy frontend to Vercel
2. Deploy WebSocket server separately (Railway, etc.)
3. Update `NEXT_PUBLIC_WS_URL` to point to your WebSocket server

### Option 3: Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t azalea-cloud .
docker run -p 3000:3000 \
  -e VNC_SERVER_HOST=your-vnc-host \
  -e VNC_SERVER_PORT=5900 \
  -e VNC_PASSWORD=your-password \
  azalea-cloud
```

## Environment Variables

### Required
- `VNC_SERVER_HOST`: IP or hostname of Windows 10 VM
- `VNC_SERVER_PORT`: VNC server port (usually 5900)
- `VNC_PASSWORD`: VNC server password

### Optional
- `NEXT_PUBLIC_APP_URL`: Your app URL (for production)
- `NEXT_PUBLIC_WS_URL`: WebSocket URL (auto-detected if not set)
- `NODE_ENV`: `production` or `development`
- `PORT`: Server port (default: 3000)

## Security Checklist

- [ ] Use strong VNC passwords
- [ ] Enable HTTPS/WSS in production
- [ ] Use VPN for VNC server access (don't expose directly)
- [ ] Implement rate limiting
- [ ] Add user authentication
- [ ] Use environment variables (never commit secrets)
- [ ] Enable firewall rules
- [ ] Regular security updates

## Troubleshooting

### WebSocket Connection Fails

- Check firewall allows WebSocket connections
- Verify `NEXT_PUBLIC_WS_URL` is correct
- Ensure custom server is running (not `next dev`)

### VNC Connection Fails

- Verify VNC server is running
- Check `VNC_SERVER_HOST` and `VNC_SERVER_PORT`
- Test VNC connection with desktop client first
- Check firewall rules

### Build Errors

- Ensure Node.js 18+ is installed
- Clear `.next` folder and rebuild
- Check all dependencies are installed

## Monitoring

### Recommended Tools

- **PM2**: Process manager for Node.js
- **Sentry**: Error tracking
- **LogRocket**: Session replay and logging
- **Uptime Robot**: Uptime monitoring

### Health Check Endpoint

Add to your API routes:
```typescript
// src/app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok', timestamp: Date.now() });
}
```

## Scaling

For multiple users:

1. **Load Balancing**: Use nginx or cloud load balancer
2. **Session Management**: Implement Redis for session storage
3. **Connection Pooling**: Manage multiple VNC connections
4. **VM Pool**: Multiple Windows 10 VMs with load distribution

## Backup

Regular backups of:
- Environment variables
- Configuration files
- Database (if added)
- VNC server configurations

---

For more details, see [SETUP.md](./SETUP.md)

