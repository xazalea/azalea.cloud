# Haskell Azaleae for Vercel

Modernized CoolVM (Haskell Azaleae) running on Vercel via vercel-hs.

## Building

```bash
# Install dependencies
cabal install --dependencies-only

# Build
cabal build

# The binary will be at: dist/build/coolvm/coolvm
```

## Vercel Configuration

The Haskell binary is automatically called by the Vercel serverless function at `/api/coolvm`.

If the Haskell binary is not available, the system falls back to a TypeScript implementation.

## Structure

- `src/CoolVM.hs` - Core VM implementation
- `src/Main.hs` - Entry point for Vercel
- `CoolVM.cabal` - Cabal project file
- `vercel.json` - Vercel configuration

## Features

- Lazy evaluation
- Side-effect-free execution
- Type-safe operations
- JSON API support
- Error handling

