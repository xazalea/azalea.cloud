#!/bin/bash
#
# Cloud Shell Customization Script
# This script runs automatically when Cloud Shell starts
# Use it to set up your environment, install tools, and run automation
#

set -e

# Log file for customization activities
LOG_FILE="$HOME/.azalea_customize.log"
mkdir -p "$(dirname "$LOG_FILE")"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "Starting Cloud Shell customization..."

# 1. Set up environment variables
log "Setting up environment variables..."
cat >> "$HOME/.bashrc" << 'ENV_EOF'

# AzaleaCloud Environment Variables
export AZALEA_CLOUD_SERVICE=true
export AZALEA_SESSION_START=$(date +%s)
export AZALEA_KEEP_ALIVE_ENABLED=true

# Add custom bin directory to PATH
export PATH="$HOME/.azalea/bin:$PATH"
ENV_EOF

# 2. Create bin directory for custom scripts
mkdir -p "$HOME/.azalea/bin"
log "Created ~/.azalea/bin directory"

# 3. Install/update session keep-alive script
log "Setting up session keep-alive..."
cat > "$HOME/.azalea/bin/keep-alive.sh" << 'KEEPALIVE_EOF'
#!/bin/bash
# Session keep-alive script - prevents Cloud Shell from timing out
# Runs in background to maintain active session

INTERVAL=${KEEP_ALIVE_INTERVAL:-300}  # Default: 5 minutes
LOG_FILE="$HOME/.azalea/keep-alive.log"

mkdir -p "$(dirname "$LOG_FILE")"

while true; do
    # Simple activity to keep session alive
    touch "$HOME/.azalea/.last_activity"
    
    # Optionally: Run a lightweight command
    # This helps maintain the session
    date > "$HOME/.azalea/.heartbeat" 2>/dev/null || true
    
    # Log activity (optional, can be disabled for stealth)
    if [ "${KEEP_ALIVE_VERBOSE:-false}" = "true" ]; then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] Keep-alive ping" >> "$LOG_FILE"
    fi
    
    sleep "$INTERVAL"
done
KEEPALIVE_EOF

chmod +x "$HOME/.azalea/bin/keep-alive.sh"
log "Keep-alive script installed"

# 4. Start keep-alive in background (if not already running)
if ! pgrep -f "keep-alive.sh" > /dev/null; then
    nohup "$HOME/.azalea/bin/keep-alive.sh" > /dev/null 2>&1 &
    log "Keep-alive service started (PID: $!)"
else
    log "Keep-alive service already running"
fi

# 5. Set up infrastructure testing automation
log "Setting up testing automation..."
cat > "$HOME/.azalea/bin/test-infrastructure.sh" << 'TEST_EOF'
#!/bin/bash
# Infrastructure testing script
# Run automated tests on your cloud infrastructure

TEST_LOG="$HOME/.azalea/test-results.log"
mkdir -p "$(dirname "$TEST_LOG")"

log_test() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$TEST_LOG"
}

log_test "Starting infrastructure tests..."

# Test 1: Check metadata server connectivity
log_test "Test 1: Metadata server connectivity"
if curl -s -H "Metadata-Flavor: Google" \
    "http://metadata.google.internal/computeMetadata/v1/instance/" > /dev/null 2>&1; then
    log_test "  ✓ Metadata server accessible"
else
    log_test "  ✗ Metadata server not accessible"
fi

# Test 2: Check gcloud authentication
log_test "Test 2: gcloud authentication"
if gcloud auth list 2>/dev/null | grep -q "ACTIVE"; then
    log_test "  ✓ gcloud authenticated"
else
    log_test "  ✗ gcloud not authenticated"
fi

# Test 3: Check project access
log_test "Test 3: Project access"
PROJECT_ID=$(gcloud config get-value project 2>/dev/null || echo "N/A")
log_test "  Project: $PROJECT_ID"

# Test 4: Check compute resources
log_test "Test 4: Compute resources"
if gcloud compute instances list --limit=1 > /dev/null 2>&1; then
    log_test "  ✓ Compute API accessible"
else
    log_test "  ✗ Compute API not accessible"
fi

log_test "Infrastructure tests completed"
TEST_EOF

chmod +x "$HOME/.azalea/bin/test-infrastructure.sh"
log "Testing script installed"

# 6. Set up session status monitoring
log "Setting up session monitoring..."
cat > "$HOME/.azalea/bin/session-status.sh" << 'STATUS_EOF'
#!/bin/bash
# Display current Cloud Shell session status

echo "=== Cloud Shell Session Status ==="
echo ""

# Session start time
if [ -n "$AZALEA_SESSION_START" ]; then
    START_TIME=$(date -d "@$AZALEA_SESSION_START" 2>/dev/null || date -r "$AZALEA_SESSION_START" 2>/dev/null || echo "Unknown")
    UPTIME=$(( $(date +%s) - $AZALEA_SESSION_START ))
    UPTIME_HOURS=$(( UPTIME / 3600 ))
    UPTIME_MINS=$(( (UPTIME % 3600) / 60 ))
    echo "Session Start: $START_TIME"
    echo "Uptime: ${UPTIME_HOURS}h ${UPTIME_MINS}m"
else
    echo "Session Start: Not tracked"
fi

echo ""

# Keep-alive status
if pgrep -f "keep-alive.sh" > /dev/null; then
    echo "Keep-Alive: ✓ Running"
    if [ -f "$HOME/.azalea/.last_activity" ]; then
        LAST_ACTIVITY=$(stat -f "%Sm" "$HOME/.azalea/.last_activity" 2>/dev/null || \
                       stat -c "%y" "$HOME/.azalea/.last_activity" 2>/dev/null || \
                       echo "Unknown")
        echo "Last Activity: $LAST_ACTIVITY"
    fi
else
    echo "Keep-Alive: ✗ Not running"
fi

echo ""

# Environment info
echo "Environment:"
echo "  Project: $(gcloud config get-value project 2>/dev/null || echo 'N/A')"
echo "  Zone: $(gcloud config get-value compute/zone 2>/dev/null || echo 'N/A')"
echo "  Region: $(gcloud config get-value compute/region 2>/dev/null || echo 'N/A')"

echo ""
echo "=== End Status ==="
STATUS_EOF

chmod +x "$HOME/.azalea/bin/session-status.sh"
log "Session status script installed"

# 7. Create convenience aliases
log "Setting up aliases..."
cat >> "$HOME/.bashrc" << 'ALIAS_EOF'

# AzaleaCloud convenience aliases
alias az-status='~/.azalea/bin/session-status.sh'
alias az-test='~/.azalea/bin/test-infrastructure.sh'
alias az-keepalive-start='nohup ~/.azalea/bin/keep-alive.sh > /dev/null 2>&1 &'
alias az-keepalive-stop='pkill -f keep-alive.sh'
alias az-keepalive-status='pgrep -f keep-alive.sh && echo "Running" || echo "Stopped"'
ALIAS_EOF

log "Aliases configured"

# 8. Run initial infrastructure test (optional, can be disabled)
if [ "${AZALEA_AUTO_TEST:-false}" = "true" ]; then
    log "Running initial infrastructure test..."
    "$HOME/.azalea/bin/test-infrastructure.sh" >> "$LOG_FILE" 2>&1
fi

log "Cloud Shell customization complete!"
log "Use 'az-status' to check session status"
log "Use 'az-test' to run infrastructure tests"

