import React from 'react';
import { useTheme } from '../../theme/theme';

interface TerminalControlsProps {
  onDesktopClick: () => void;
  showDesktop?: boolean;
  loading?: boolean;
}

/**
 * Terminal Controls Component
 * Shows action buttons for the terminal
 */
export const TerminalControls: React.FC<TerminalControlsProps> = ({ 
  onDesktopClick, 
  showDesktop = true,
  loading = false,
}) => {
  const { theme } = useTheme();

  if (!showDesktop) {
    return null;
  }

  return (
    <div
      style={{
        padding: '12px 20px',
        backgroundColor: theme.surfaceVariant,
        borderBottom: `1px solid ${theme.border}`,
        borderRadius: '12px 12px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '12px',
      }}
    >
      <button
        onClick={onDesktopClick}
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? theme.textSecondary : theme.accent,
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'wait' : 'pointer',
          fontSize: '14px',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.2s ease',
          opacity: loading ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = `0 4px 12px ${theme.accent}40`;
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }
        }}
      >
        {loading ? (
          <>
            <span 
              className="material-icons" 
              style={{ 
                fontSize: '18px', 
                animation: 'spin 1s linear infinite',
                display: 'inline-block',
              }}
            >
              refresh
            </span>
            Setting up...
          </>
        ) : (
          <>
            <span className="material-icons" style={{ fontSize: '18px' }}>
              desktop_windows
            </span>
            Desktop
          </>
        )}
      </button>
    </div>
  );
};

