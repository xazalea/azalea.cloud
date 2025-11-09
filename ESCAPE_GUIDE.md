# Escaping Single-Site Restriction - Guide

## Understanding the Problem

When using Google's proxy (like Saphire), you're accessing a **real Windows device** owned by Google, but you're restricted to viewing a single website. This guide explains how to escape that restriction and access the full Windows desktop.

## The Solution: Web-Based Desktop Environment

AzaleaCloud now includes a **Web Desktop** that runs entirely in the browser. This desktop environment provides tools to:

1. **Navigate to other URLs** (including localhost)
2. **Execute commands** via terminal
3. **Access system information**
4. **Break out of iframe restrictions**
5. **Launch local services**

## How to Use with Google Proxy

### Step 1: Deploy AzaleaCloud

1. Deploy AzaleaCloud to a public URL (Vercel, Netlify, etc.)
2. Or run locally and use ngrok to expose it

### Step 2: Access via Google Proxy

Use Google Translate's proxy feature to access AzaleaCloud:

```
https://translate.google.com/translate?sl=auto&tl=en&u=YOUR_AZALEACLOUD_URL
```

Replace `YOUR_AZALEACLOUD_URL` with your deployed AzaleaCloud URL.

### Step 3: Use the Web Desktop

Once loaded through Google's proxy:

1. **Open Terminal**: Click the Terminal icon
   - Type `help` to see available commands
   - Try `localhost` to test localhost access
   - Use `navigate <url>` to open URLs
   - Use `escape` to break out of iframe

2. **Open URL Launcher**: Click the Browser icon
   - Enter URLs like `http://localhost:3000`
   - Try `file:///C:/` to access file system
   - Use different launch methods (iframe, window, fetch)

3. **Check System Info**: Click the Settings icon
   - See device information
   - Check if running in iframe
   - View available browser capabilities

## Escape Strategies

### Strategy 1: Iframe Breakout

If Google proxy loads the site in an iframe:

1. Open Terminal
2. Type: `escape`
3. This attempts to break out of the iframe by redirecting the top window

**Note**: This may be blocked by `X-Frame-Options` header.

### Strategy 2: Localhost Access

Try accessing localhost services on Google's Windows device:

1. Open URL Launcher
2. Try common ports:
   - `http://localhost:3000`
   - `http://localhost:8080`
   - `http://localhost:5000`
   - `http://127.0.0.1:3000`

3. Or use Terminal:
   ```
   localhost
   navigate http://localhost:3000
   ```

### Strategy 3: File System Access

Attempt to access Windows file system:

1. In URL Launcher, try:
   - `file:///C:/`
   - `file:///C:/Windows`
   - `file:///C:/Users`
   - `file:///C:/Windows/System32`

2. Browser security will likely block this, but it's worth trying.

### Strategy 4: New Window Navigation

1. Open Terminal
2. Type: `navigate http://localhost:8080`
3. This attempts to open in a new window/tab
4. If popup blocker allows, you may escape the proxy context

### Strategy 5: Service Worker / Web Worker

If you can inject a service worker, you might be able to:
- Intercept requests
- Access localhost
- Bypass some restrictions

## Advanced Techniques

### Creating a Local Server

If you can execute JavaScript, you could:

1. Use WebRTC to create peer connections
2. Use WebSocket to connect to localhost services
3. Use Fetch API with `no-cors` mode (limited but may work)

### Command Execution via Terminal

The terminal attempts various methods:

- **Direct execution**: Limited by browser security
- **URL navigation**: Can navigate to localhost URLs
- **Fetch API**: Can attempt to fetch localhost resources
- **WebSocket**: Can try to connect to local WebSocket servers

### Browser Console Access

If you can access browser console (F12):

1. Open Developer Tools
2. Try executing:
   ```javascript
   window.open('http://localhost:3000', '_blank');
   window.location.href = 'http://localhost:3000';
   fetch('http://localhost:3000').then(r => console.log(r));
   ```

## Limitations

### Browser Security Restrictions

- **File System**: Direct file access is blocked
- **Cross-Origin**: CORS blocks many requests
- **Iframe Sandbox**: May be restricted by sandbox attributes
- **X-Frame-Options**: May prevent iframe breakout

### Google Proxy Restrictions

- **Single Site**: Proxy may restrict to one domain
- **Content Security Policy**: May block inline scripts
- **Network Isolation**: May prevent localhost access

## Workarounds

### 1. Use Multiple Tabs

If you can open new tabs:
- Each tab can access different URLs
- May bypass single-site restriction

### 2. Use PostMessage API

If the proxy uses iframes:
- Try communicating with parent window
- May allow navigation

### 3. Use History API

Try manipulating browser history:
```javascript
history.pushState({}, '', 'http://localhost:3000');
location.reload();
```

### 4. Use WebRTC

If WebRTC is available:
- Create data channels
- Connect to local services
- Bypass some network restrictions

## Testing Checklist

- [ ] Can access AzaleaCloud via Google proxy
- [ ] Terminal opens and responds
- [ ] Can navigate to localhost URLs
- [ ] Can break out of iframe (if applicable)
- [ ] System info shows Windows device
- [ ] URL launcher can open new windows
- [ ] Can access localhost services
- [ ] Can execute basic commands

## Troubleshooting

### Terminal Commands Not Working

- Check browser console for errors
- Some commands require server-side support
- Try alternative methods (URL launcher, etc.)

### Cannot Access Localhost

- Localhost may be blocked by proxy
- Try `127.0.0.1` instead of `localhost`
- Try different ports
- Check if services are running on Windows device

### Iframe Breakout Fails

- X-Frame-Options may be set
- Try opening in new window instead
- Use PostMessage API if available

### Popups Blocked

- Browser may block popups
- Try iframe method instead
- User may need to allow popups

## Next Steps

1. **Deploy AzaleaCloud** to a public URL
2. **Access via Google proxy** using the URL format above
3. **Use Web Desktop tools** to escape restrictions
4. **Experiment** with different escape strategies
5. **Report** what works and what doesn't

## Security Note

⚠️ **Important**: These techniques are for educational purposes and accessing systems you have permission to access. Unauthorized access to systems is illegal.

---

**Remember**: The goal is to escape the single-site restriction and access the full Windows desktop on Google's device. The Web Desktop provides multiple tools and strategies to achieve this.

