# AzaleaCloud

A beautiful, free cloud computing platform that allows you to access a full Windows 10 desktop directly in your browser. No downloads, no installations - just pure cloud computing power.

## Features

🚀 **Full Desktop Access**: Access complete Windows 10 desktop environment  
🖥️ **Browser-Based**: No software installation required  
⌨️ **Keyboard & Mouse**: Full keyboard and mouse emulation  
🌐 **VNC Integration**: Powered by noVNC for seamless remote desktop  
🪟 **Web Desktop**: Escape single-site restrictions with web-based desktop environment  
🔧 **Terminal Access**: Execute commands and navigate URLs  
🌍 **Google Proxy Support**: Works with Google's proxy service (like Saphire)  
🎨 **Beautiful UI**: Modern, responsive interface with dark mode  
🔒 **Secure**: Encrypted connections for your sessions  
📱 **Responsive**: Works on desktop, tablet, and mobile devices  

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Library**: HeroUI (formerly NextUI)
- **Styling**: Tailwind CSS v4
- **Remote Desktop**: noVNC (VNC client in browser)
- **Backend**: Next.js API Routes with WebSocket support
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- A Windows 10 VM with VNC server running (for backend connection)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd azalea-cloud
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
VNC_SERVER_HOST=your-vnc-server-host
VNC_SERVER_PORT=5900
VNC_PASSWORD=your-vnc-password
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Web Desktop (Google Proxy Escape) 🆕

**Escape single-site restrictions when using Google's proxy!**

1. Deploy AzaleaCloud to a public URL (Vercel, Netlify, etc.)
2. Access via Google proxy:
   ```
   https://translate.google.com/translate?sl=auto&tl=en&u=YOUR_AZALEACLOUD_URL
   ```
3. Use the Web Desktop to:
   - Navigate to localhost URLs
   - Execute commands via terminal
   - Access system information
   - Break out of iframe restrictions
   - Launch local services

See [GOOGLE_PROXY_GUIDE.md](./GOOGLE_PROXY_GUIDE.md) for detailed instructions.

### VNC Desktop Access

1. Navigate to the "VNC (Direct)" tab
2. Click "Connect to Desktop" to start a new session
3. Wait for the connection to establish
4. Use your mouse and keyboard to interact with the Windows 10 desktop
5. All interactions are sent in real-time to the remote desktop

## Architecture

### Frontend
- React components for UI
- noVNC client for desktop rendering
- WebSocket connection for real-time communication
- Keyboard and mouse event handling

### Backend
- Next.js API routes for session management
- WebSocket proxy for VNC connections
- Connection pooling and management
- Security and authentication

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Configuration

### VNC Server Setup

To use AzaleaCloud, you need a Windows 10 VM with a VNC server running. Popular options:

- **TightVNC**: Free, open-source VNC server
- **RealVNC**: Commercial with free tier
- **UltraVNC**: Free Windows VNC server

### Environment Variables

```env
NEXT_PUBLIC_APP_URL=your-app-url
VNC_SERVER_HOST=vnc-server-hostname-or-ip
VNC_SERVER_PORT=5900
VNC_PASSWORD=your-vnc-password
NODE_ENV=production
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub.

---

Built with ❤️ using Next.js and HeroUI

**AzaleaCloud** - Free Cloud Computing, Accessible to Everyone.

