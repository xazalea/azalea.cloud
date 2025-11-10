# Cloud Service Summary

AzaleaCloud now works as a perfect cloud service with automatic metadata server authentication, similar to Google Cloud Shell.

## What Was Implemented

### 1. Cloud Metadata Service (`lib/services/cloudMetadataService.ts`)
- Automatically detects Google Cloud environment
- Fetches tokens from metadata server
- Supports custom metadata tokens (long-lived)
- Automatic token refresh
- Seamless gcloud command execution

### 2. Enhanced Cloud Shell Service (`src/services/cloudShellService.ts`)
- Integrated with metadata service
- Automatic authentication for gcloud commands
- Environment detection
- Token management

### 3. Backend Metadata Server (`backend/cloudMetadataServer.js`)
- RESTful API for token management
- gcloud command execution endpoint
- Environment detection endpoint
- Health check endpoint

### 4. Initialization Script (`scripts/init_cloud_service.sh`)
- Automatic environment setup
- gcloud helper creation
- Environment configuration
- Instance information display

### 5. Helper Scripts
- `scripts/auth_with_metadata.sh` - Authenticate with metadata server
- `scripts/auth_with_custom_metadata.sh` - Use custom metadata tokens
- `scripts/gcloud_with_token.sh` - Execute gcloud commands with tokens

## How It Works

### Automatic Detection
When the service starts:
1. Checks if running in Google Cloud environment
2. Detects metadata server availability
3. Configures authentication automatically

### Token Management
1. **Default Service Account Token:**
   - Fetched from metadata server
   - Auto-refreshed before expiration
   - Used for standard operations

2. **Custom Metadata Token:**
   - Stored in instance metadata
   - Long-lived tokens
   - Used when available

### gcloud Integration
- All gcloud commands automatically authenticated
- No manual login required
- Works seamlessly like Cloud Shell
- Token passed via `--access-token-file` flag

## Usage

### In Code
```typescript
import { CloudShellService } from './services/cloudShellService';

const service = new CloudShellService();
// Automatically uses metadata authentication
const result = await service.executeCommand('gcloud compute instances list');
```

### Via Scripts
```bash
# Initialize
./scripts/init_cloud_service.sh

# Use gcloud
./scripts/gcloud_with_token.sh compute instances list
```

### Via API
```bash
# Get token
curl http://localhost:3002/api/token

# Execute command
curl -X POST http://localhost:3002/api/gcloud \
  -H "Content-Type: application/json" \
  -d '{"command": "compute instances list"}'
```

## Deployment

The service can be deployed on:
- **Compute Engine VM** - Full control, automatic metadata access
- **Cloud Run** - Serverless, scalable
- **Cloud Shell** - Development and testing

See [CLOUD_SERVICE_DEPLOYMENT.md](./CLOUD_SERVICE_DEPLOYMENT.md) for detailed deployment instructions.

## Features

✅ **Automatic Authentication** - No manual login required  
✅ **Token Management** - Automatic refresh and caching  
✅ **Environment Detection** - Works in cloud and local  
✅ **gcloud Integration** - Seamless CLI access  
✅ **Custom Tokens** - Support for long-lived tokens  
✅ **RESTful API** - Programmatic access  
✅ **Health Monitoring** - Built-in health checks  

## Comparison to Cloud Shell

| Feature | Google Cloud Shell | AzaleaCloud |
|---------|-------------------|-------------|
| Automatic Auth | ✅ | ✅ |
| Metadata Server | ✅ | ✅ |
| Token Refresh | ✅ | ✅ |
| gcloud Access | ✅ | ✅ |
| Custom Tokens | ❌ | ✅ |
| RESTful API | ❌ | ✅ |
| Deployment Control | ❌ | ✅ |

## Next Steps

1. **Deploy to Production:**
   - Choose deployment option (VM, Cloud Run, etc.)
   - Run initialization script
   - Start metadata server

2. **Configure Custom Tokens:**
   - Set long-lived tokens in instance metadata
   - Use for high-frequency operations

3. **Monitor and Maintain:**
   - Set up health checks
   - Monitor token refresh
   - Track authentication success

## Documentation

- [Metadata Server Authentication](./METADATA_SERVER_AUTH.md) - Detailed auth guide
- [Cloud Service Deployment](./CLOUD_SERVICE_DEPLOYMENT.md) - Deployment instructions
- [Account Management](./ACCOUNT_MANAGEMENT.md) - Service account management

## Support

For issues or questions:
1. Check troubleshooting sections in documentation
2. Review health check endpoints
3. Check logs for errors
4. Verify metadata server accessibility

