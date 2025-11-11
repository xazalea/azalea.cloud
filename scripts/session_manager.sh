#!/bin/bash
#
# Cloud Shell Session Manager
# Utilities for managing and extending Cloud Shell sessions
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AZALEA_DIR="$HOME/.azalea"
KEEP_ALIVE_SCRIPT="$AZALEA_DIR/bin/keep-alive.sh"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if keep-alive is running
is_keepalive_running() {
    pgrep -f "keep-alive.sh" > /dev/null
}

# Start keep-alive service
start_keepalive() {
    if is_keepalive_running; then
        warn "Keep-alive service is already running"
        return 1
    fi
    
    if [ ! -f "$KEEP_ALIVE_SCRIPT" ]; then
        error "Keep-alive script not found. Run customize_environment.sh first."
        return 1
    fi
    
    log "Starting keep-alive service..."
    nohup "$KEEP_ALIVE_SCRIPT" > /dev/null 2>&1 &
    sleep 1
    
    if is_keepalive_running; then
        log "Keep-alive service started successfully (PID: $(pgrep -f 'keep-alive.sh'))"
        return 0
    else
        error "Failed to start keep-alive service"
        return 1
    fi
}

# Stop keep-alive service
stop_keepalive() {
    if ! is_keepalive_running; then
        warn "Keep-alive service is not running"
        return 1
    fi
    
    log "Stopping keep-alive service..."
    pkill -f "keep-alive.sh"
    sleep 1
    
    if ! is_keepalive_running; then
        log "Keep-alive service stopped successfully"
        return 0
    else
        error "Failed to stop keep-alive service"
        return 1
    fi
}

# Show keep-alive status
status_keepalive() {
    if is_keepalive_running; then
        PID=$(pgrep -f "keep-alive.sh")
        log "Keep-alive service is running (PID: $PID)"
        
        if [ -f "$HOME/.azalea/.last_activity" ]; then
            LAST_ACTIVITY=$(stat -f "%Sm" "$HOME/.azalea/.last_activity" 2>/dev/null || \
                           stat -c "%y" "$HOME/.azalea/.last_activity" 2>/dev/null || \
                           echo "Unknown")
            log "Last activity: $LAST_ACTIVITY"
        fi
        
        if [ -f "$HOME/.azalea/.heartbeat" ]; then
            HEARTBEAT=$(cat "$HOME/.azalea/.heartbeat" 2>/dev/null || echo "Unknown")
            log "Last heartbeat: $HEARTBEAT"
        fi
    else
        warn "Keep-alive service is not running"
    fi
}

# Show session information
show_session_info() {
    echo ""
    echo "=== Cloud Shell Session Information ==="
    echo ""
    
    # Session duration
    if [ -n "$AZALEA_SESSION_START" ]; then
        UPTIME=$(( $(date +%s) - $AZALEA_SESSION_START ))
        HOURS=$(( UPTIME / 3600 ))
        MINS=$(( (UPTIME % 3600) / 60 ))
        SECS=$(( UPTIME % 60 ))
        echo "Session Duration: ${HOURS}h ${MINS}m ${SECS}s"
    else
        echo "Session Duration: Not tracked"
    fi
    
    echo ""
    
    # Keep-alive status
    status_keepalive
    
    echo ""
    
    # Cloud environment info
    echo "Cloud Environment:"
    PROJECT=$(gcloud config get-value project 2>/dev/null || echo "N/A")
    ZONE=$(gcloud config get-value compute/zone 2>/dev/null || echo "N/A")
    REGION=$(gcloud config get-value compute/region 2>/dev/null || echo "N/A")
    
    echo "  Project: $PROJECT"
    echo "  Zone: $ZONE"
    echo "  Region: $REGION"
    
    # Instance info (if available)
    if curl -s -H "Metadata-Flavor: Google" \
        "http://metadata.google.internal/computeMetadata/v1/instance/name" > /dev/null 2>&1; then
        INSTANCE_NAME=$(curl -s -H "Metadata-Flavor: Google" \
            "http://metadata.google.internal/computeMetadata/v1/instance/name" 2>/dev/null || echo "N/A")
        echo "  Instance: $INSTANCE_NAME"
    fi
    
    echo ""
    echo "=== End Session Info ==="
    echo ""
}

# Configure keep-alive interval
configure_keepalive() {
    local interval=$1
    
    if [ -z "$interval" ]; then
        read -p "Enter keep-alive interval in seconds (default: 300): " interval
        interval=${interval:-300}
    fi
    
    if ! [[ "$interval" =~ ^[0-9]+$ ]] || [ "$interval" -lt 60 ]; then
        error "Interval must be a number >= 60 seconds"
        return 1
    fi
    
    log "Configuring keep-alive interval to ${interval} seconds"
    export KEEP_ALIVE_INTERVAL=$interval
    
    # Update the script if it exists
    if [ -f "$KEEP_ALIVE_SCRIPT" ]; then
        sed -i.bak "s/INTERVAL=\${KEEP_ALIVE_INTERVAL:-300}/INTERVAL=\${KEEP_ALIVE_INTERVAL:-$interval}/" "$KEEP_ALIVE_SCRIPT"
        log "Keep-alive script updated"
    fi
    
    # Restart if running
    if is_keepalive_running; then
        log "Restarting keep-alive service with new interval..."
        stop_keepalive
        sleep 1
        start_keepalive
    fi
}

# Main menu
show_help() {
    echo "Cloud Shell Session Manager"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  start       Start keep-alive service"
    echo "  stop        Stop keep-alive service"
    echo "  status      Show keep-alive status"
    echo "  info        Show session information"
    echo "  config      Configure keep-alive interval"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start              # Start keep-alive"
    echo "  $0 config 600         # Set interval to 10 minutes"
    echo "  $0 status             # Check status"
}

# Main
case "${1:-help}" in
    start)
        start_keepalive
        ;;
    stop)
        stop_keepalive
        ;;
    status)
        status_keepalive
        ;;
    info)
        show_session_info
        ;;
    config)
        configure_keepalive "$2"
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac

