/**
 * WebVM Integration Utilities
 * Helper functions for integrating WebVM submodule
 */

export interface WebVMConfig {
  IMAGE_URL: string;
  IMAGE_TYPE: 'cloud' | 'bytes';
  CMD: string[];
  ARGS: string[];
  ENV: Record<string, string>;
  CWD: string;
  SSHX_SESSION?: string;
}

/**
 * Creates a WebVM configuration object
 */
export function createWebVMConfig(
  imageUrl: string,
  options: Partial<WebVMConfig> = {}
): WebVMConfig {
  return {
    IMAGE_URL: imageUrl,
    IMAGE_TYPE: 'cloud',
    CMD: ['/bin/bash'],
    ARGS: [],
    ENV: {
      HOME: '/home/user',
      TERM: 'xterm',
      USER: 'user',
      SHELL: '/bin/bash',
      EDITOR: 'vim',
      LANG: 'en_US.UTF-8',
      LC_ALL: 'C',
    },
    CWD: '/home/user',
    ...options,
  };
}

/**
 * Builds a WebVM URL with configuration
 */
export function buildWebVMUrl(config: WebVMConfig): string {
  const baseUrl = 'https://webvm.io/';
  const params = new URLSearchParams();

  if (config.SSHX_SESSION) {
    return `${baseUrl}#sshx=${encodeURIComponent(config.SSHX_SESSION)}`;
  }

  // Add other config parameters if needed
  if (config.CMD.length > 0) {
    params.set('cmd', config.CMD.join(' '));
  }

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Default WebVM disk images
 */
export const WEBVM_IMAGES = {
  DEBIAN_MINI: 'https://disks.webvm.io/debian_mini_20230519_5022088024.ext2',
  DEBIAN_LARGE: 'https://disks.webvm.io/debian_large_20230522_5044875331.ext2',
} as const;

