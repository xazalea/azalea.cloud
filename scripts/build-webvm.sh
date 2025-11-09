#!/bin/bash
# Build WebVM submodule

echo "Building WebVM submodule..."

cd webvm

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing WebVM dependencies..."
    npm install
fi

echo "Building WebVM..."
npm run build

echo "WebVM build complete!"
echo "Build output: webvm/build/"

# Copy to public directory for Vite to serve
cd ..
if [ -d "webvm/build" ]; then
    echo "Copying WebVM build to public directory..."
    mkdir -p public/webvm
    cp -r webvm/build/* public/webvm/
    echo "WebVM ready at /webvm/"
fi

