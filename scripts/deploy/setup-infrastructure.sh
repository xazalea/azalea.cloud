#!/bin/bash
# Setup Azalea Cloud Infrastructure with Load Balancer
# Based on https://github.com/andrewarrow/devops

set -e

EMAIL="${1:-}"
DOMAINS="${2:-}"

if [ -z "$EMAIL" ] || [ -z "$DOMAINS" ]; then
    echo "Usage: $0 <email> <domains>"
    echo "Example: $0 admin@example.com example.com,www.example.com"
    exit 1
fi

# Generate GUID for load balancer
GUID=$(uuidgen | tr '[:upper:]' '[:lower:]')
echo "Generated BALANCER_GUID: $GUID"
echo "export BALANCER_GUID=$GUID"

# Setup PostgreSQL
echo "Setting up PostgreSQL..."
./scripts/deploy/setup-postgres.sh

# Create systemd service files
echo "Creating systemd service files..."
cat > /tmp/azalea-cloud-3000.service << EOF
[Unit]
Description=Azalea Cloud Web App (Port 3000)
After=network.target

[Service]
Type=simple
User=aa
WorkingDirectory=/home/aa/azalea-cloud-3000
ExecStart=/usr/bin/node server.js --port 3000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

cat > /tmp/azalea-cloud-3001.service << EOF
[Unit]
Description=Azalea Cloud Web App (Port 3001)
After=network.target

[Service]
Type=simple
User=aa
WorkingDirectory=/home/aa/azalea-cloud-3000
ExecStart=/usr/bin/node server.js --port 3001
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

cat > /tmp/balancer.service << EOF
[Unit]
Description=Azalea Cloud Load Balancer
After=network.target

[Service]
Type=simple
User=aa
WorkingDirectory=/home/aa
ExecStart=/home/aa/balancer
Environment="BALANCER_GUID=$GUID"
Environment="BALANCER_EMAIL=$EMAIL"
Environment="BALANCER_DOMAINS=$DOMAINS"
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy service files to VM:"
echo "   scp /tmp/*.service aa@VM_IP:/tmp/"
echo "   ssh aa@VM_IP 'sudo mv /tmp/*.service /etc/systemd/system/'"
echo ""
echo "2. Copy load balancer binary:"
echo "   scp balancer/balancer aa@VM_IP:/home/aa/"
echo ""
echo "3. Start services:"
echo "   ssh aa@VM_IP 'sudo systemctl daemon-reload'"
echo "   ssh aa@VM_IP 'sudo systemctl enable balancer azalea-cloud-3000 azalea-cloud-3001'"
echo "   ssh aa@VM_IP 'sudo systemctl start balancer azalea-cloud-3000 azalea-cloud-3001'"

