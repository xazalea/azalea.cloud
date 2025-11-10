import React from 'react';
import { useTheme } from '../../theme/theme';
import { CloudShellLayout } from '../CloudShell/CloudShellLayout';

/**
 * AzaleaSuper - Combined power from all providers
 * Combines AzaleaCloud, AzaleaSSHX, and AzaleaLocal into one unified terminal
 */
export const SuperProvider: React.FC = () => {
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
      {/* Super Mode Header */}
      <div
        style={{
          padding: '16px 24px',
          backgroundColor: theme.surfaceVariant,
          borderBottom: `1px solid ${theme.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <span className="material-icons" style={{ fontSize: '24px', color: theme.accent }}>
            bolt
          </span>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: theme.text }}>
              AzaleaSuper Mode
            </div>
            <div style={{ fontSize: '13px', color: theme.textSecondary }}>
              Combined Power: Cloud + SSHX + Local • 8 vCPU • 32 GB RAM • Dual GPU
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: '12px',
            padding: '6px 12px',
            backgroundColor: theme.accent + '20',
            color: theme.accent,
            borderRadius: '20px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: theme.success,
            }}
          />
          ACTIVE
        </div>
      </div>

      {/* Unified Terminal - All providers combined */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <CloudShellLayout
          onDesktopClick={undefined}
          desktopLoading={false}
        />
      </div>
    </div>
  );
};
