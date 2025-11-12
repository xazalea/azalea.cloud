/**
 * Provider Types
 */

export type ProviderType = 'azalea-cloud' | 'azalea-local' | 'azalea-coolvm';

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
  'azalea-coolvm': {
    id: 'azalea-coolvm',
    name: 'CoolVM',
    description: 'Lazily evaluated, side-effect-free virtual machine',
    icon: 'memory',
    enabled: true,
    specs: {
      cpu: 'Functional CPU',
      ram: 'Lazy Memory',
      storage: 'Immutable Storage',
    },
  },
};

