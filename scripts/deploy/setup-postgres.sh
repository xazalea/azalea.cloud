#!/bin/bash
# Setup PostgreSQL for Azalea Cloud
# Based on https://github.com/andrewarrow/devops

set -e

echo "Setting up PostgreSQL..."

# Install PostgreSQL
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql << EOF
CREATE USER azalea WITH SUPERUSER PASSWORD 'azalea';
CREATE DATABASE azalea_cloud;
GRANT ALL PRIVILEGES ON DATABASE azalea_cloud TO azalea;
\c azalea_cloud
CREATE EXTENSION IF NOT EXISTS citext;
EOF

echo "PostgreSQL setup complete!"
echo ""
echo "Connection string:"
echo "postgresql://azalea:azalea@localhost/azalea_cloud"

