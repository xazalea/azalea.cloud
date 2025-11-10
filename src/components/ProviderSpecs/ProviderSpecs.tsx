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
        padding: '20px 24px',
        backgroundColor: theme.surfaceVariant,
        borderRadius: '16px',
        border: `1px solid ${theme.border}`,
        marginBottom: '24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span className="material-icons" style={{ fontSize: '20px', color: theme.accent }}>
          speed
        </span>
        <span style={{ fontSize: '16px', fontWeight: 600, color: theme.text }}>
          {provider.name} Specifications
        </span>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
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

