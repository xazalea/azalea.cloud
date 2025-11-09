#!/bin/bash
# Start AzaleaCloud Backend Server in WebVM

echo "Starting AzaleaCloud Backend Server..."

# Install Node.js if not available (for WebVM)
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing..."
    # In WebVM, Node.js should already be available, but this is a fallback
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - || true
    apt-get install -y nodejs || true
fi

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "Docker not found. Installing Docker..."
    # Install Docker in WebVM (if possible)
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh || echo "Docker installation may require additional setup"
fi

# Start the server
cd /home/user/backend || cd /tmp/backend
node server.js

