# AzaleaCloud Quick Start - Google Proxy Integration

## What This Does

AzaleaCloud now integrates Google's proxy (like Saphire) to access Google's Windows device and escape the single-page restriction.

## How It Works

1. **AzaleaCloud** provides a Google Proxy generator
2. You generate a proxy URL for the **Escape Page**
3. Open that proxy URL → loads through **Google's Windows device**
4. The Escape Page automatically tries to break out of restrictions
5. Once escaped, you can access the full **Windows 10 desktop**

## Step-by-Step

### Step 1: Deploy AzaleaCloud

Deploy to any hosting service:
```bash
# Using Vercel
vercel deploy

# Or push to GitHub and connect to Vercel/Netlify
```

### Step 2: Open AzaleaCloud

1. Go to your AzaleaCloud URL (e.g., `https://azalea-cloud.vercel.app`)
2. Click the **"Google Proxy"** tab (default)

### Step 3: Generate Escape Page Proxy URL

1. Click **"Escape Page"** in the Quick Links section
   - This auto-fills: `https://your-url.com/escape`
2. Click **"Generate Proxy URL"**
3. Copy the generated Google proxy URL

### Step 4: Open via Google Proxy

1. Click **"Open in New Tab"** or copy the URL
2. The Escape Page loads through Google's Windows device
3. The page automatically attempts to escape iframe restrictions

### Step 5: Use Escape Tools

The Escape Page provides:

- **Automatic Escape**: Tries multiple methods to break out
- **URL Navigation**: Enter any URL to navigate to
- **Localhost Access**: Quick buttons for common ports
- **File System**: Attempt to access Windows file system
- **Terminal Commands**: Browser console commands
- **System Info**: View device information

### Step 6: Access Windows Desktop

Once escaped (or even if not fully escaped):

1. Use **URL Navigation** to go to `http://localhost:3000` or other localhost ports
2. Try **File System** access: `file:///C:/`
3. Use **Terminal** commands in browser console (F12)
4. Navigate to other services on the Windows device

## Example Workflow

```
1. Deploy AzaleaCloud → https://azalea-cloud.vercel.app
2. Open AzaleaCloud → Click "Google Proxy" tab
3. Click "Escape Page" quick link
4. Generate proxy URL → https://translate.google.com/translate?sl=auto&tl=en&u=https://azalea-cloud.vercel.app/escape
5. Open proxy URL → Loads through Google's Windows device
6. Escape page auto-attempts escape
7. Use tools to navigate to localhost:3000 or other services
8. Access full Windows 10 desktop!
```

## Available Pages

- **`/escape`** - Main escape page (use this with Google proxy)
- **`/desktop`** - Full web desktop environment
- **`/terminal`** - Standalone terminal interface

## Tips

1. **Start with `/escape`**: This is designed specifically for Google proxy
2. **Try localhost ports**: Common services run on 3000, 8080, 5000, etc.
3. **Use browser console**: Press F12 for advanced commands
4. **Multiple attempts**: Try different escape methods if one fails
5. **File system**: May be blocked, but worth trying

## Troubleshooting

**Proxy URL doesn't work?**
- Make sure AzaleaCloud is deployed and accessible
- Check the URL is correctly encoded
- Try opening in incognito mode

**Can't escape iframe?**
- This is normal - X-Frame-Options may block it
- Use URL navigation instead
- Try opening URLs in new tabs

**Localhost not accessible?**
- Services may not be running on Google's device
- Try different ports
- Use `127.0.0.1` instead of `localhost`

**File system blocked?**
- Browser security prevents direct file access
- Use terminal commands instead
- Try navigating to specific file URLs

## Next Steps

Once you've escaped or accessed localhost:

1. Look for running services on the Windows device
2. Try to access Windows Explorer via file:// URLs
3. Use terminal/console to execute commands
4. Navigate to system directories
5. Access the full desktop environment

---

**Remember**: The goal is to escape the single-page restriction and access the full Windows 10 desktop on Google's device. The Escape Page provides multiple tools and strategies to achieve this.

