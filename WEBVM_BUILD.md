# Building WebVM Locally

AzaleaCloud includes WebVM as a git submodule. To build and use WebVM locally instead of the hosted version:

## Initial Setup

1. **Initialize and update submodules**:
   ```bash
   git submodule update --init --recursive
   ```

2. **Navigate to WebVM directory**:
   ```bash
   cd webvm
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

## Building WebVM

1. **Build WebVM**:
   ```bash
   npm run build
   ```

   This will create a `build` directory with the compiled WebVM application.

2. **Serve the build directory**:
   ```bash
   # Using a simple HTTP server
   npx serve build
   
   # Or using Python
   python3 -m http.server 8080 --directory build
   
   # Or using Node.js http-server
   npx http-server build -p 8080
   ```

## Using Local WebVM in AzaleaCloud

After building and serving WebVM locally:

1. **Update WebVM components** to point to your local server:
   - Edit `src/components/WebVM/WebVMLocal.tsx`
   - Change the iframe `src` from `https://webvm.io/` to `http://localhost:8080/`
   - Edit `src/components/WebVM/WebVMSSHX.tsx` similarly

2. **Or configure via environment variable**:
   ```typescript
   const WEBVM_URL = import.meta.env.VITE_WEBVM_URL || 'https://webvm.io/';
   ```

## Customizing WebVM

### Custom Disk Images

1. **Build your own disk image** using the Dockerfiles in `webvm/dockerfiles/`:
   ```bash
   cd webvm
   # Modify dockerfiles/debian_mini or create your own
   ```

2. **Upload to a CDN or hosting service** and update the `IMAGE_URL` in the WebVM config.

### Configuration Files

WebVM uses configuration files in the `webvm/` directory:
- `config_public_terminal.js` - Public terminal configuration
- `config_public_alpine.js` - Alpine Linux configuration
- `config_github_terminal.js` - GitHub terminal configuration

You can create custom configs and reference them in the WebVM components.

## Integration with AzaleaCloud

The WebVM submodule is integrated via:
- `src/lib/webvm-integration.ts` - Helper utilities for WebVM configuration
- `src/components/WebVM/WebVMLocal.tsx` - Standalone WebVM component
- `src/components/WebVM/WebVMSSHX.tsx` - WebVM with sshx.io integration

## Notes

- The WebVM submodule is tracked separately from the main repository
- When cloning AzaleaCloud, remember to run `git submodule update --init --recursive`
- WebVM builds are large - consider using the hosted version for development
- For production, you may want to build WebVM and serve it from your own CDN

## Troubleshooting

**Submodule not found**:
```bash
git submodule update --init --recursive
```

**Build fails**:
- Ensure Node.js 18+ is installed
- Check that all dependencies are installed: `npm install` in the webvm directory
- Verify you have write permissions in the webvm directory

**WebVM not loading**:
- Check browser console for errors
- Verify the WebVM build was successful
- Ensure the server is running and accessible
- Check CORS settings if serving from a different origin

