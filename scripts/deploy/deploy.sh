#!/bin/bash
# Azalea Cloud Zero-Downtime Deployment Script
# Based on https://github.com/andrewarrow/devops

set -e

VM_IP="${VM_IP:-}"
BALANCER_GUID="${BALANCER_GUID:-}"
USER="${USER:-aa}"

if [ -z "$VM_IP" ]; then
    echo "Error: VM_IP environment variable not set"
    exit 1
fi

if [ -z "$BALANCER_GUID" ]; then
    echo "Error: BALANCER_GUID environment variable not set"
    exit 1
fi

# Build Azalea Cloud
echo "Building Azalea Cloud..."
npm run build

# Determine which port is currently inactive
echo "Checking active port..."
ACTIVE_PORT=$(ssh ${USER}@${VM_IP} 'curl -s http://localhost:8082' | grep -o '[0-9]*')
if [ "$ACTIVE_PORT" = "3000" ]; then
    DEPLOY_PORT=3001
else
    DEPLOY_PORT=3000
fi

echo "Active port: $ACTIVE_PORT"
echo "Deploying to port: $DEPLOY_PORT"

# Copy build to VM
echo "Uploading build..."
scp -r dist ${USER}@${VM_IP}:/home/${USER}/azalea-cloud-${DEPLOY_PORT}/

# Stop the inactive service
echo "Stopping service on port $DEPLOY_PORT..."
ssh ${USER}@${VM_IP} "systemctl stop azalea-cloud-${DEPLOY_PORT}.service || true"

# Move new build into place
echo "Installing new build..."
ssh ${USER}@${VM_IP} << EOF
    cd /home/${USER}
    rm -rf azalea-cloud-${DEPLOY_PORT}
    mv azalea-cloud-${DEPLOY_PORT}-new azalea-cloud-${DEPLOY_PORT} || true
    # Or if the directory structure is different:
    # cp -r dist azalea-cloud-${DEPLOY_PORT}
EOF

# Start the service
echo "Starting service on port $DEPLOY_PORT..."
ssh ${USER}@${VM_IP} "systemctl start azalea-cloud-${DEPLOY_PORT}.service"

# Wait for service to be ready
echo "Waiting for service to be ready..."
sleep 5

# Switch traffic to new version
echo "Switching traffic to port $DEPLOY_PORT..."
curl -s "https://${VM_IP}/${BALANCER_GUID}/${DEPLOY_PORT}" || true

echo "Deployment complete!"
echo "Active port is now: $DEPLOY_PORT"

