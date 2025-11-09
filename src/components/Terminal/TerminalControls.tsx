import React from 'react';
import { useTheme } from '../../theme/theme';

interface TerminalControlsProps {
  onDesktopClick: () => void;
  showDesktop?: boolean;
}

/**
 * Terminal Controls Component
 * Shows action buttons for the terminal
 */
export const TerminalControls: React.FC<TerminalControlsProps> = ({ 
  onDesktopClick, 
  showDesktop = true,
}) => {
  const { theme } = useTheme();

  if (!showDesktop) {
    return null;
  }

  return (
    <div
      style={{
        padding: '8px 16px',
        backgroundColor: theme.surfaceVariant,
        borderBottom: `1px solid ${theme.border}`,
        borderRadius: '8px 8px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '8px',
      }}
    >
      <button
        onClick={onDesktopClick}
        style={{
          padding: '6px 12px',
          backgroundColor: theme.accent,
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
      >
        <span className="material-icons" style={{ fontSize: '16px' }}>
          desktop_windows
        </span>
        Desktop
      </button>
    </div>
  );
};

