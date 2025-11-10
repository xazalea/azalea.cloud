#!/bin/bash

# Initialize Cloud Service with Metadata Server Authentication
# This script sets up the cloud service to automatically use metadata server authentication
# Similar to Google Cloud Shell's automatic initialization

set -e

echo "=========================================="
echo "AzaleaCloud Service Initialization"
echo "=========================================="
echo ""

# Check if running in Google Cloud environment
METADATA_URL="http://metadata.google.internal/computeMetadata/v1/instance/"
echo "Checking for Google Cloud environment..."

if curl -s -H "Metadata-Flavor: Google" "$METADATA_URL" > /dev/null 2>&1; then
    echo "✓ Google Cloud environment detected"
    IS_CLOUD=true
else
    echo "⚠ Not running in Google Cloud environment"
    echo "  Metadata server authentication will not be available"
    IS_CLOUD=false
fi

echo ""

# Set up gcloud authentication if in cloud environment
if [ "$IS_CLOUD" = true ]; then
    echo "Setting up gcloud authentication..."
    
    # Create helper function for gcloud with token
    cat > /tmp/gcloud_with_token.sh << 'EOF'
#!/bin/bash
# Helper script to run gcloud commands with metadata server token

METADATA_URL="http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token"
TOKEN_RESPONSE=$(curl -s -H "Metadata-Flavor: Google" "$METADATA_URL")
TOKEN=$(echo "$TOKEN_RESPONSE" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "Error: Failed to fetch access token from metadata server"
    exit 1
fi

TOKEN_FILE=$(mktemp)
echo "$TOKEN" > "$TOKEN_FILE"

# Execute gcloud command with token
gcloud "$@" --access-token-file="$TOKEN_FILE"

# Clean up
rm -f "$TOKEN_FILE"
EOF

    chmod +x /tmp/gcloud_with_token.sh
    
    # Create alias for convenience
    echo 'alias gcloud-token="/tmp/gcloud_with_token.sh"' >> ~/.bashrc
    
    echo "✓ gcloud authentication helper created"
    echo "  Use 'gcloud-token' command or source /tmp/gcloud_with_token.sh"
fi

echo ""

# Set up environment variables
echo "Configuring environment..."

# Create environment setup script
cat > /tmp/cloud_env.sh << 'EOF'
#!/bin/bash
# Cloud environment configuration

export AZALEA_CLOUD_SERVICE=true
export METADATA_SERVER_URL="http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token"

# Function to get access token
get_cloud_token() {
    curl -s -H "Metadata-Flavor: Google" "$METADATA_SERVER_URL" | \
    grep -o '"access_token":"[^"]*' | cut -d'"' -f4
}

# Function to check if in cloud environment
is_cloud_env() {
    curl -s -H "Metadata-Flavor: Google" \
         "http://metadata.google.internal/computeMetadata/v1/instance/" > /dev/null 2>&1
}
EOF

chmod +x /tmp/cloud_env.sh

echo "✓ Environment configuration created"
echo "  Source /tmp/cloud_env.sh to load cloud environment functions"

echo ""

# Display instance information if in cloud
if [ "$IS_CLOUD" = true ]; then
    echo "Instance Information:"
    echo "-------------------"
    
    INSTANCE_NAME=$(curl -s -H "Metadata-Flavor: Google" \
        "http://metadata.google.internal/computeMetadata/v1/instance/name" 2>/dev/null || echo "N/A")
    ZONE=$(curl -s -H "Metadata-Flavor: Google" \
        "http://metadata.google.internal/computeMetadata/v1/instance/zone" 2>/dev/null | \
        awk -F'/' '{print $NF}' || echo "N/A")
    PROJECT_ID=$(curl -s -H "Metadata-Flavor: Google" \
        "http://metadata.google.internal/computeMetadata/v1/project/project-id" 2>/dev/null || echo "N/A")
    
    echo "  Instance: $INSTANCE_NAME"
    echo "  Zone: $ZONE"
    echo "  Project: $PROJECT_ID"
    echo ""
fi

# Test metadata server access
if [ "$IS_CLOUD" = true ]; then
    echo "Testing metadata server access..."
    TOKEN_RESPONSE=$(curl -s -H "Metadata-Flavor: Google" \
        "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token")
    
    if echo "$TOKEN_RESPONSE" | grep -q "access_token"; then
        EXPIRES_IN=$(echo "$TOKEN_RESPONSE" | grep -o '"expires_in":[0-9]*' | cut -d':' -f2)
        echo "✓ Successfully retrieved access token"
        echo "  Token expires in: $EXPIRES_IN seconds"
    else
        echo "⚠ Failed to retrieve access token"
    fi
    echo ""
fi

echo "=========================================="
echo "Initialization Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "  1. Source the environment: source /tmp/cloud_env.sh"
if [ "$IS_CLOUD" = true ]; then
    echo "  2. Use gcloud-token command for authenticated gcloud commands"
    echo "  3. Or use: ./scripts/gcloud_with_token.sh <command>"
fi
echo "  4. Check documentation: docs/METADATA_SERVER_AUTH.md"
echo ""

