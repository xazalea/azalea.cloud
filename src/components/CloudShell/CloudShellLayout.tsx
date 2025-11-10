import React from 'react';
import { useTheme } from '../../theme/theme';
import { RealCloudShell } from './RealCloudShell';

interface CloudShellLayoutProps {
  onDesktopClick?: () => void;
  desktopLoading?: boolean;
}

/**
 * Cloud Shell Layout - Uses Real Google Cloud Shell
 * Automatically authenticates in the background using metadata server
 */
export const CloudShellLayout: React.FC<CloudShellLayoutProps> = ({ 
  onDesktopClick, 
  desktopLoading 
}) => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.surface,
      }}
    >
      {/* Real Google Cloud Shell with automatic authentication */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <RealCloudShell
          onDesktopClick={onDesktopClick}
          desktopLoading={desktopLoading}
        />
      </div>
    </div>
  );
};
