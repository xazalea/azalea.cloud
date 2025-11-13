#!/bin/bash
# Build Haskell Azaleae for Vercel
# This script builds the Haskell VM binary for deployment

set +e  # Don't exit on error - we'll handle failures gracefully

echo "=== Building Haskell Azaleae for Vercel ==="

# Install system dependencies required for Haskell
echo "Installing system dependencies (GMP, etc.)..."
if command -v yum &> /dev/null; then
    # RHEL/CentOS/Rocky Linux
    yum install -y gmp-devel gcc g++ make ncurses-devel xz-utils pkg-config 2>/dev/null || true
elif command -v apt-get &> /dev/null; then
    # Debian/Ubuntu
    apt-get update -qq && apt-get install -y libgmp-dev gcc g++ make libncurses-dev xz-utils pkg-config 2>/dev/null || true
elif command -v apk &> /dev/null; then
    # Alpine Linux
    apk add --no-cache gmp-dev gcc g++ make ncurses-dev xz pkgconfig 2>/dev/null || true
else
    echo "Warning: Could not detect package manager. GMP may not be available."
fi

# Check if cabal is installed
if ! command -v cabal &> /dev/null; then
    echo "Installing Cabal..."
    # Install GHC and Cabal (non-interactive)
    BOOTSTRAP_HASKELL_NONINTERACTIVE=1 BOOTSTRAP_HASKELL_GHC_VERSION=9.6.3 BOOTSTRAP_HASKELL_CABAL_VERSION=3.10.1.0 \
        curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | BOOTSTRAP_HASKELL_NONINTERACTIVE=1 sh || {
        echo "Warning: Failed to install GHC/Cabal. Skipping Haskell build."
        exit 0
    }
    source ~/.ghcup/env 2>/dev/null || source /vercel/.ghcup/env 2>/dev/null || true
    ghcup install ghc 9.6.3 --set 2>/dev/null || true
    ghcup install cabal 3.10.1.0 --set 2>/dev/null || true
fi

# Verify cabal is available
if ! command -v cabal &> /dev/null; then
    echo "Warning: Cabal not found after installation. Skipping Haskell build."
    exit 0
fi

cd haskell-azaleae || {
    echo "Warning: haskell-azaleae directory not found. Skipping Haskell build."
    exit 0
}

echo "Installing dependencies..."
cabal update 2>&1 | head -20 || {
    echo "Warning: Failed to update Cabal. Skipping Haskell build."
    exit 0
}

echo "Building Haskell Azaleae..."
cabal build 2>&1 || {
    echo "Warning: Haskell build failed. The TypeScript fallback will be used."
    echo "This is expected if GMP or other system libraries are not available."
    exit 0
}

echo "=== Haskell Azaleae build complete ==="
echo ""
echo "Binary location: dist/build/coolvm/coolvm"
echo ""
echo "To test locally:"
echo "  echo '{\"action\":\"create\"}' | dist/build/coolvm/coolvm"

