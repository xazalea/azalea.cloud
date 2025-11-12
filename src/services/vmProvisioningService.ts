/**
 * VM Provisioning Service
 * Integrates with SpinUp VM for on-demand Linux distribution provisioning
 * Based on https://github.com/Bas3line/spinupavm
 */

export interface LinuxDistribution {
  id: string;
  name: string;
  version: string;
  description: string;
  downloadUrl: string;
  size: number; // in MB
  architecture: 'x86_64' | 'aarch64';
}

export interface VMProvisionRequest {
  distribution: string; // Distribution ID
  memory?: number; // Memory in MB (default: 1024)
  diskSize?: number; // Disk size in GB (default: 10)
  cpuCores?: number; // CPU cores (default: 2)
}

export interface VMProvisionResult {
  success: boolean;
  vmId?: string;
  status?: 'provisioning' | 'ready' | 'error';
  vncUrl?: string;
  sshUrl?: string;
  error?: string;
}

export class VMProvisioningService {
  private static instance: VMProvisioningService;
  private activeVMs: Map<string, VMProvisionResult> = new Map();

  // Supported Linux distributions
  private distributions: LinuxDistribution[] = [
    {
      id: 'ubuntu-22.04',
      name: 'Ubuntu',
      version: '22.04 LTS',
      description: 'Ubuntu 22.04 LTS (Jammy Jellyfish)',
      downloadUrl: 'https://releases.ubuntu.com/22.04/ubuntu-22.04.3-desktop-amd64.iso',
      size: 5600,
      architecture: 'x86_64',
    },
    {
      id: 'ubuntu-20.04',
      name: 'Ubuntu',
      version: '20.04 LTS',
      description: 'Ubuntu 20.04 LTS (Focal Fossa)',
      downloadUrl: 'https://releases.ubuntu.com/20.04/ubuntu-20.04.6-desktop-amd64.iso',
      size: 2900,
      architecture: 'x86_64',
    },
    {
      id: 'debian-12',
      name: 'Debian',
      version: '12 (Bookworm)',
      description: 'Debian 12 Bookworm',
      downloadUrl: 'https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/debian-12.5.0-amd64-netinst.iso',
      size: 650,
      architecture: 'x86_64',
    },
    {
      id: 'fedora-39',
      name: 'Fedora',
      version: '39',
      description: 'Fedora 39 Workstation',
      downloadUrl: 'https://download.fedoraproject.org/pub/fedora/linux/releases/39/Workstation/x86_64/iso/Fedora-Workstation-Live-x86_64-39-1.5.iso',
      size: 2400,
      architecture: 'x86_64',
    },
    {
      id: 'arch-linux',
      name: 'Arch Linux',
      version: 'Latest',
      description: 'Arch Linux (minimal)',
      downloadUrl: 'https://mirror.rackspace.com/archlinux/iso/latest/archlinux-x86_64.iso',
      size: 950,
      architecture: 'x86_64',
    },
    {
      id: 'alpine-latest',
      name: 'Alpine Linux',
      version: 'Latest',
      description: 'Alpine Linux (lightweight)',
      downloadUrl: 'https://dl-cdn.alpinelinux.org/alpine/v3.19/releases/x86_64/alpine-standard-3.19.1-x86_64.iso',
      size: 150,
      architecture: 'x86_64',
    },
  ];

  private constructor() {}

  static getInstance(): VMProvisioningService {
    if (!VMProvisioningService.instance) {
      VMProvisioningService.instance = new VMProvisioningService();
    }
    return VMProvisioningService.instance;
  }

  /**
   * Get available Linux distributions
   */
  getDistributions(): LinuxDistribution[] {
    return [...this.distributions];
  }

  /**
   * Get distribution by ID
   */
  getDistribution(id: string): LinuxDistribution | undefined {
    return this.distributions.find(d => d.id === id);
  }

  /**
   * Provision a new VM with specified Linux distribution
   */
  async provisionVM(request: VMProvisionRequest): Promise<VMProvisionResult> {
    const distribution = this.getDistribution(request.distribution);
    if (!distribution) {
      return {
        success: false,
        error: `Distribution '${request.distribution}' not found`,
      };
    }

    const vmId = `vm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Initialize VM status
    const result: VMProvisionResult = {
      success: true,
      vmId,
      status: 'provisioning',
    };
    
    this.activeVMs.set(vmId, result);

    try {
      // Call backend API to provision VM
      const response = await fetch('/api/vm/provision', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          distribution: distribution.id,
          downloadUrl: distribution.downloadUrl,
          memory: request.memory || 1024,
          diskSize: request.diskSize || 10,
          cpuCores: request.cpuCores || 2,
          architecture: distribution.architecture,
        }),
      });

      if (!response.ok) {
        throw new Error(`VM provisioning failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      result.status = data.status || 'ready';
      result.vncUrl = data.vncUrl;
      result.sshUrl = data.sshUrl;
      
      this.activeVMs.set(vmId, result);
      
      return result;
    } catch (error) {
      result.success = false;
      result.status = 'error';
      result.error = error instanceof Error ? error.message : 'Unknown error';
      this.activeVMs.set(vmId, result);
      return result;
    }
  }

  /**
   * Get VM status
   */
  async getVMStatus(vmId: string): Promise<VMProvisionResult | null> {
    try {
      const response = await fetch(`/api/vm/status/${vmId}`);
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to get VM status:', error);
      return null;
    }
  }

  /**
   * Stop/terminate a VM
   */
  async stopVM(vmId: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/vm/stop/${vmId}`, {
        method: 'POST',
      });
      if (response.ok) {
        this.activeVMs.delete(vmId);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to stop VM:', error);
      return false;
    }
  }

  /**
   * List active VMs
   */
  getActiveVMs(): VMProvisionResult[] {
    return Array.from(this.activeVMs.values());
  }
}

