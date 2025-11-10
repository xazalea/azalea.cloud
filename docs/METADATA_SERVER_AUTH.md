# Metadata Server Authentication Guide

This guide explains how to use Google Cloud's metadata server to authenticate gcloud CLI and other Google Cloud services without traditional authentication methods.

## Overview

When running the gcloud CLI inside a Google Cloud environment (VM instance or Cloud Shell), the application can automatically find credentials and authenticate as a service account by querying the metadata server for an access token. This method allows you to bypass traditional authentication methods by leveraging the metadata server to obtain long-lived access tokens.

## Prerequisites

- A Google Cloud VM instance or Cloud Shell environment
- gcloud CLI installed
- Appropriate IAM permissions for the service account attached to the instance

## Method 1: Using Default Service Account Token

This method retrieves an access token from the metadata server using the default service account attached to the instance.

### Step 1: Fetch Token from Metadata Server

Query the metadata server for an access token:

```bash
TOKEN=$(curl -H "Metadata-Flavor: Google" \
  http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token | \
  grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
```

Or use the provided script:

```bash
./scripts/auth_with_metadata.sh
```

### Step 2: Use Token with gcloud CLI

Use the token with gcloud commands. Since `gcloud auth application-default login` doesn't directly accept access tokens, use one of these methods:

**Method A: Use --access-token-file flag (Recommended):**

```bash
echo $TOKEN > /tmp/token.txt
gcloud compute instances list --access-token-file=/tmp/token.txt
```

**Method B: Use the helper script:**

```bash
./scripts/gcloud_with_token.sh compute instances list
```

**Method C: Source the authentication script:**

```bash
source ./scripts/auth_with_metadata.sh
# Then use gcloud commands with the exported TOKEN variable
```

## Method 2: Using Custom Metadata Tokens

This method uses long-lived access tokens stored as custom metadata on the instance.

### Step 1: Set Custom Metadata

Create custom metadata entries that provide long-lived access tokens. This can be done through the Google Cloud Console or using the gcloud command-line tool:

```bash
gcloud compute instances add-metadata INSTANCE_NAME \
  --zone=ZONE \
  --metadata long-lived-token=YOUR_LONG_LIVED_ACCESS_TOKEN \
  --project=PROJECT_ID
```

Or use the provided script:

```bash
./scripts/set_metadata.sh INSTANCE_NAME ZONE TOKEN
```

### Step 2: Retrieve and Use Custom Metadata Token

Query the custom metadata and use it for authentication:

```bash
TOKEN=$(curl -H "Metadata-Flavor: Google" \
  http://metadata.google.internal/computeMetadata/v1/instance/attributes/long-lived-token)

# Use with gcloud commands
echo $TOKEN > /tmp/token.txt
gcloud compute instances list --access-token-file=/tmp/token.txt
```

Or use the provided script:

```bash
./scripts/auth_with_custom_metadata.sh [metadata-key]
```

## Available Scripts

### `scripts/auth_with_metadata.sh`

Fetches an access token from the metadata server using the default service account and authenticates gcloud CLI.

**Usage:**
```bash
./scripts/auth_with_metadata.sh
```

### `scripts/auth_with_custom_metadata.sh`

Retrieves a long-lived token from instance custom metadata and authenticates gcloud CLI.

**Usage:**
```bash
./scripts/auth_with_custom_metadata.sh [metadata-key]
```

**Arguments:**
- `metadata-key` (optional): The custom metadata key to retrieve. Defaults to `long-lived-token`.

### `scripts/set_metadata.sh`

Sets custom metadata entries for long-lived access tokens on a compute instance.

**Usage:**
```bash
./scripts/set_metadata.sh INSTANCE_NAME ZONE TOKEN
```

**Arguments:**
- `INSTANCE_NAME`: Name of the compute instance
- `ZONE`: Zone where the instance is located
- `TOKEN`: The long-lived access token to store

### `scripts/gcloud_with_token.sh`

Executes gcloud commands using a token automatically fetched from the metadata server.

**Usage:**
```bash
./scripts/gcloud_with_token.sh <gcloud-command-with-args>
```

**Examples:**
```bash
./scripts/gcloud_with_token.sh compute instances list
./scripts/gcloud_with_token.sh projects list
./scripts/gcloud_with_token.sh iam service-accounts list
```

## Programmatic Access

### TypeScript/JavaScript

The codebase includes TypeScript utilities for working with metadata server authentication:

**Fetch token from metadata server:**
```typescript
import { fetchMetadataToken } from './lib/auth/metadataAuth';

const token = await fetchMetadataToken();
console.log('Access token:', token.token);
console.log('Expires at:', new Date(token.expiresAt));
```

**Manage metadata entries:**
```typescript
import { MetadataManager } from './lib/auth/metadataManager';

const manager = new MetadataManager();
await manager.setLongLivedToken(
  'instance-name',
  'us-central1-a',
  'your-long-lived-token'
);
```

## Security Considerations

1. **Token Expiration**: Default service account tokens expire after 1 hour. Custom metadata tokens can be long-lived but should be rotated regularly.

2. **Access Control**: Ensure the service account attached to the instance has only the minimum required permissions.

3. **Metadata Visibility**: Custom metadata is visible to anyone with access to the instance. Don't store highly sensitive tokens in metadata.

4. **Token Rotation**: Implement a token rotation strategy for long-lived tokens stored in metadata.

## Troubleshooting

### Metadata Server Not Available

If you see errors about the metadata server not being available:

- Ensure you're running on a Google Cloud VM instance or Cloud Shell
- Check that the instance has a service account attached
- Verify network connectivity to `metadata.google.internal`

### Authentication Fails

If gcloud authentication fails:

- Verify the token is valid and not expired
- Check that the service account has the required IAM permissions
- Ensure the token format is correct (should be a valid OAuth2 access token)

### Custom Metadata Not Found

If custom metadata cannot be retrieved:

- Verify the metadata key exists on the instance
- Check that the metadata was set correctly using `gcloud compute instances describe`
- Ensure you're querying the correct metadata key name

## Additional Resources

- [Google Cloud Metadata Server Documentation](https://cloud.google.com/compute/docs/metadata/overview)
- [gcloud CLI Authentication](https://cloud.google.com/sdk/gcloud/reference/auth)
- [Service Account Authentication](https://cloud.google.com/docs/authentication/production)

