# AzaleaCloud Account Management

## Overview

AzaleaCloud now supports unlimited user access through automated service account creation and key management. The system automatically creates service accounts for users and manages authentication keys in the background.

## Features

### ✅ Automated Service Account Creation
- Automatically creates service accounts for new users
- Manages account lifecycle (create, suspend, delete)
- Stores account information in Firebase Realtime Database

### ✅ Automated Key Generation
- Generates service account keys on demand
- Background worker processes key generation jobs
- Stores keys securely in Firebase

### ✅ Metadata Management
- Sets custom metadata on compute instances
- Manages long-lived access tokens
- Updates metadata automatically

### ✅ Background Workers
- Runs periodic tasks for account management
- Processes key generation jobs
- Updates instance metadata

## Service Account Configuration

The system uses the provided service account (`azalea@azaleacompute.iam.gserviceaccount.com`) to:
- Create new service accounts for users
- Generate keys for service accounts
- Manage IAM roles and permissions
- Update compute instance metadata

## Usage

### Creating Accounts via UI

1. Navigate to the **Accounts** tab in the sidebar
2. Click **Create Account** button
3. The system will automatically:
   - Create a new service account
   - Grant necessary IAM roles
   - Generate an initial key
   - Store everything in Firebase

### Automated Account Creation

The background worker automatically:
- Creates accounts for new users
- Generates keys when needed
- Updates metadata on instances
- Cleans up expired keys

### Scripts

#### Generate Keys
```bash
npm run generate-keys
# or
bash scripts/generate_keys.sh
```

#### Set Metadata
```bash
npm run set-metadata <instance-name> <zone> <token>
# or
bash scripts/set_metadata.sh <instance-name> <zone> <token>
```

#### Schedule Jobs
```bash
npm run schedule-jobs
# or
bash scripts/schedule_jobs.sh
```

## Cron Jobs

The system can be configured to run automated tasks via cron:

```bash
# Generate keys daily at midnight
0 0 * * * cd /path/to/azalea-cloud && bash scripts/generate_keys.sh

# Update metadata every 6 hours
0 */6 * * * cd /path/to/azalea-cloud && bash scripts/set_metadata.sh ...
```

See `cron.example` for a complete example.

## Architecture

### Service Account Manager
- Creates and manages service accounts
- Grants IAM roles
- Lists and deletes accounts

### Key Generator
- Generates service account keys
- Stores keys in Firebase
- Processes key generation jobs

### Metadata Manager
- Sets instance metadata
- Manages long-lived tokens
- Retrieves metadata entries

### Account Worker
- Background worker for automation
- Processes jobs periodically
- Manages token refresh

## Security Considerations

⚠️ **Important Security Notes:**

1. **Service Account Keys**: Store keys securely. In production, encrypt keys before storing in Firebase.

2. **IAM Permissions**: The service account needs these permissions:
   - `iam.serviceAccounts.create`
   - `iam.serviceAccounts.delete`
   - `iam.serviceAccountKeys.create`
   - `compute.instances.setMetadata`

3. **Key Rotation**: Implement key rotation policies to regularly generate new keys.

4. **Access Control**: Limit who can create accounts and generate keys.

## Firebase Structure

```
serviceAccounts/
  {userId}/
    {accountId}/
      email: string
      displayName: string
      status: 'active' | 'suspended' | 'deleted'
      createdAt: number
      ...

serviceAccountKeys/
  {userId}/
    {keyId}/
      serviceAccountEmail: string
      keyData: object
      createdAt: number
      ...

keyGenerationJobs/
  {jobId}/
    serviceAccountEmail: string
    userId: string
    status: 'pending' | 'processing' | 'completed' | 'failed'
    ...
```

## API Reference

### ServiceAccountManager

```typescript
// Create a service account
const account = await serviceAccountManager.createServiceAccount(
  'Display Name',
  'user-id'
);

// Generate a key
const key = await serviceAccountManager.generateServiceAccountKey(
  'service-account@project.iam.gserviceaccount.com'
);

// List accounts
const accounts = await serviceAccountManager.listServiceAccounts('user-id');
```

### KeyGenerator

```typescript
// Generate and store a key
const key = await keyGenerator.generateAndStoreKey(
  'service-account@project.iam.gserviceaccount.com',
  'user-id'
);

// Create a job
const jobId = await keyGenerator.createKeyGenerationJob(
  'service-account@project.iam.gserviceaccount.com',
  'user-id'
);
```

### MetadataManager

```typescript
// Set metadata
await metadataManager.setInstanceMetadata(
  'instance-name',
  'us-central1-a',
  'long-lived-token',
  'token-value'
);

// Get metadata
const metadata = await metadataManager.getInstanceMetadata(
  'instance-name',
  'us-central1-a'
);
```

## Troubleshooting

### Service Account Creation Fails
- Check IAM permissions
- Verify service account credentials
- Check project ID is correct

### Key Generation Fails
- Ensure service account exists
- Check IAM permissions
- Verify Firebase connection

### Metadata Update Fails
- Check compute instance exists
- Verify zone is correct
- Check IAM permissions for compute API

## Next Steps

1. Set up cron jobs for automated tasks
2. Implement key rotation policies
3. Add monitoring and alerting
4. Implement access control
5. Add encryption for stored keys

