#!/bin/bash

# Authenticate gcloud CLI using Metadata Server
# This script queries the Google Cloud metadata server for an access token
# and uses it to authenticate gcloud commands

set -e

METADATA_URL="http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token"

echo "Fetching access token from metadata server..."

# Query the metadata server for an access token
TOKEN_RESPONSE=$(curl -s -H "Metadata-Flavor: Google" "$METADATA_URL")

if [ $? -ne 0 ]; then
  echo "✗ Failed to fetch token from metadata server"
  echo "  Make sure you're running this on a Google Cloud VM instance or Cloud Shell"
  exit 1
fi

# Extract the access token from the JSON response
TOKEN=$(echo "$TOKEN_RESPONSE" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "✗ Failed to extract access token from response"
  echo "  Response: $TOKEN_RESPONSE"
  exit 1
fi

echo "✓ Successfully retrieved access token"
echo "  Token expires in: $(echo "$TOKEN_RESPONSE" | grep -o '"expires_in":[0-9]*' | cut -d':' -f2) seconds"

# Use the token to authenticate gcloud
echo ""
echo "Setting up gcloud authentication with access token..."

# Method 1: Export token as environment variable for use with gcloud commands
export GOOGLE_ACCESS_TOKEN="$TOKEN"

# Method 2: Create a temporary credential file for Application Default Credentials
# This creates a minimal credential JSON that gcloud can use
CREDENTIAL_FILE=$(mktemp)
cat > "$CREDENTIAL_FILE" <<EOF
{
  "type": "authorized_user",
  "client_id": "metadata-server",
  "client_secret": "metadata-server",
  "refresh_token": "$TOKEN",
  "access_token": "$TOKEN"
}
EOF

export GOOGLE_APPLICATION_CREDENTIALS="$CREDENTIAL_FILE"

echo "✓ Access token configured"
echo ""
echo "You can now use gcloud commands in one of the following ways:"
echo ""
echo "Option 1: Use --access-token-file flag with individual commands:"
echo "  echo '$TOKEN' > /tmp/token.txt"
echo "  gcloud compute instances list --access-token-file=/tmp/token.txt"
echo ""
echo "Option 2: Use GOOGLE_ACCESS_TOKEN environment variable:"
echo "  export GOOGLE_ACCESS_TOKEN='$TOKEN'"
echo "  # Note: Not all gcloud commands support this directly"
echo ""
echo "Option 3: The token is available in the TOKEN variable:"
echo "  TOKEN='$TOKEN'"
echo ""
echo "Note: This token will expire. Re-run this script to refresh."
echo "Credential file created at: $CREDENTIAL_FILE"

