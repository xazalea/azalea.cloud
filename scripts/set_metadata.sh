#!/bin/bash

# Set Custom Metadata Script
# This script sets custom metadata entries for long-lived access tokens

set -e

PROJECT_ID="azaleacompute"
INSTANCE_NAME="${1:-azalea-cloud-instance}"
ZONE="${2:-us-central1-a}"
TOKEN="${3}"

if [ -z "$TOKEN" ]; then
  echo "Usage: $0 <instance-name> <zone> <token>"
  echo "Or set environment variables: INSTANCE_NAME, ZONE, TOKEN"
  exit 1
fi

echo "Setting custom metadata for instance..."
echo "Instance: $INSTANCE_NAME"
echo "Zone: $ZONE"
echo "Project: $PROJECT_ID"

# Set the metadata
gcloud compute instances add-metadata "$INSTANCE_NAME" \
  --zone="$ZONE" \
  --metadata="long-lived-token=$TOKEN" \
  --project="$PROJECT_ID"

if [ $? -eq 0 ]; then
  echo "✓ Custom metadata set for instance: $INSTANCE_NAME"
  echo "  Metadata key: long-lived-token"
else
  echo "✗ Failed to set metadata"
  exit 1
fi

