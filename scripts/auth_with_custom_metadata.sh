#!/bin/bash

# Authenticate gcloud CLI using Custom Metadata Token
# This script retrieves a long-lived token from instance custom metadata
# and uses it to authenticate gcloud commands

set -e

METADATA_KEY="${1:-long-lived-token}"
METADATA_URL="http://metadata.google.internal/computeMetadata/v1/instance/attributes/$METADATA_KEY"

echo "Fetching custom metadata token..."
echo "  Metadata key: $METADATA_KEY"

# Query the metadata server for custom metadata
TOKEN=$(curl -s -H "Metadata-Flavor: Google" "$METADATA_URL")

if [ $? -ne 0 ] || [ -z "$TOKEN" ]; then
  echo "✗ Failed to fetch token from custom metadata"
  echo "  Make sure:"
  echo "    1. You're running this on a Google Cloud VM instance"
  echo "    2. Custom metadata '$METADATA_KEY' is set on the instance"
  echo "    3. The metadata was set using:"
  echo "       gcloud compute instances add-metadata INSTANCE_NAME \\"
  echo "         --metadata $METADATA_KEY=YOUR_TOKEN"
  exit 1
fi

echo "✓ Successfully retrieved custom metadata token"

# Use the token to authenticate gcloud
echo ""
echo "Setting up gcloud authentication with custom metadata token..."

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
echo "This token was retrieved from instance custom metadata."
echo "Credential file created at: $CREDENTIAL_FILE"

