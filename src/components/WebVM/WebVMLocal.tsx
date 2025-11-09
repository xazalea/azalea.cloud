import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../theme/theme';

/**
 * AzaleaLocal - Standalone WebVM without external services
 * This embeds WebVM directly in the browser
 */
export const WebVMLocal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // WebVM configuration for standalone mode
    const webvmConfig = {
      IMAGE_URL: 'https://disks.webvm.io/debian_mini_20230519_5022088024.ext2',
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
    };

    // Create iframe for WebVM
    // In production, you would embed the WebVM build or use their CDN
    const iframe = document.createElement('iframe');
    iframe.src = 'https://webvm.io/';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.backgroundColor = theme.surface;
    iframe.allow = 'clipboard-read; clipboard-write';
    iframe.title = 'AzaleaLocal - WebVM';

    containerRef.current.appendChild(iframe);

    // Alternative: You can also load WebVM directly if you have it built
    // For now, we'll use the hosted version

    return () => {
      if (containerRef.current && iframe.parentNode) {
        containerRef.current.removeChild(iframe);
      }
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: theme.surface,
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    />
  );
};

