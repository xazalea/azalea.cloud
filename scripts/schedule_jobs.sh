#!/bin/bash

# Schedule Jobs Script
# Sets up cron jobs for automated key generation and metadata updates

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GENERATE_KEYS_SCRIPT="$SCRIPT_DIR/generate_keys.sh"
SET_METADATA_SCRIPT="$SCRIPT_DIR/set_metadata.sh"

# Make scripts executable
chmod +x "$GENERATE_KEYS_SCRIPT"
chmod +x "$SET_METADATA_SCRIPT"

# Create cron jobs
CRON_JOBS=""

# Run key generation daily at midnight
CRON_JOBS="${CRON_JOBS}0 0 * * * $GENERATE_KEYS_SCRIPT\n"

# Run metadata update every 6 hours
CRON_JOBS="${CRON_JOBS}0 */6 * * * $SET_METADATA_SCRIPT\n"

# Add to crontab
(crontab -l 2>/dev/null; echo -e "$CRON_JOBS") | crontab -

echo "✓ Cron jobs scheduled:"
echo "  - Key generation: Daily at midnight"
echo "  - Metadata update: Every 6 hours"

