#!/bin/bash
# Build Haskell Azaleae for Vercel
# This script builds the Haskell VM binary for deployment

set -e

echo "=== Building Haskell Azaleae for Vercel ==="

# Check if cabal is installed
if ! command -v cabal &> /dev/null; then
    echo "Installing Cabal..."
    # Install GHC and Cabal
    curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh
    source ~/.ghcup/env
    ghcup install ghc 9.6.3
    ghcup install cabal 3.10.1.0
    ghcup set ghc 9.6.3
    ghcup set cabal 3.10.1.0
fi

cd haskell-azaleae

echo "Installing dependencies..."
cabal update
cabal install --dependencies-only

echo "Building Haskell Azaleae..."
cabal build

echo "=== Haskell Azaleae build complete ==="
echo ""
echo "Binary location: dist/build/coolvm/coolvm"
echo ""
echo "To test locally:"
echo "  echo '{\"action\":\"create\"}' | dist/build/coolvm/coolvm"

