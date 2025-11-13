# Site Testing Guide

## Overview
This document outlines comprehensive testing procedures for all parts of the AzaleaCloud site.

## Test Script
Run the automated test script:
```bash
npm run test:site [URL]
# Example: npm run test:site http://localhost:5173
# Or for production: npm run test:site https://azalea-cloud.vercel.app
```

## Manual Testing Checklist

### 1. Navigation & Sidebar
- [ ] **Terminal Tab**: Click and verify it shows terminal/cloud shell
- [ ] **VM Provisioner Tab**: Click and verify it shows VM provisioning interface
- [ ] **Provider Switcher**: 
  - [ ] AzaleaCloud provider works
  - [ ] AzaleaLocal (WebVM) provider works (if available)
  - [ ] CoolVM provider works
- [ ] **Tab Switching**: Switch between tabs and verify content changes

### 2. VM Provisioner (SpinUp VM)
- [ ] **UI Elements**:
  - [ ] Distribution dropdown is visible and functional
  - [ ] Memory input works (512-4096 MB)
  - [ ] Disk Size input works (5-100 GB)
  - [ ] CPU Cores input works (1-8 cores)
  - [ ] Provision button is visible and clickable
- [ ] **Functionality**:
  - [ ] Select a Linux distribution (Ubuntu, Debian, Fedora, Arch, Alpine)
  - [ ] Configure resources
  - [ ] Click "Provision VM" button
  - [ ] Verify provisioning status messages appear
  - [ ] Verify VM ID is generated
  - [ ] Verify VNC URL is provided (if VM becomes ready)

### 3. Cloud Shell (AzaleaCloud Provider)
- [ ] **Loading**:
  - [ ] Cloud Shell loads without errors
  - [ ] No infinite recursion errors in console
  - [ ] Terminal appears and is functional
- [ ] **Functionality**:
  - [ ] Can type commands
  - [ ] Commands execute properly
  - [ ] Output displays correctly

### 4. WebVM (AzaleaLocal Provider)
- [ ] **Availability Check**:
  - [ ] WebVM tab only shows if backend is available
  - [ ] Falls back gracefully if WebVM is not running
- [ ] **Functionality**:
  - [ ] WebVM interface loads
  - [ ] Can interact with WebVM features

### 5. CoolVM (Haskell VM)
- [ ] **Loading**:
  - [ ] CoolVM interface loads
  - [ ] Code editor is visible
- [ ] **Functionality**:
  - [ ] Can write code in editor
  - [ ] Execute button works
  - [ ] Output displays correctly

### 6. API Endpoints
Test all API endpoints:

#### Backend APIs
- [ ] `GET /api/backend/health` - Returns 200 with status
- [ ] `POST /api/backend/desktop/start` - Returns VM info

#### Auth APIs
- [ ] `GET /api/auth/token` - Returns token info
- [ ] `GET /api/environment` - Returns environment info

#### VM APIs
- [ ] `POST /api/vm/provision` - Creates VM
- [ ] `GET /api/vm/status/:vmId` - Gets VM status
- [ ] `DELETE /api/vm/stop/:vmId` - Stops VM

#### CoolVM APIs
- [ ] `GET /api/coolvm` - Returns VM info
- [ ] `POST /api/coolvm` - Executes VM program

#### Proxy APIs
- [ ] `GET /api/proxy/cloudshell?path=...` - Proxies Cloud Shell requests
- [ ] `GET /api/proxy/gstatic?path=...` - Proxies gstatic resources

#### Error Handling APIs
- [ ] `POST /api/clienterror/jserror` - Logs client errors

### 7. Error Handling
- [ ] **Network Errors**: 
  - [ ] Graceful handling when APIs are unavailable
  - [ ] Fallback to browser backend when WebVM is unavailable
- [ ] **404 Errors**: 
  - [ ] Proper error messages displayed
- [ ] **500 Errors**: 
  - [ ] Error messages don't crash the UI
  - [ ] Fallback mechanisms work

### 8. UI/UX
- [ ] **Responsive Design**:
  - [ ] Layout works on different screen sizes
  - [ ] Sidebar is accessible
  - [ ] Content is readable
- [ ] **Theme**:
  - [ ] Colors are consistent
  - [ ] Icons display correctly
  - [ ] Material Icons load properly
- [ ] **Interactions**:
  - [ ] Buttons have hover effects
  - [ ] Inputs have focus states
  - [ ] Transitions are smooth

### 9. Performance
- [ ] **Load Time**:
  - [ ] Initial page load is reasonable (< 3 seconds)
  - [ ] API responses are timely
- [ ] **Console Errors**:
  - [ ] No critical errors in console
  - [ ] Warnings are acceptable
- [ ] **Memory**:
  - [ ] No memory leaks
  - [ ] Page doesn't slow down over time

## Automated Testing
The test script (`scripts/test-site.sh`) automatically tests:
- All API endpoints
- Response status codes
- JSON response structure
- Static asset loading

## Reporting Issues
When reporting issues, include:
1. Browser and version
2. Console errors (if any)
3. Steps to reproduce
4. Expected vs actual behavior
5. Screenshots (if applicable)

