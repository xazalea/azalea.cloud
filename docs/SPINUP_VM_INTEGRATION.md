# SpinUp VM Integration

This document describes the integration of [SpinUp VM](https://github.com/Bas3line/spinupavm) into Azalea Cloud for on-demand Linux distribution provisioning.

## Overview

SpinUp VM is a privacy-focused virtual machine management platform that enables:
- **Online Linux Distribution Downloads**: Download and provision Linux distributions on-demand
- **Privacy-Focused**: Maintains anonymity and data privacy during downloads
- **Secure VM Provisioning**: Built with C++ and Go for performance and security

## Integration Benefits

1. **On-Demand Provisioning**: Users can select and provision any Linux distribution
2. **Privacy**: Downloads use privacy-focused methods
3. **Flexibility**: Support for multiple Linux distributions (Ubuntu, Debian, Fedora, Arch, Alpine)
4. **Customizable**: Users can configure memory, disk size, and CPU cores
5. **Browser-Based**: Full integration with Azalea Cloud's browser-based interface

## Architecture

```
Browser (Azalea Cloud UI)
    ↓
VM Provisioning Service (TypeScript)
    ↓
API Endpoints (/api/vm/*)
    ↓
SpinUp VM Service (C++/Go)
    ↓
QEMU/KVM or Docker
    ↓
Linux VM Instance
```

## Supported Distributions

- **Ubuntu 22.04 LTS** (Jammy Jellyfish) - 5.6 GB
- **Ubuntu 20.04 LTS** (Focal Fossa) - 2.9 GB
- **Debian 12** (Bookworm) - 650 MB
- **Fedora 39** Workstation - 2.4 GB
- **Arch Linux** (Latest) - 950 MB
- **Alpine Linux** (Latest) - 150 MB

## Components

### 1. VM Provisioning Service (`src/services/vmProvisioningService.ts`)

TypeScript service that:
- Manages available Linux distributions
- Handles VM provisioning requests
- Tracks VM status
- Provides VM management (start/stop)

### 2. VM Provisioner Component (`src/components/VMProvisioner/VMProvisioner.tsx`)

React component that provides:
- Distribution selection UI
- Resource configuration (memory, disk, CPU)
- Provisioning status display
- VNC console access

### 3. API Endpoints

- `POST /api/vm/provision` - Provision a new VM
- `GET /api/vm/status/[vmId]` - Get VM status
- `POST /api/vm/stop/[vmId]` - Stop a VM

## Usage

### In Azalea Cloud UI

1. Navigate to VM Provisioner tab
2. Select a Linux distribution
3. Configure resources (memory, disk, CPU)
4. Click "Provision VM"
5. Wait for provisioning to complete
6. Access VM via VNC console

### Programmatic Usage

```typescript
import { VMProvisioningService } from './services/vmProvisioningService';

const vmService = VMProvisioningService.getInstance();

// Get available distributions
const distributions = vmService.getDistributions();

// Provision a VM
const result = await vmService.provisionVM({
  distribution: 'ubuntu-22.04',
  memory: 2048,
  diskSize: 20,
  cpuCores: 2,
});

// Check status
const status = await vmService.getVMStatus(result.vmId!);

// Stop VM
await vmService.stopVM(result.vmId!);
```

## Integration with Existing Systems

### Desktop Service Integration

The VM Provisioning Service can work alongside the existing Desktop Service:
- **Desktop Service**: Pre-built Docker containers (fast, limited options)
- **VM Provisioning**: Custom Linux distributions (flexible, on-demand)

### Backend Integration

For full SpinUp VM integration, the backend would need:
1. **SpinUp VM Binary**: C++/Go compiled binary
2. **QEMU/KVM**: For native VM support (or Docker with VM capabilities)
3. **Storage**: For VM disk images
4. **Network**: For VNC/SSH access

## Implementation Status

### ✅ Completed
- VM Provisioning Service (TypeScript)
- VM Provisioner UI Component
- API endpoints structure
- Distribution catalog

### 🚧 In Progress
- Backend integration with SpinUp VM
- QEMU/KVM setup
- VNC console integration
- Storage management

### 📋 TODO
- Full SpinUp VM C++/Go service integration
- Privacy-focused download implementation
- VM lifecycle management
- Resource monitoring
- Snapshot support

## Privacy Features

SpinUp VM's privacy-focused approach includes:
- **Anonymous Downloads**: Downloads don't expose user identity
- **Data Privacy**: VM data is isolated and secure
- **No Tracking**: No telemetry or tracking during provisioning

## Resource Limits

Default limits (configurable):
- **Memory**: 512 MB - 4 GB
- **Disk Size**: 5 GB - 100 GB
- **CPU Cores**: 1 - 8 cores

## Next Steps

1. **Backend Service**: Integrate SpinUp VM C++/Go service
2. **QEMU Setup**: Configure QEMU/KVM for VM support
3. **Storage**: Implement disk image management
4. **Network**: Set up VNC/SSH access
5. **Testing**: Test with various Linux distributions

## References

- SpinUp VM Project: https://github.com/Bas3line/spinupavm
- QEMU Documentation: https://www.qemu.org/documentation/
- KVM Documentation: https://www.linux-kvm.org/page/Documents

