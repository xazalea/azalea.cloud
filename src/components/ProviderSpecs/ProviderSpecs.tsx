import React from 'react';
import { useProvider } from '../../context/ProviderContext';
import { useTheme } from '../../theme/theme';

export const ProviderSpecs: React.FC = () => {
  const { currentProvider, providers } = useProvider();
  const { theme } = useTheme();
  const provider = providers[currentProvider];

  if (!provider.specs) {
    return null;
  }

  const specs = provider.specs;

  return (
    <div
      style={{
        padding: '12px 16px',
        backgroundColor: theme.surfaceVariant,
        borderRadius: '8px',
        border: `1px solid ${theme.border}`,
        marginBottom: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span className="material-icons" style={{ fontSize: '18px', color: theme.accent }}>
          speed
        </span>
        <span style={{ fontSize: '14px', fontWeight: 600, color: theme.text }}>
          {provider.name} Specifications
        </span>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px',
        }}
      >
        {specs.cpu && (
          <div>
            <div style={{ fontSize: '11px', color: theme.textSecondary, marginBottom: '4px' }}>
              CPU
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: theme.text }}>{specs.cpu}</div>
          </div>
        )}
        {specs.ram && (
          <div>
            <div style={{ fontSize: '11px', color: theme.textSecondary, marginBottom: '4px' }}>
              RAM
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: theme.text }}>{specs.ram}</div>
          </div>
        )}
        {specs.gpu && (
          <div>
            <div style={{ fontSize: '11px', color: theme.textSecondary, marginBottom: '4px' }}>
              GPU
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: theme.text }}>{specs.gpu}</div>
          </div>
        )}
        {specs.storage && (
          <div>
            <div style={{ fontSize: '11px', color: theme.textSecondary, marginBottom: '4px' }}>
              Storage
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: theme.text }}>
              {specs.storage}
            </div>
          </div>
        )}
        {specs.network && (
          <div>
            <div style={{ fontSize: '11px', color: theme.textSecondary, marginBottom: '4px' }}>
              Network
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: theme.text }}>
              {specs.network}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

