#!/bin/bash
# Build SpinUp VM Integration
# This script builds the SpinUp VM C++/Go components for integration with Azalea Cloud

set -e

echo "=== Building SpinUp VM Integration ==="

# Check if Go is installed
if ! command -v go &> /dev/null; then
    echo "Installing Go..."
    # Install Go (adjust version as needed)
    wget https://go.dev/dl/go1.21.5.linux-amd64.tar.gz
    tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz
    export PATH=$PATH:/usr/local/go/bin
fi

# Check if CMake is installed
if ! command -v cmake &> /dev/null; then
    echo "Installing CMake..."
    apt-get update && apt-get install -y cmake build-essential
fi

# Clone SpinUp VM repository (if not already cloned)
if [ ! -d "spinupavm" ]; then
    echo "Cloning SpinUp VM repository..."
    git clone https://github.com/Bas3line/spinupavm.git
fi

cd spinupavm

# Build C++ components
echo "Building C++ components..."
mkdir -p build
cd build
cmake ..
make -j$(nproc)

# Build Go components
echo "Building Go components..."
cd ..
if [ -f "go.mod" ]; then
    go build -o spinupavm-service ./src
fi

echo "=== SpinUp VM build complete ==="
echo ""
echo "Next steps:"
echo "1. Copy binaries to deployment location"
echo "2. Configure VM provisioning service"
echo "3. Set up QEMU/KVM if needed"

