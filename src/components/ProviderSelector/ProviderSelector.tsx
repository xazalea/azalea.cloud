import React from 'react';
import { useProvider } from '../../context/ProviderContext';
import { useTheme } from '../../theme/theme';
import { ProviderType } from '../../types/providers';

export const ProviderSelector: React.FC = () => {
  const { currentProvider, setProvider, providers } = useProvider();
  const { theme } = useTheme();

  const handleProviderChange = (provider: ProviderType) => {
    setProvider(provider);
  };

  return (
    <div
      style={{
        padding: '16px 20px',
        backgroundColor: theme.surfaceVariant,
        borderRadius: '12px',
        marginBottom: '24px',
        border: `1px solid ${theme.border}`,
      }}
    >
      <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: theme.text }}>
          Provider
        </div>
        {currentProvider === 'azalea-super' && (
          <div
            style={{
              fontSize: '11px',
              padding: '4px 8px',
              backgroundColor: theme.accent + '20',
              color: theme.accent,
              borderRadius: '4px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span className="material-icons" style={{ fontSize: '14px' }}>
              bolt
            </span>
            SUPER MODE
          </div>
        )}
        {currentProvider === 'azalea-ultra' && (
          <div
            style={{
              fontSize: '11px',
              padding: '4px 8px',
              backgroundColor: theme.accent + '20',
              color: theme.accent,
              borderRadius: '4px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span className="material-icons" style={{ fontSize: '14px' }}>
              rocket_launch
            </span>
            ULTRA MODE
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {Object.values(providers).map((provider) => {
          const isActive = currentProvider === provider.id;
          return (
            <button
              key={provider.id}
              onClick={() => handleProviderChange(provider.id)}
              style={{
                width: '100%',
                padding: '8px 12px',
                backgroundColor: isActive ? theme.accent : theme.surface,
                border: `1px solid ${isActive ? theme.accent : theme.border}`,
                borderRadius: '8px',
                cursor: 'pointer',
                color: isActive ? '#FFFFFF' : theme.text,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s ease',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = theme.surfaceVariant;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = theme.surface;
                }
              }}
            >
              <span className="material-icons" style={{ fontSize: '16px' }}>
                {provider.icon}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: isActive ? 600 : 500, fontSize: '12px' }}>{provider.name}</div>
              </div>
              {isActive && (
                <span className="material-icons" style={{ fontSize: '14px' }}>
                  check_circle
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

