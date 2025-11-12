# Azalea Cloud DevOps Integration

This directory contains scripts and configuration for zero-downtime deployment, inspired by [andrewarrow/devops](https://github.com/andrewarrow/devops).

## Features

- ✅ Zero-downtime deployments (blue-green pattern)
- ✅ Load balancer with SSL/HTTPS (Let's Encrypt)
- ✅ PostgreSQL database setup
- ✅ Automated deployment scripts
- ✅ Free tier compatible (Google Cloud e2-micro)

## Quick Start

### 1. Setup Infrastructure

```bash
# Set environment variables
export VM_IP=your-vm-ip
export BALANCER_EMAIL=your-email@example.com
export BALANCER_DOMAINS=example.com,www.example.com

# Run setup
./scripts/deploy/setup-infrastructure.sh $BALANCER_EMAIL $BALANCER_DOMAINS
```

### 2. Deploy Application

```bash
# Build and deploy
./scripts/deploy/deploy.sh
```

### 3. Switch Versions

```bash
# Switch to port 3001
curl https://your-domain.com/${BALANCER_GUID}/3001

# Switch to port 3000
curl https://your-domain.com/${BALANCER_GUID}/3000
```

## Architecture

```
Internet
    ↓ HTTPS (443)
Load Balancer (Go)
    ↓
Web App Port 3000 (Active) ←→ PostgreSQL
Web App Port 3001 (Standby) ←→ PostgreSQL
```

## Deployment Process

1. **Build**: `npm run build`
2. **Upload**: Copy build to VM
3. **Deploy**: Install to standby port (3000 or 3001)
4. **Start**: Start service on standby port
5. **Switch**: Route traffic to new version
6. **Verify**: Check new version is working
7. **Rollback**: If needed, switch back to previous port

## Files

- `load-balancer.go`: Go load balancer with blue-green deployment
- `deploy.sh`: Automated deployment script
- `setup-infrastructure.sh`: Infrastructure setup script
- `setup-postgres.sh`: PostgreSQL setup script

## Integration with Azalea Cloud

The load balancer integrates with:
- **Frontend**: Serves Vite/React build
- **Backend**: Proxies API requests to backend services
- **Database**: PostgreSQL for persistent data
- **SSL**: Automatic Let's Encrypt certificates

## Benefits

1. **Zero Downtime**: Deploy without affecting users
2. **Easy Rollback**: Switch back to previous version instantly
3. **Production Ready**: SSL, load balancing, automated deployments
4. **Cost Effective**: Free tier compatible

## References

- Original project: https://github.com/andrewarrow/devops
- Documentation: See `docs/DEVOPS_INTEGRATION.md`

