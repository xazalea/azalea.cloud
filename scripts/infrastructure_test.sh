#!/bin/bash
#
# Infrastructure Testing Script
# Automated testing for cloud infrastructure components
#

set -e

TEST_LOG="$HOME/.azalea/test-results.log"
TEST_DIR="$HOME/.azalea/tests"
mkdir -p "$TEST_DIR"
mkdir -p "$(dirname "$TEST_LOG")"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PASSED=0
FAILED=0
WARNINGS=0

log_test() {
    local status=$1
    local message=$2
    
    case $status in
        PASS)
            echo -e "${GREEN}[PASS]${NC} $message"
            echo "[PASS] $message" >> "$TEST_LOG"
            ((PASSED++))
            ;;
        FAIL)
            echo -e "${RED}[FAIL]${NC} $message"
            echo "[FAIL] $message" >> "$TEST_LOG"
            ((FAILED++))
            ;;
        WARN)
            echo -e "${YELLOW}[WARN]${NC} $message"
            echo "[WARN] $message" >> "$TEST_LOG"
            ((WARNINGS++))
            ;;
        INFO)
            echo -e "${BLUE}[INFO]${NC} $message"
            echo "[INFO] $message" >> "$TEST_LOG"
            ;;
    esac
}

# Test metadata server connectivity
test_metadata_server() {
    log_test "INFO" "Testing metadata server connectivity..."
    
    if curl -s -f -H "Metadata-Flavor: Google" \
        "http://metadata.google.internal/computeMetadata/v1/instance/" > /dev/null 2>&1; then
        log_test "PASS" "Metadata server is accessible"
        
        # Get instance info
        INSTANCE_NAME=$(curl -s -H "Metadata-Flavor: Google" \
            "http://metadata.google.internal/computeMetadata/v1/instance/name" 2>/dev/null || echo "N/A")
        ZONE=$(curl -s -H "Metadata-Flavor: Google" \
            "http://metadata.google.internal/computeMetadata/v1/instance/zone" 2>/dev/null | \
            awk -F'/' '{print $NF}' || echo "N/A")
        PROJECT_ID=$(curl -s -H "Metadata-Flavor: Google" \
            "http://metadata.google.internal/computeMetadata/v1/project/project-id" 2>/dev/null || echo "N/A")
        
        log_test "INFO" "  Instance: $INSTANCE_NAME"
        log_test "INFO" "  Zone: $ZONE"
        log_test "INFO" "  Project: $PROJECT_ID"
        
        return 0
    else
        log_test "FAIL" "Metadata server is not accessible"
        return 1
    fi
}

# Test token retrieval
test_token_retrieval() {
    log_test "INFO" "Testing access token retrieval..."
    
    TOKEN_RESPONSE=$(curl -s -H "Metadata-Flavor: Google" \
        "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token" 2>/dev/null)
    
    if echo "$TOKEN_RESPONSE" | grep -q "access_token"; then
        TOKEN=$(echo "$TOKEN_RESPONSE" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
        EXPIRES_IN=$(echo "$TOKEN_RESPONSE" | grep -o '"expires_in":[0-9]*' | cut -d':' -f2)
        
        if [ -n "$TOKEN" ] && [ -n "$EXPIRES_IN" ]; then
            log_test "PASS" "Access token retrieved successfully (expires in ${EXPIRES_IN}s)"
            return 0
        else
            log_test "FAIL" "Failed to parse token response"
            return 1
        fi
    else
        log_test "FAIL" "Failed to retrieve access token"
        return 1
    fi
}

# Test gcloud authentication
test_gcloud_auth() {
    log_test "INFO" "Testing gcloud authentication..."
    
    if command -v gcloud > /dev/null 2>&1; then
        AUTH_LIST=$(gcloud auth list 2>/dev/null || echo "")
        
        if echo "$AUTH_LIST" | grep -q "ACTIVE"; then
            ACTIVE_ACCOUNT=$(echo "$AUTH_LIST" | grep "ACTIVE" | head -1 | awk '{print $2}')
            log_test "PASS" "gcloud is authenticated (Account: $ACTIVE_ACCOUNT)"
            return 0
        else
            log_test "WARN" "gcloud is not authenticated"
            return 1
        fi
    else
        log_test "WARN" "gcloud command not found"
        return 1
    fi
}

# Test project access
test_project_access() {
    log_test "INFO" "Testing project access..."
    
    PROJECT_ID=$(gcloud config get-value project 2>/dev/null || echo "")
    
    if [ -n "$PROJECT_ID" ] && [ "$PROJECT_ID" != "" ]; then
        log_test "PASS" "Project is configured: $PROJECT_ID"
        
        # Test project info retrieval
        if gcloud projects describe "$PROJECT_ID" > /dev/null 2>&1; then
            log_test "PASS" "Project access verified"
            return 0
        else
            log_test "WARN" "Project configured but access may be limited"
            return 1
        fi
    else
        log_test "FAIL" "No project configured"
        return 1
    fi
}

# Test compute API access
test_compute_api() {
    log_test "INFO" "Testing Compute Engine API access..."
    
    if gcloud compute instances list --limit=1 > /dev/null 2>&1; then
        INSTANCE_COUNT=$(gcloud compute instances list --format="value(name)" 2>/dev/null | wc -l)
        log_test "PASS" "Compute Engine API is accessible (Found $INSTANCE_COUNT instances)"
        return 0
    else
        ERROR_MSG=$(gcloud compute instances list --limit=1 2>&1 | head -1)
        log_test "WARN" "Compute Engine API access issue: $ERROR_MSG"
        return 1
    fi
}

# Test storage API access
test_storage_api() {
    log_test "INFO" "Testing Cloud Storage API access..."
    
    if gcloud storage buckets list --limit=1 > /dev/null 2>&1; then
        BUCKET_COUNT=$(gcloud storage buckets list --format="value(name)" 2>/dev/null | wc -l)
        log_test "PASS" "Cloud Storage API is accessible (Found $BUCKET_COUNT buckets)"
        return 0
    else
        log_test "WARN" "Cloud Storage API may not be enabled or accessible"
        return 1
    fi
}

# Test network connectivity
test_network_connectivity() {
    log_test "INFO" "Testing network connectivity..."
    
    # Test external connectivity
    if curl -s -f --max-time 5 "https://www.google.com" > /dev/null 2>&1; then
        log_test "PASS" "External network connectivity working"
    else
        log_test "FAIL" "External network connectivity failed"
        return 1
    fi
    
    # Test DNS resolution
    if nslookup google.com > /dev/null 2>&1 || host google.com > /dev/null 2>&1; then
        log_test "PASS" "DNS resolution working"
    else
        log_test "WARN" "DNS resolution may have issues"
    fi
    
    return 0
}

# Test session persistence
test_session_persistence() {
    log_test "INFO" "Testing session persistence..."
    
    # Check if keep-alive is running
    if pgrep -f "keep-alive.sh" > /dev/null; then
        log_test "PASS" "Keep-alive service is running"
    else
        log_test "WARN" "Keep-alive service is not running"
    fi
    
    # Check session tracking
    if [ -n "$AZALEA_SESSION_START" ]; then
        UPTIME=$(( $(date +%s) - $AZALEA_SESSION_START ))
        HOURS=$(( UPTIME / 3600 ))
        log_test "INFO" "Session has been active for ${HOURS} hours"
    else
        log_test "WARN" "Session tracking not initialized"
    fi
    
    return 0
}

# Run all tests
run_all_tests() {
    echo ""
    echo "=========================================="
    echo "Infrastructure Test Suite"
    echo "Started: $(date)"
    echo "=========================================="
    echo ""
    
    # Reset counters
    PASSED=0
    FAILED=0
    WARNINGS=0
    
    # Run tests
    test_metadata_server
    test_token_retrieval
    test_gcloud_auth
    test_project_access
    test_compute_api
    test_storage_api
    test_network_connectivity
    test_session_persistence
    
    # Summary
    echo ""
    echo "=========================================="
    echo "Test Summary"
    echo "=========================================="
    echo -e "${GREEN}Passed:${NC} $PASSED"
    echo -e "${RED}Failed:${NC} $FAILED"
    echo -e "${YELLOW}Warnings:${NC} $WARNINGS"
    echo ""
    echo "Full log: $TEST_LOG"
    echo "=========================================="
    echo ""
    
    # Return exit code based on failures
    if [ $FAILED -gt 0 ]; then
        return 1
    else
        return 0
    fi
}

# Main
case "${1:-all}" in
    all)
        run_all_tests
        ;;
    metadata)
        test_metadata_server
        ;;
    token)
        test_token_retrieval
        ;;
    gcloud)
        test_gcloud_auth
        ;;
    project)
        test_project_access
        ;;
    compute)
        test_compute_api
        ;;
    storage)
        test_storage_api
        ;;
    network)
        test_network_connectivity
        ;;
    session)
        test_session_persistence
        ;;
    *)
        echo "Usage: $0 [test_name]"
        echo ""
        echo "Available tests:"
        echo "  all       - Run all tests (default)"
        echo "  metadata  - Test metadata server"
        echo "  token     - Test token retrieval"
        echo "  gcloud    - Test gcloud auth"
        echo "  project   - Test project access"
        echo "  compute   - Test compute API"
        echo "  storage   - Test storage API"
        echo "  network   - Test network connectivity"
        echo "  session   - Test session persistence"
        exit 1
        ;;
esac

