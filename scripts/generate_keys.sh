#!/bin/bash

# Generate Service Account Keys Script
# This script generates new service account keys and distributes them

set -e

PROJECT_ID="azaleacompute"
SERVICE_ACCOUNT_EMAIL="azalea@azaleacompute.iam.gserviceaccount.com"
KEY_DIR="./keys"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
KEY_FILE="${KEY_DIR}/service-account-key-${TIMESTAMP}.json"

# Create keys directory if it doesn't exist
mkdir -p "$KEY_DIR"

echo "Generating new service account key..."
echo "Service Account: $SERVICE_ACCOUNT_EMAIL"
echo "Project: $PROJECT_ID"

# Generate the key
gcloud iam service-accounts keys create "$KEY_FILE" \
  --iam-account="$SERVICE_ACCOUNT_EMAIL" \
  --project="$PROJECT_ID"

if [ $? -eq 0 ]; then
  echo "✓ New service account key generated: $KEY_FILE"
  
  # Upload to Firebase or distribute as needed
  echo "Key file location: $KEY_FILE"
  echo "Key ID: $(jq -r '.private_key_id' "$KEY_FILE")"
  
  # Optional: Upload to secure storage
  # gsutil cp "$KEY_FILE" gs://azalea-compute-keys/
else
  echo "✗ Failed to generate service account key"
  exit 1
fi

