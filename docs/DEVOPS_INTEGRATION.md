# DevOps Integration - Zero-Downtime Deployment

This document describes the integration of the [devops project](https://github.com/andrewarrow/devops) zero-downtime deployment system into Azalea Cloud.

## Overview

The devops project provides:
- **Zero-downtime deployments** using blue-green pattern (ports 3000/3001)
- **PostgreSQL database** for persistent data storage
- **Load balancer** with SSL/HTTPS via Let's Encrypt
- **Free tier compatible** (e2-micro VM on Google Cloud)

## Integration Benefits

1. **Zero-Downtime Deployments**: Deploy new versions without affecting users
2. **PostgreSQL Database**: Replace or supplement Firebase for better performance
3. **Production-Ready Infrastructure**: SSL, load balancing, automated deployments
4. **Cost-Effective**: Uses free tier Google Cloud resources

## Architecture

```
Internet
    ↓ HTTPS (443)
Load Balancer (Go)
    ↓ Reverse Proxy
Web App (Port 3000 or 3001)
    ↓
PostgreSQL (localhost)
    ↓
Azalea Cloud Services
```

## Components

### 1. Load Balancer

The load balancer:
- Handles SSL/HTTPS with Let's Encrypt
- Routes traffic to either port 3000 or 3001
- Enables zero-downtime deployments
- Redirects HTTP (80) to HTTPS (443)

### 2. Blue-Green Deployment

Two instances run simultaneously:
- **Port 3000**: Active (receives 100% traffic)
- **Port 3001**: Standby (ready for deployment)

Deployment process:
1. Deploy new version to standby port (3001)
2. Test the new version
3. Switch traffic via special URL: `/GUID/3001`
4. Old version becomes standby

### 3. PostgreSQL Database

PostgreSQL provides:
- Persistent data storage
- Better performance than Firebase for relational data
- Free tier compatible
- Local access from VM

## Integration Steps

### Step 1: Setup Infrastructure

```bash
# Clone devops project
git clone https://github.com/andrewarrow/devops.git
cd devops

# Build load balancer
cd balancer
./build.sh

# Build web app (Azalea Cloud)
cd ../web
# Copy Azalea Cloud build here
```

### Step 2: Configure Environment

```bash
# Set environment variables
export BALANCER_GUID=<generated-guid>
export VM_IP=<your-vm-ip>
export BALANCER_EMAIL=<your-email>
export BALANCER_DOMAINS=<your-domains>
```

### Step 3: Deploy

```bash
# Run deployment scripts
./vm psql
./vm env youremail yourdomains
./vm cp ../balancer/balancer.service /etc/systemd/system/ root
./vm cp ../balancer/balancer /home/aa/ aa
./vm reload balancer
```

## Adapting for Azalea Cloud

### Changes Needed

1. **Build Process**: Adapt build scripts for Vite/React
2. **Port Configuration**: Ensure Azalea Cloud can run on ports 3000/3001
3. **Database Integration**: Add PostgreSQL support alongside Firebase
4. **Deployment Scripts**: Create scripts for Azalea Cloud deployment

### Integration Points

1. **Frontend Build**: Output to `dist/` directory
2. **Backend Services**: Ensure services can run on configurable ports
3. **Database**: Add PostgreSQL connection alongside Firebase
4. **Environment Variables**: Support both deployment methods

## Benefits for Azalea Cloud

1. **Production Deployment**: Professional deployment infrastructure
2. **Zero Downtime**: Deploy updates without user impact
3. **SSL/HTTPS**: Automatic certificate management
4. **Scalability**: Easy to add more instances
5. **Cost**: Free tier compatible

## Next Steps

See `scripts/deploy/` directory for integration scripts.

