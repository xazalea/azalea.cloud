/**
 * Provider Types
 */

export type ProviderType = 'azalea-cloud' | 'azalea-sshx' | 'azalea-local';

export interface Provider {
  id: ProviderType;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
}

export const PROVIDERS: Record<ProviderType, Provider> = {
  'azalea-cloud': {
    id: 'azalea-cloud',
    name: 'AzaleaCloud',
    description: 'Cloud shell with unlimited access',
    icon: 'cloud',
    enabled: true,
  },
  'azalea-sshx': {
    id: 'azalea-sshx',
    name: 'AzaleaSSHX',
    description: 'WebVM with sshx.io integration',
    icon: 'terminal',
    enabled: true,
  },
  'azalea-local': {
    id: 'azalea-local',
    name: 'AzaleaLocal',
    description: 'Standalone WebVM (no external services)',
    icon: 'computer',
    enabled: true,
  },
};

