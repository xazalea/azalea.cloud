# AzaleaCloud Quick Start

## What is AzaleaCloud?

AzaleaCloud is a free cloud computing platform that lets you access a full Windows 10 desktop directly in your browser. Unlike web proxies that only show websites, AzaleaCloud gives you complete desktop access with keyboard and mouse control.

## Key Features

✅ **Full Desktop Access** - Complete Windows 10 environment  
✅ **Browser-Based** - No software installation needed  
✅ **Keyboard & Mouse** - Full input support  
✅ **Beautiful UI** - Modern, responsive interface  
✅ **Dark Mode** - Easy on the eyes  

## 5-Minute Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure VNC Server

You need a Windows 10 VM with VNC server running. See [SETUP.md](./SETUP.md) for detailed instructions.

Quick setup with TightVNC:
1. Download TightVNC Server: https://www.tightvnc.com/download.php
2. Install and set a password
3. Note your VM's IP address

### Step 3: Configure Environment

Create `.env.local`:
```env
VNC_SERVER_HOST=192.168.1.100  # Your Windows 10 VM IP
VNC_SERVER_PORT=5900
VNC_PASSWORD=your-vnc-password
```

### Step 4: Run

```bash
npm run dev
```

### Step 5: Connect

1. Open `http://localhost:3000`
2. Click "Connect to Desktop"
3. Wait for connection
4. Start using Windows 10!

## How It Works

```
Your Browser
    ↓
WebSocket Connection
    ↓
AzaleaCloud Server (Next.js)
    ↓
VNC Protocol
    ↓
Windows 10 VM (VNC Server)
```

## Troubleshooting

**Can't connect?**
- Check VNC server is running
- Verify IP and port in `.env.local`
- Test VNC with a desktop client first

**Keyboard/Mouse not working?**
- Click on the canvas to focus it
- Check browser console for errors
- Verify WebSocket connection is active

**Slow performance?**
- Reduce Windows 10 VM resolution
- Check network connection
- Use lower color depth in VNC settings

## Next Steps

- Read [SETUP.md](./SETUP.md) for detailed setup
- Check [ALTERNATIVE_SOLUTIONS.md](./ALTERNATIVE_SOLUTIONS.md) for other approaches
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment

## Support

- Open an issue on GitHub
- Check the troubleshooting sections in documentation
- Review VNC server logs

---

**Ready to go?** Run `npm install && npm run dev` and start accessing your Windows 10 desktop!

