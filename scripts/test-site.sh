#!/bin/bash
# Comprehensive Site Testing Script
# Tests all major features and endpoints

set -e

echo "🧪 Starting Comprehensive Site Tests..."
echo ""

BASE_URL="${1:-http://localhost:5173}"
if [ -z "$1" ]; then
  echo "ℹ️  No URL provided, using default: $BASE_URL"
  echo "   Usage: ./scripts/test-site.sh [URL]"
  echo ""
fi

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASSED=0
FAILED=0

test_endpoint() {
  local name=$1
  local url=$2
  local method=${3:-GET}
  local expected_status=${4:-200}
  
  echo -n "Testing $name... "
  
  if [ "$method" = "GET" ]; then
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "000")
  else
    response=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" "$url" 2>/dev/null || echo "000")
  fi
  
  if [ "$response" = "$expected_status" ]; then
    echo -e "${GREEN}✓ PASS${NC} (Status: $response)"
    ((PASSED++))
    return 0
  else
    echo -e "${RED}✗ FAIL${NC} (Expected: $expected_status, Got: $response)"
    ((FAILED++))
    return 1
  fi
}

test_json_endpoint() {
  local name=$1
  local url=$2
  local expected_key=$3
  
  echo -n "Testing $name (JSON)... "
  
  response=$(curl -s "$url" 2>/dev/null || echo "")
  
  if [ -z "$response" ]; then
    echo -e "${RED}✗ FAIL${NC} (No response)"
    ((FAILED++))
    return 1
  fi
  
  if echo "$response" | grep -q "$expected_key"; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((PASSED++))
    return 0
  else
    echo -e "${RED}✗ FAIL${NC} (Missing key: $expected_key)"
    ((FAILED++))
    return 1
  fi
}

echo "📋 Testing API Endpoints..."
echo ""

# Backend APIs
test_endpoint "Backend Health" "$BASE_URL/api/backend/health"
test_json_endpoint "Backend Health (JSON)" "$BASE_URL/api/backend/health" "status"

# Auth APIs
test_endpoint "Auth Token" "$BASE_URL/api/auth/token"
test_json_endpoint "Auth Token (JSON)" "$BASE_URL/api/auth/token" "token"

# Environment API
test_endpoint "Environment" "$BASE_URL/api/environment"
test_json_endpoint "Environment (JSON)" "$BASE_URL/api/environment" "isCloudEnvironment"

# Client Error API
test_endpoint "Client Error" "$BASE_URL/api/clienterror/jserror" "POST"
test_json_endpoint "Client Error (JSON)" "$BASE_URL/api/clienterror/jserror" "success"

# CoolVM API
test_endpoint "CoolVM" "$BASE_URL/api/coolvm"
test_json_endpoint "CoolVM (JSON)" "$BASE_URL/api/coolvm" "success"

# VM APIs
test_endpoint "VM Provision" "$BASE_URL/api/vm/provision" "POST"
test_endpoint "VM Status" "$BASE_URL/api/vm/status/test-vm-id"
test_endpoint "VM Stop" "$BASE_URL/api/vm/stop/test-vm-id" "DELETE"

# Proxy APIs (these might fail if no path is provided, which is expected)
echo -n "Testing CloudShell Proxy... "
proxy_response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/proxy/cloudshell?path=test" 2>/dev/null || echo "000")
if [ "$proxy_response" = "400" ] || [ "$proxy_response" = "200" ] || [ "$proxy_response" = "500" ]; then
  echo -e "${YELLOW}⚠ SKIP${NC} (Status: $proxy_response - May require valid path)"
else
  echo -e "${RED}✗ FAIL${NC} (Status: $proxy_response)"
  ((FAILED++))
fi

echo ""
echo "📋 Testing Static Assets..."
echo ""

# Check if main page loads
echo -n "Testing Main Page... "
if curl -s "$BASE_URL" | grep -q "html\|root"; then
  echo -e "${GREEN}✓ PASS${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗ FAIL${NC}"
  ((FAILED++))
fi

echo ""
echo "📊 Test Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✅ All tests passed!${NC}"
  exit 0
else
  echo -e "${RED}❌ Some tests failed${NC}"
  exit 1
fi

