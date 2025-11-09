# WebVM Integration Guide

AzaleaCloud now supports multiple provider options, including WebVM integration for browser-based virtual machines.

## Provider Options

### 1. AzaleaCloud (Default)
- **Type**: Cloud shell terminal
- **Description**: Full-featured terminal with unlimited access through automated service account management
- **Features**:
  - xterm.js terminal emulator
  - Command execution
  - Authentication key management
  - Account management

### 2. AzaleaSSHX
- **Type**: WebVM with sshx.io integration
- **Description**: Browser-based virtual machine connected to sshx.io for secure, collaborative terminal sharing
- **Features**:
  - Full Linux environment in the browser
  - sshx.io session sharing with real-time collaboration
  - End-to-end encrypted terminal sessions
  - Live presence with remote cursors and chat
  - Infinite canvas for multiple terminals
  - Ultra-fast mesh networking

**About sshx.io**:
sshx is a secure, web-based collaborative terminal that lets you share your terminal with anyone by link. It features:
- **Collaborative**: Invite people by sharing a secure, unique browser link
- **End-to-end encrypted**: Server never sees what you're typing
- **Cross-platform**: Works on macOS, Linux, and Windows
- **Infinite canvas**: Move and resize multiple terminals at once
- **Live presence**: See other people's names and cursors
- **Ultra-fast**: Connect to the nearest distributed peer in a global network

**Usage**:
1. Select "AzaleaSSHX" from the provider selector
2. **To join an existing session**:
   - Click "Join or Create Session"
   - Enter the session ID or URL (e.g., `abc123` or `https://sshx.io/abc123`)
3. **To create a new session**:
   - Install sshx CLI: `curl -sSf https://sshx.io/get | sh`
   - Run `sshx` in your terminal
   - Copy the session ID from the output
   - Paste it in AzaleaSSHX to connect WebVM to your session
4. Share the session link with others for collaborative terminal access

### 3. AzaleaLocal
- **Type**: Standalone WebVM
- **Description**: Browser-based virtual machine running entirely client-side, no external services
- **Features**:
  - Full Linux environment (Debian)
  - Runs entirely in the browser using WebAssembly
  - No server required
  - Offline-capable (after initial load)

**Usage**:
1. Select "AzaleaLocal" from the provider selector
2. The WebVM will load automatically
3. No configuration needed - it runs standalone

## WebVM Technology

AzaleaSSHX and AzaleaLocal are powered by [WebVM](https://github.com/leaningtech/webvm), which provides:

- **x86 Virtualization**: Full x86 emulation in WebAssembly
- **Linux Compatibility**: Runs unmodified Debian distributions
- **Client-Side**: Everything runs in the browser, no server needed
- **Networking**: Optional Tailscale integration for network access

## Implementation Details

### WebVM Integration

The WebVM components use iframe embedding to load the WebVM interface:

```typescript
// AzaleaLocal - Standalone
<iframe src="https://webvm.io/" />

// AzaleaSSHX - With sshx.io
<iframe src="https://webvm.io/#sshx=<sshx-url>" />
```

### Provider Selection

Users can switch between providers using the provider selector component, which appears when the Terminal tab is active. The selection is persisted in localStorage.

### Customization

To customize the WebVM configuration:

1. **For AzaleaLocal**: Modify `src/components/WebVM/WebVMLocal.tsx`
   - Change `IMAGE_URL` to use a custom disk image
   - Adjust `CMD`, `ARGS`, `ENV` for different startup behavior

2. **For AzaleaSSHX**: Modify `src/components/WebVM/WebVMSSHX.tsx`
   - Customize sshx.io connection logic
   - Add session management features

## Self-Hosting WebVM

If you want to self-host WebVM instead of using the hosted version:

1. Fork the [WebVM repository](https://github.com/leaningtech/webvm)
2. Build and deploy WebVM to your own domain
3. Update the iframe `src` URLs in the WebVM components to point to your deployment

## References

- [WebVM GitHub](https://github.com/leaningtech/webvm)
- [sshx.io Documentation](https://sshx.io)
- [WebVM.io](https://webvm.io)

