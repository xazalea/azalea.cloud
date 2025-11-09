/**
 * Provider Types
 */

export type ProviderType = 'azalea-cloud' | 'azalea-sshx' | 'azalea-local' | 'azalea-super' | 'azalea-ultra';

export interface Provider {
  id: ProviderType;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  specs?: {
    cpu?: string;
    ram?: string;
    gpu?: string;
    storage?: string;
    network?: string;
  };
}

export const PROVIDERS: Record<ProviderType, Provider> = {
  'azalea-cloud': {
    id: 'azalea-cloud',
    name: 'AzaleaCloud',
    description: 'Cloud shell with unlimited access',
    icon: 'cloud',
    enabled: true,
    specs: {
      cpu: '4 vCPU Cores',
      ram: '16 GB RAM',
      gpu: 'NVIDIA T4 (Optional)',
      storage: '100 GB SSD',
      network: '10 Gbps',
    },
  },
  'azalea-sshx': {
    id: 'azalea-sshx',
    name: 'AzaleaSSHX',
    description: 'WebVM with sshx.io integration',
    icon: 'terminal',
    enabled: true,
    specs: {
      cpu: '2 vCPU Cores',
      ram: '8 GB RAM',
      storage: '50 GB SSD',
      network: '1 Gbps',
    },
  },
  'azalea-local': {
    id: 'azalea-local',
    name: 'AzaleaLocal',
    description: 'Standalone WebVM (no external services)',
    icon: 'computer',
    enabled: true,
    specs: {
      cpu: '2 vCPU Cores',
      ram: '4 GB RAM',
      storage: '20 GB Virtual',
    },
  },
  'azalea-super': {
    id: 'azalea-super',
    name: 'AzaleaSuper',
    description: 'Dual-instance combined power (2x AzaleaCloud)',
    icon: 'bolt',
    enabled: true,
    specs: {
      cpu: '8 vCPU Cores (2x4)',
      ram: '32 GB RAM (2x16)',
      gpu: 'Dual NVIDIA T4 (Combined)',
      storage: '200 GB SSD (2x100)',
      network: '20 Gbps (2x10)',
    },
  },
  'azalea-ultra': {
    id: 'azalea-ultra',
    name: 'AzaleaUltra',
    description: 'Triple-instance + WebVM combined power (3x AzaleaCloud + WebVM)',
    icon: 'rocket_launch',
    enabled: true,
    specs: {
      cpu: '14 vCPU Cores (3x4 + 2)',
      ram: '52 GB RAM (3x16 + 4)',
      gpu: 'Triple NVIDIA T4 + WebVM GPU',
      storage: '320 GB SSD (3x100 + 20)',
      network: '31 Gbps (3x10 + 1)',
    },
  },
};

