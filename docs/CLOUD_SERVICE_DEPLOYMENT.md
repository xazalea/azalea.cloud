# Cloud Service Deployment Guide

This guide explains how to deploy AzaleaCloud as a cloud service with automatic metadata server authentication, similar to Google Cloud Shell.

## Overview

AzaleaCloud can be deployed as a cloud service that automatically:
- Detects Google Cloud environment
- Uses metadata server for authentication
- Provides seamless gcloud CLI access
- Manages tokens automatically

## Architecture

```
Browser (Frontend)
    ↓
Cloud Service (Backend)
    ↓ Metadata Server
Google Cloud Metadata Server
    ↓
gcloud CLI / Google Cloud APIs
```

## Deployment Options

### Option 1: Compute Engine VM

Deploy on a Google Cloud Compute Engine VM instance:

1. **Create VM Instance:**
```bash
gcloud compute instances create azalea-cloud-service \
  --zone=us-central1-a \
  --machine-type=e2-medium \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --scopes=https://www.googleapis.com/auth/cloud-platform
```

2. **SSH into the instance:**
```bash
gcloud compute ssh azalea-cloud-service --zone=us-central1-a
```

3. **Run initialization script:**
```bash
./scripts/init_cloud_service.sh
```

4. **Start the cloud metadata server:**
```bash
cd backend
node cloudMetadataServer.js &
```

### Option 2: Cloud Run

Deploy as a Cloud Run service:

1. **Create Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3002
CMD ["node", "backend/cloudMetadataServer.js"]
```

2. **Deploy:**
```bash
gcloud run deploy azalea-cloud-service \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Option 3: Cloud Shell (Development)

For development and testing in Cloud Shell:

1. **Open Cloud Shell:**
   - Go to https://shell.cloud.google.com

2. **Clone and setup:**
```bash
git clone https://github.com/xazalea/azalea.cloud.git
cd azalea-cloud
./scripts/init_cloud_service.sh
```

3. **Start services:**
```bash
# Start metadata server
node backend/cloudMetadataServer.js &

# Start main backend
node backend/server.js &
```

## Automatic Authentication

Once deployed, the service automatically:

1. **Detects Cloud Environment:**
   - Checks for metadata server availability
   - Configures authentication automatically

2. **Manages Tokens:**
   - Fetches tokens from metadata server
   - Refreshes tokens before expiration
   - Falls back to custom metadata tokens if available

3. **Provides gcloud Access:**
   - All gcloud commands automatically authenticated
   - No manual login required
   - Works seamlessly like Cloud Shell

## API Endpoints

### Health Check
```
GET /api/health
```

### Get Access Token
```
GET /api/token
```

### Get Custom Metadata Token
```
GET /api/token/custom?key=long-lived-token
```

### Execute gcloud Command
```
POST /api/gcloud
Content-Type: application/json

{
  "command": "compute instances list",
  "useCustomToken": false,
  "customTokenKey": "long-lived-token"
}
```

### Check Environment
```
GET /api/environment
```

## Usage Examples

### Using the Helper Scripts

```bash
# Initialize cloud service
./scripts/init_cloud_service.sh

# Use gcloud with automatic token
./scripts/gcloud_with_token.sh compute instances list

# Authenticate with metadata token
./scripts/auth_with_metadata.sh
```

### Using the API

```bash
# Get token
curl http://localhost:3002/api/token

# Execute gcloud command
curl -X POST http://localhost:3002/api/gcloud \
  -H "Content-Type: application/json" \
  -d '{"command": "compute instances list"}'
```

### Using TypeScript Service

```typescript
import { CloudMetadataService } from './lib/services/cloudMetadataService';

const service = new CloudMetadataService();
const token = await service.getAccessToken();
const result = await service.executeGcloudCommand(['compute', 'instances', 'list']);
```

## Environment Variables

- `METADATA_SERVER_PORT`: Port for metadata server (default: 3002)
- `GOOGLE_CLOUD_PROJECT`: Project ID (auto-detected from metadata)
- `GOOGLE_APPLICATION_CREDENTIALS`: Path to service account key (optional)

## Security Considerations

1. **Service Account Permissions:**
   - Ensure the VM's service account has necessary IAM roles
   - Use principle of least privilege

2. **Token Storage:**
   - Tokens are stored in memory only
   - Never log tokens to files or console
   - Use HTTPS in production

3. **Network Security:**
   - Restrict access to metadata server endpoints
   - Use firewall rules to limit access
   - Enable VPC firewall rules

## Monitoring

### Health Checks

```bash
# Check service health
curl http://localhost:3002/api/health

# Check environment
curl http://localhost:3002/api/environment
```

### Logs

```bash
# View metadata server logs
tail -f /var/log/cloud-metadata-server.log

# View backend logs
tail -f /var/log/azalea-backend.log
```

## Troubleshooting

### Metadata Server Not Available

**Problem:** Service can't access metadata server

**Solutions:**
- Ensure VM has proper service account attached
- Check firewall rules allow metadata server access
- Verify VM is running in Google Cloud

### Token Refresh Fails

**Problem:** Tokens not refreshing automatically

**Solutions:**
- Check service account permissions
- Verify metadata server is accessible
- Check network connectivity

### gcloud Commands Fail

**Problem:** gcloud commands return authentication errors

**Solutions:**
- Verify token is valid: `curl http://localhost:3002/api/token`
- Check service account has required IAM roles
- Ensure gcloud is installed and configured

## Best Practices

1. **Use Custom Metadata for Long-Lived Tokens:**
   - Store long-lived tokens in instance metadata
   - Reduces metadata server calls
   - Better for high-frequency operations

2. **Monitor Token Expiration:**
   - Set up alerts for token refresh failures
   - Monitor metadata server availability
   - Track authentication success rates

3. **Implement Retry Logic:**
   - Retry failed token fetches
   - Implement exponential backoff
   - Handle transient errors gracefully

4. **Cache Tokens Appropriately:**
   - Cache tokens in memory
   - Refresh before expiration
   - Don't cache expired tokens

## Related Documentation

- [Metadata Server Authentication](./METADATA_SERVER_AUTH.md)
- [Account Management](./ACCOUNT_MANAGEMENT.md)
- [Backend Setup](./BACKEND_SETUP.md)

