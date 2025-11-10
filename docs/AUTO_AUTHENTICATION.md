# Automatic Authentication

AzaleaCloud automatically authenticates users using the metadata server, just like Google Cloud Shell. **No manual login required!**

## How It Works

When you access AzaleaCloud Shell:

1. **Automatic Detection**: The system checks if you're running in a Google Cloud environment
2. **Silent Authentication**: Fetches access tokens from the metadata server automatically
3. **Ready to Use**: Shell is immediately available - no login flow needed

## Comparison to Cloud Shell

| Feature | Google Cloud Shell | AzaleaCloud |
|---------|-------------------|-------------|
| Manual Login | ❌ Required | ✅ **Not Required** |
| Auto Authentication | ✅ Yes | ✅ **Yes** |
| Metadata Server | ✅ Yes | ✅ **Yes** |
| User Interaction | Required | **None Needed** |

## Accessing the Shell

### Option 1: Standalone Shell Page

Access the standalone shell interface:
```
https://your-domain.com/azalea-shell.html
```

This page:
- Automatically authenticates in the background
- Shows loading status during authentication
- Ready to use immediately when authenticated

### Option 2: Integrated Terminal

Use the terminal component in the main app:
- Automatically authenticates on initialization
- Shows authentication status
- Works seamlessly with all commands

## Authentication Flow

```
User Opens Shell
    ↓
Check Cloud Environment
    ↓
Fetch Token from Metadata Server
    ↓
Shell Ready (No User Action Needed!)
```

## What Happens Behind the Scenes

1. **Environment Check**: Detects if running on Google Cloud VM or Cloud Shell
2. **Token Fetch**: Automatically retrieves access token from metadata server
3. **Token Refresh**: Automatically refreshes tokens before expiration
4. **gcloud Ready**: All gcloud commands work automatically

## User Experience

### Before (Cloud Shell)
```
1. User opens Cloud Shell
2. User sees login screen
3. User clicks "Authorize"
4. User waits for authentication
5. Shell becomes available
```

### After (AzaleaCloud)
```
1. User opens AzaleaCloud Shell
2. ✓ Shell is ready!
```

## Technical Details

### AutoAuthService

The `AutoAuthService` handles all authentication automatically:

```typescript
import { autoAuthService } from './services/autoAuthService';

// Authentication happens automatically on import
// No need to call anything - it's ready!

// Check status if needed
const status = await autoAuthService.waitForAuth();
if (status.isAuthenticated) {
  console.log('Ready to use!');
}
```

### CloudShellService

The `CloudShellService` automatically authenticates on initialization:

```typescript
// Just create the service - authentication happens automatically
const service = new CloudShellService();

// Commands work immediately
await service.executeCommand('gcloud compute instances list');
```

## Error Handling

If authentication fails:

- **Not in Cloud Environment**: Shows helpful error message
- **Metadata Server Unavailable**: Falls back gracefully
- **Token Expired**: Automatically refreshes

## Security

- Tokens are stored in memory only
- Never logged or exposed
- Automatically refreshed before expiration
- Uses Google Cloud's secure metadata server

## Benefits

✅ **Zero Friction**: Users can start using the shell immediately  
✅ **Secure**: Uses Google Cloud's built-in authentication  
✅ **Automatic**: No user interaction required  
✅ **Reliable**: Handles errors gracefully  
✅ **Fast**: Authentication happens in parallel with shell initialization  

## Troubleshooting

### Shell shows "Not authenticated"

**Cause**: Not running in Google Cloud environment

**Solution**: 
- Deploy on a Google Cloud VM instance
- Or use Cloud Shell
- Or use custom metadata tokens

### Authentication takes too long

**Cause**: Network issues or metadata server slow

**Solution**:
- Check network connectivity
- Verify VM has proper service account
- Check firewall rules

### gcloud commands fail

**Cause**: Token expired or invalid

**Solution**:
- Token should auto-refresh
- Check service account permissions
- Verify metadata server access

## Related Documentation

- [Metadata Server Authentication](./METADATA_SERVER_AUTH.md) - Detailed auth guide
- [Cloud Service Deployment](./CLOUD_SERVICE_DEPLOYMENT.md) - Deployment instructions
- [Cloud Service Summary](./CLOUD_SERVICE_SUMMARY.md) - Overview

