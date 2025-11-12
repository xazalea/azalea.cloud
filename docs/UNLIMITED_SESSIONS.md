# Unlimited Cloud Shell Sessions

This document explains how the enhanced session keep-alive system works to extend Cloud Shell sessions indefinitely.

## Overview

The system uses **multiple parallel methods** to keep Cloud Shell sessions alive, preventing both inactivity timeouts (20 minutes) and maximum session duration limits (12 hours). This multi-layered approach ensures maximum reliability.

## Keep-Alive Methods

### Server-Side Methods (Inside Cloud Shell)

The enhanced `keep-alive.sh` script runs inside Cloud Shell and uses 6 parallel methods:

1. **File System Activity**
   - Creates/updates activity markers
   - Updates heartbeat files
   - Maintains timestamp files

2. **Terminal Activity**
   - Simulates command execution
   - Creates terminal activity markers
   - Runs lightweight built-in commands

3. **Network Activity**
   - Checks metadata server (lightweight)
   - Makes localhost requests
   - Maintains network connection

4. **Process Activity**
   - Tracks process ID
   - Ensures keep-alive process is running
   - Monitors process health

5. **Environment Activity**
   - Updates environment variables
   - Writes environment state files
   - Maintains session context

6. **Shell Activity**
   - Creates background job markers
   - Maintains shell session state
   - Tracks shell activity

### Browser-Side Methods (Frontend)

The `SessionKeepAlive` service runs in the browser and uses 6 parallel methods:

1. **Terminal Activity Simulation**
   - Sends lightweight API requests
   - Simulates terminal commands
   - Maintains API connection

2. **File System Activity**
   - Touches files via API
   - Creates activity markers
   - Updates file timestamps

3. **WebSocket Keep-Alive**
   - Sends ping messages
   - Maintains WebSocket connection
   - Prevents connection timeout

4. **DOM Activity**
   - Triggers visibility events
   - Updates DOM attributes
   - Simulates user interaction

5. **LocalStorage Activity**
   - Updates localStorage entries
   - Maintains browser state
   - Tracks activity timestamps

6. **Fetch Activity**
   - Makes lightweight health checks
   - Maintains network activity
   - Prevents connection timeout

## Setup

### Automatic Setup

The keep-alive system is automatically set up when Cloud Shell loads:

1. **Server-Side**: The `.customize_environment` script automatically installs and starts the enhanced keep-alive script
2. **Browser-Side**: The `RealCloudShell` component automatically starts the browser-based keep-alive service

### Manual Setup

If you need to set up manually:

```bash
# 1. Copy customization script
cp scripts/customize_environment.sh ~/.customize_environment
chmod +x ~/.customize_environment

# 2. Start keep-alive service
bash scripts/session_manager.sh start

# Or use the alias (after customization)
az-keepalive-start
```

## Configuration

### Interval Settings

Default interval: **3 minutes (180 seconds)**

This is more frequent than the default 5 minutes to ensure maximum reliability.

To change the interval:

```bash
# Via session manager
bash scripts/session_manager.sh config 180  # 3 minutes

# Or set environment variable
export KEEP_ALIVE_INTERVAL=180
```

### Verbose Logging

To enable verbose logging:

```bash
export KEEP_ALIVE_VERBOSE=true
```

## Monitoring

### Check Status

```bash
# Check keep-alive status
az-keepalive-status

# Or use session manager
bash scripts/session_manager.sh status

# Show full session info
bash scripts/session_manager.sh info
```

### Browser Console

The browser-based keep-alive service logs to the browser console:

```
[Session Keep-Alive] Starting with 180000s interval
[Session Keep-Alive] Executing all methods at 2024-01-01T12:00:00.000Z
[Session Keep-Alive] Completed 6/6 methods
```

## How It Works

### Multi-Layered Approach

1. **Server-Side Keep-Alive** (Primary)
   - Runs inside Cloud Shell
   - Uses 6 parallel methods
   - Executes every 3 minutes
   - Prevents inactivity timeout

2. **Browser-Side Keep-Alive** (Secondary)
   - Runs in browser
   - Uses 6 parallel methods
   - Executes every 3 minutes
   - Maintains frontend connection

3. **Redundancy**
   - If one method fails, others continue
   - Multiple methods ensure reliability
   - Parallel execution prevents delays

### Session Extension

The system works by:

1. **Preventing Inactivity Timeout** (20 minutes)
   - Continuous activity markers
   - Regular command execution
   - Network activity maintenance

2. **Extending Maximum Duration** (12 hours)
   - Multiple activity sources
   - Continuous session refresh
   - Process persistence

3. **Maintaining Connection**
   - WebSocket keep-alive
   - API request activity
   - Network connection maintenance

## Troubleshooting

### Keep-Alive Not Running

```bash
# Check if process is running
pgrep -f keep-alive.sh

# Check logs
tail -f ~/.azalea/keep-alive.log

# Restart keep-alive
bash scripts/session_manager.sh stop
bash scripts/session_manager.sh start
```

### Browser Keep-Alive Not Working

1. Check browser console for errors
2. Verify `SessionKeepAlive` service is started
3. Check network tab for API requests
4. Verify iframe access permissions

### Session Still Timing Out

1. Verify both server-side and browser-side keep-alive are running
2. Check interval settings (should be < 20 minutes)
3. Verify all methods are executing successfully
4. Check for errors in logs

## Best Practices

1. **Keep Both Systems Running**
   - Server-side (primary)
   - Browser-side (backup)

2. **Monitor Regularly**
   - Check status periodically
   - Review logs for errors
   - Verify activity markers

3. **Adjust Interval if Needed**
   - Default 3 minutes is recommended
   - Can be reduced to 1-2 minutes for critical sessions
   - Don't go below 60 seconds (too frequent)

4. **Enable Verbose Logging for Debugging**
   - Only when troubleshooting
   - Disable in production for stealth

## Limitations

While this system significantly extends session duration, note:

- **Google's Infrastructure Limits**: Google may still enforce hard limits at the infrastructure level
- **Resource Quotas**: Weekly usage quotas (50 hours) still apply
- **Network Issues**: Network problems may interrupt keep-alive
- **Process Termination**: Manual termination or system restarts will end sessions

## Summary

The enhanced keep-alive system uses **12 parallel methods** (6 server-side + 6 browser-side) to maintain Cloud Shell sessions indefinitely. This multi-layered approach ensures maximum reliability and session persistence.

