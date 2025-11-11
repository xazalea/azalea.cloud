# Cloud Shell Session Management

This guide explains how to extend Cloud Shell sessions and automate infrastructure testing safely.

## Overview

The session management tools provide:
- **Automatic session keep-alive** to prevent timeouts
- **Infrastructure testing** automation
- **Session monitoring** and status tracking
- **Customizable startup scripts** for Cloud Shell

## Quick Start

### 1. Set Up Customization Script

The `.customize_environment` script runs automatically when Cloud Shell starts. To set it up:

```bash
# Copy the customization script to your home directory
cp scripts/customize_environment.sh ~/.customize_environment
chmod +x ~/.customize_environment

# Or create a symlink
ln -s $(pwd)/scripts/customize_environment.sh ~/.customize_environment
```

**Note**: Google Cloud Shell automatically runs `~/.customize_environment` on startup if it exists and is executable.

### 2. Manual Setup (Alternative)

If you prefer to run setup manually:

```bash
# Run the customization script
bash scripts/customize_environment.sh

# This will:
# - Set up environment variables
# - Install keep-alive service
# - Create testing scripts
# - Set up convenience aliases
```

### 3. Start Keep-Alive Service

```bash
# Using the session manager
bash scripts/session_manager.sh start

# Or using the alias (after customization)
az-keepalive-start

# Or directly
nohup ~/.azalea/bin/keep-alive.sh > /dev/null 2>&1 &
```

## Session Manager

The session manager provides utilities for managing Cloud Shell sessions:

```bash
# Start keep-alive service
bash scripts/session_manager.sh start

# Stop keep-alive service
bash scripts/session_manager.sh stop

# Check status
bash scripts/session_manager.sh status

# Show full session information
bash scripts/session_manager.sh info

# Configure keep-alive interval (in seconds)
bash scripts/session_manager.sh config 600  # 10 minutes
```

### Keep-Alive Configuration

The keep-alive service prevents Cloud Shell from timing out by:
- Creating periodic activity markers
- Maintaining session heartbeat
- Running lightweight commands

**Default interval**: 5 minutes (300 seconds)
**Minimum interval**: 60 seconds (recommended: 300+ seconds)

To configure:

```bash
# Set interval to 10 minutes
export KEEP_ALIVE_INTERVAL=600
bash scripts/session_manager.sh config 600

# Or edit the script directly
nano ~/.azalea/bin/keep-alive.sh
```

## Infrastructure Testing

Run automated tests on your cloud infrastructure:

```bash
# Run all tests
bash scripts/infrastructure_test.sh

# Run specific tests
bash scripts/infrastructure_test.sh metadata
bash scripts/infrastructure_test.sh token
bash scripts/infrastructure_test.sh gcloud
bash scripts/infrastructure_test.sh project
bash scripts/infrastructure_test.sh compute
bash scripts/infrastructure_test.sh storage
bash scripts/infrastructure_test.sh network
bash scripts/infrastructure_test.sh session
```

### Available Tests

1. **Metadata Server**: Tests connectivity to Google Cloud metadata server
2. **Token Retrieval**: Verifies access token retrieval
3. **gcloud Auth**: Checks gcloud authentication status
4. **Project Access**: Validates project configuration and access
5. **Compute API**: Tests Compute Engine API access
6. **Storage API**: Tests Cloud Storage API access
7. **Network**: Verifies external connectivity and DNS
8. **Session**: Checks session persistence and keep-alive status

Test results are logged to `~/.azalea/test-results.log`.

## Convenience Aliases

After running `customize_environment.sh`, these aliases are available:

```bash
az-status              # Show session status
az-test                # Run infrastructure tests
az-keepalive-start     # Start keep-alive service
az-keepalive-stop      # Stop keep-alive service
az-keepalive-status    # Check keep-alive status
```

## Session Information

View detailed session information:

```bash
# Using session manager
bash scripts/session_manager.sh info

# Or using alias
az-status
```

This shows:
- Session duration/uptime
- Keep-alive service status
- Cloud environment details (project, zone, region)
- Instance information

## Customization Script Details

The `customize_environment.sh` script:

1. **Sets up environment variables**:
   - `AZALEA_CLOUD_SERVICE=true`
   - `AZALEA_SESSION_START` (timestamp)
   - `AZALEA_KEEP_ALIVE_ENABLED=true`

2. **Creates directory structure**:
   - `~/.azalea/bin/` - Custom scripts
   - `~/.azalea/` - Configuration and logs

3. **Installs scripts**:
   - `keep-alive.sh` - Session keep-alive service
   - `test-infrastructure.sh` - Infrastructure testing
   - `session-status.sh` - Status monitoring

4. **Configures aliases** in `~/.bashrc`

5. **Optionally runs tests** if `AZALEA_AUTO_TEST=true`

## Advanced Usage

### Custom Startup Tasks

Edit `~/.customize_environment` to add your own startup tasks:

```bash
#!/bin/bash
# Your custom startup script

# Run infrastructure tests
~/.azalea/bin/test-infrastructure.sh

# Start custom services
# your-custom-service.sh &

# Set up project-specific environment
# source ~/project-env.sh
```

### Automated Testing Schedule

Set up periodic testing:

```bash
# Add to crontab (runs every hour)
(crontab -l 2>/dev/null; echo "0 * * * * ~/.azalea/bin/test-infrastructure.sh >> ~/.azalea/test-results.log 2>&1") | crontab -
```

### Session Monitoring

Monitor session health:

```bash
# Watch session status
watch -n 30 'bash scripts/session_manager.sh status'

# Or create a monitoring script
cat > ~/.azalea/bin/monitor.sh << 'EOF'
#!/bin/bash
while true; do
    clear
    bash scripts/session_manager.sh info
    sleep 60
done
EOF
chmod +x ~/.azalea/bin/monitor.sh
```

## Troubleshooting

### Keep-Alive Not Running

```bash
# Check if process exists
pgrep -f keep-alive.sh

# Check logs
cat ~/.azalea/keep-alive.log

# Restart service
bash scripts/session_manager.sh stop
bash scripts/session_manager.sh start
```

### Customization Script Not Running

1. **Check file exists and is executable**:
   ```bash
   ls -la ~/.customize_environment
   chmod +x ~/.customize_environment
   ```

2. **Check Cloud Shell logs**:
   ```bash
   # Look for customization errors
   cat ~/.azalea_customize.log
   ```

3. **Run manually**:
   ```bash
   bash ~/.customize_environment
   ```

### Tests Failing

1. **Check authentication**:
   ```bash
   gcloud auth list
   gcloud config get-value project
   ```

2. **Verify API access**:
   ```bash
   gcloud services list --enabled
   ```

3. **Check network connectivity**:
   ```bash
   curl -I https://www.google.com
   ```

## Security Considerations

These scripts are designed for **legitimate infrastructure management**:

- ✅ All scripts run in your own Cloud Shell environment
- ✅ No external connections to unauthorized servers
- ✅ All activity is logged for audit purposes
- ✅ Uses standard Google Cloud APIs and tools
- ✅ No credential exfiltration or unauthorized access

**Important**: Only use these scripts on infrastructure you own or have explicit permission to manage.

## Best Practices

1. **Regular Testing**: Run infrastructure tests periodically to catch issues early
2. **Monitor Sessions**: Keep track of session duration and health
3. **Log Review**: Regularly review logs for anomalies
4. **Keep Scripts Updated**: Update scripts as your infrastructure evolves
5. **Document Customizations**: Document any custom modifications you make

## Files Created

The scripts create the following structure:

```
~/.azalea/
├── bin/
│   ├── keep-alive.sh          # Keep-alive service
│   ├── test-infrastructure.sh # Testing script
│   └── session-status.sh      # Status script
├── .last_activity             # Activity marker
├── .heartbeat                 # Heartbeat timestamp
├── customize.log              # Customization log
├── keep-alive.log             # Keep-alive log (if verbose)
└── test-results.log           # Test results log
```

## Support

For issues or questions:
1. Check the logs in `~/.azalea/`
2. Review this documentation
3. Run `bash scripts/session_manager.sh info` for diagnostics
4. Run `bash scripts/infrastructure_test.sh` to identify issues

