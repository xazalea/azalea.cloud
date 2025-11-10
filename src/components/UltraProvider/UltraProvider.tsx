import React from 'react';
import { useTheme } from '../../theme/theme';
import { CloudShellLayout } from '../CloudShell/CloudShellLayout';

/**
 * AzaleaUltra - Maximum combined power from all providers
 * Combines ALL providers (Cloud + SSHX + Local + Super) into one unified terminal
 */
export const UltraProvider: React.FC = () => {
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
      {/* Ultra Mode Header */}
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
            rocket_launch
          </span>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: theme.text }}>
              AzaleaUltra Mode
            </div>
            <div style={{ fontSize: '13px', color: theme.textSecondary }}>
              Maximum Power: All Providers Combined • 14 vCPU • 52 GB RAM • Triple GPU + WebVM GPU
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
          MAXIMUM POWER
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
