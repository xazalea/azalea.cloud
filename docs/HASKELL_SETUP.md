# Haskell Service Setup for Vercel

This document describes how the CoolVM Haskell service is set up to run on Vercel.

## Architecture

The Haskell VM runs on Vercel using a hybrid approach:

1. **Haskell Binary**: Compiled Haskell binary (`coolvm/dist/build/coolvm/coolvm`)
2. **TypeScript Wrapper**: Vercel serverless function that calls the binary
3. **Fallback**: TypeScript implementation if binary is not available

## Project Structure

```
coolvm/
├── src/
│   ├── CoolVM.hs      # Core VM implementation
│   └── Main.hs        # Entry point for Vercel
├── CoolVM.cabal       # Cabal project file
├── vercel.json        # Vercel configuration
└── package.json       # Build scripts
```

## Building

### Local Development

```bash
# Install GHC and Cabal (if not already installed)
curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh
source ~/.ghcup/env
ghcup install ghc 9.6.3
ghcup install cabal 3.10.1.0

# Build CoolVM
cd coolvm
cabal update
cabal install --dependencies-only
cabal build

# Test locally
echo '{"action":"create"}' | dist/build/coolvm/coolvm
```

### Using Build Script

```bash
npm run build:coolvm
```

## Vercel Deployment

### Automatic Build

Vercel will automatically:
1. Run `npm run build:all` (which includes `build:coolvm`)
2. Build the Haskell binary
3. Deploy the TypeScript wrapper that calls it

### Manual Build

If you need to build manually:

```bash
# Build everything
npm run build:all

# Or just CoolVM
npm run build:coolvm
```

## How It Works

### Request Flow

1. **Client** → POST `/api/coolvm` with JSON body
2. **Vercel Function** → `api/coolvm/index.ts` receives request
3. **Handler** → Tries to call Haskell binary via `handler.ts`
4. **Haskell Binary** → Processes request, returns JSON
5. **Response** → JSON response sent back to client

### Fallback Mechanism

If the Haskell binary is not available:
- The TypeScript wrapper automatically falls back to a TypeScript VM implementation
- This ensures the service always works, even if Haskell build fails
- The fallback provides the same API interface

## API Endpoints

### POST `/api/coolvm`

**Create VM:**
```json
{
  "action": "create"
}
```

**Execute Program:**
```json
{
  "action": "execute",
  "program": [
    {"type": "push", "value": 10},
    {"type": "push", "value": 20},
    {"type": "add"},
    {"type": "halt"}
  ]
}
```

### GET `/api/coolvm`

Returns VM status and features.

## Features

- **Lazy Evaluation**: Pure functional execution
- **Side-Effect-Free**: All operations are immutable
- **Type-Safe**: Strong typing prevents runtime errors
- **Error Handling**: Comprehensive error messages
- **JSON API**: Full JSON serialization support

## Troubleshooting

### Build Fails

If the Haskell build fails:
- Check that GHC and Cabal are installed
- Verify dependencies in `CoolVM.cabal`
- Check build logs for specific errors

### Binary Not Found

If the binary is not found at runtime:
- Verify build completed successfully
- Check binary path: `coolvm/dist/build/coolvm/coolvm`
- The system will automatically fall back to TypeScript

### Runtime Errors

If you get runtime errors:
- Check Vercel function logs
- Verify JSON request format
- Ensure all required fields are present

## Performance

- **Cold Start**: ~100-200ms (Haskell binary load)
- **Warm Execution**: ~10-50ms (program execution)
- **Memory**: ~50-100MB per execution

## Limitations

- Vercel serverless functions have a 30-second timeout
- Binary size: ~5-10MB (compressed)
- Memory limit: 1GB per function

## Future Improvements

1. **WebAssembly**: Compile to WASM for browser execution
2. **Caching**: Cache compiled programs
3. **Optimization**: Optimize binary size and startup time
4. **Monitoring**: Add performance monitoring

