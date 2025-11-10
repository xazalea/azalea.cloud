#!/bin/bash

# Execute gcloud commands using a token from the metadata server
# Usage: ./gcloud_with_token.sh <gcloud-command-with-args>

set -e

if [ $# -eq 0 ]; then
  echo "Usage: $0 <gcloud-command-with-args>"
  echo "Example: $0 compute instances list"
  exit 1
fi

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
  exit 1
fi

# Create a temporary file with the token
TOKEN_FILE=$(mktemp)
echo "$TOKEN" > "$TOKEN_FILE"

# Execute gcloud command with the token
echo "Executing: gcloud $*"
echo ""

gcloud "$@" --access-token-file="$TOKEN_FILE"

# Clean up
rm -f "$TOKEN_FILE"

