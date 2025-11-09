# Using AzaleaCloud with Google Proxy

## Overview

AzaleaCloud now includes a **Web Desktop Environment** designed to work with Google's proxy service (like Saphire). This allows you to escape the single-website restriction and access the full Windows desktop on Google's device.

## Quick Start

### 1. Deploy AzaleaCloud

Deploy to any hosting service:
- **Vercel** (recommended): `vercel deploy`
- **Netlify**: Connect GitHub repo
- **Railway**: Deploy from GitHub
- **Local + ngrok**: For testing

### 2. Access via Google Proxy

Use Google Translate's proxy feature:

```
https://translate.google.com/translate?sl=auto&tl=en&u=YOUR_AZALEACLOUD_URL
```

Example:
```
https://translate.google.com/translate?sl=auto&tl=en&u=https://azalea-cloud.vercel.app
```

### 3. Use Web Desktop

Once loaded, you'll see the Web Desktop with:
- **Terminal**: Execute commands, navigate URLs
- **File Browser**: Attempt file system access
- **URL Launcher**: Launch localhost URLs, break restrictions
- **System Info**: View device information

## Features

### Terminal Window

The terminal provides commands to:
- Navigate to URLs: `navigate http://localhost:3000`
- Access localhost: `localhost` (tests common ports)
- Escape iframe: `escape` (breaks out of iframe if possible)
- Execute commands: `exec <command>` (via API if available)
- System info: `system` (shows device details)

### URL Launcher

Launch URLs in different ways:
- **Iframe**: Load in current page
- **New Window**: Open in new tab/window
- **Fetch**: Attempt to fetch content

Try these URLs:
- `http://localhost:3000`
- `http://localhost:8080`
- `file:///C:/`
- `http://127.0.0.1:3000`

### System Info

View:
- Device information
- Browser capabilities
- Network status
- Iframe detection
- Available APIs

## Escape Strategies

### Strategy 1: Localhost Access

Google's Windows device may have services running on localhost:

1. Open URL Launcher
2. Try: `http://localhost:3000`, `http://localhost:8080`, etc.
3. Or use Terminal: `navigate http://localhost:3000`

### Strategy 2: Iframe Breakout

If loaded in iframe:

1. Open Terminal
2. Type: `escape`
3. Attempts to redirect top window

### Strategy 3: New Window Navigation

1. Terminal: `navigate http://localhost:3000`
2. Or URL Launcher: Select "New Window" method
3. May bypass single-site restriction

### Strategy 4: File System Access

Try accessing Windows file system:
- `file:///C:/`
- `file:///C:/Windows`
- `file:///C:/Users`

**Note**: Browser security will likely block this, but worth trying.

## How It Works

### Architecture

```
Google Proxy (Windows Device)
    ↓
AzaleaCloud Web Desktop (Browser)
    ↓
Terminal / URL Launcher / System Tools
    ↓
Attempt to access localhost / file system / escape restrictions
```

### Browser-Based Execution

All tools run in the browser using:
- JavaScript APIs
- Fetch API (with no-cors mode)
- Window navigation
- Iframe manipulation
- PostMessage API

### Limitations

- **Browser Security**: Many operations are blocked
- **CORS**: Cross-origin requests are restricted
- **File System**: Direct file access is not possible
- **Iframe Sandbox**: May be restricted by sandbox attributes

## Advanced Usage

### Custom Commands

Add custom commands in Terminal by modifying `TerminalWindow.tsx`:

```typescript
case 'mycommand':
  // Your custom logic
  break;
```

### API Integration

The `/api/execute` endpoint allows server-side command execution:

```bash
curl -X POST https://your-azalea-cloud.com/api/execute \
  -H "Content-Type: application/json" \
  -d '{"command": "whoami"}'
```

**Warning**: This executes on the AzaleaCloud server, not the Windows device.

### WebSocket Connections

You can add WebSocket support to connect to localhost services:

```typescript
const ws = new WebSocket('ws://localhost:8080');
```

## Troubleshooting

### Cannot Access Localhost

- Try `127.0.0.1` instead of `localhost`
- Try different ports
- Check if services are running on Windows device
- May be blocked by proxy

### Iframe Breakout Fails

- X-Frame-Options may be set
- Try opening in new window instead
- Use PostMessage API if available

### Terminal Commands Not Working

- Check browser console for errors
- Some commands require server-side support
- Try alternative methods (URL launcher)

### Popups Blocked

- Browser may block popups
- Try iframe method instead
- User may need to allow popups

## Security Considerations

⚠️ **Important Notes**:

1. **Command Execution API**: The `/api/execute` endpoint is dangerous
   - Restrict in production
   - Add authentication
   - Whitelist allowed commands

2. **XSS Protection**: All user input should be sanitized
   - Terminal commands are executed carefully
   - URL inputs are validated

3. **CORS**: Many requests will be blocked by CORS
   - This is expected browser behavior
   - Some operations may not work

## Example Workflow

1. **Deploy AzaleaCloud** to Vercel
2. **Access via Google proxy**:
   ```
   https://translate.google.com/translate?sl=auto&tl=en&u=https://azalea-cloud.vercel.app
   ```
3. **Open Terminal** from desktop icons
4. **Try localhost access**:
   ```
   navigate http://localhost:3000
   ```
5. **Check system info** to see device details
6. **Use URL launcher** to try different URLs
7. **Attempt iframe escape** if needed

## Next Steps

1. Experiment with different escape strategies
2. Try accessing various localhost ports
3. Test file system access attempts
4. Document what works and what doesn't
5. Share findings with the community

## Support

For issues or questions:
- Check `ESCAPE_GUIDE.md` for detailed escape strategies
- Review browser console for errors
- Test in different browsers
- Try different Google proxy URLs

---

**Remember**: The goal is to escape the single-site restriction and access the full Windows desktop on Google's device. The Web Desktop provides multiple tools to achieve this.

