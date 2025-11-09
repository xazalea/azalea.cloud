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
        padding: '16px',
        backgroundColor: theme.surfaceVariant,
        borderRadius: '8px',
        marginBottom: '16px',
        border: `1px solid ${theme.border}`,
      }}
    >
      <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: theme.text }}>
        Select Provider
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {Object.values(providers).map((provider) => {
          const isActive = currentProvider === provider.id;
          return (
            <button
              key={provider.id}
              onClick={() => handleProviderChange(provider.id)}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: isActive ? theme.accent : theme.surface,
                border: `1px solid ${isActive ? theme.accent : theme.border}`,
                borderRadius: '6px',
                cursor: 'pointer',
                color: isActive ? '#FFFFFF' : theme.text,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '14px',
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
              <span className="material-icons" style={{ fontSize: '20px' }}>
                {provider.icon}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: isActive ? 600 : 500 }}>{provider.name}</div>
                <div
                  style={{
                    fontSize: '12px',
                    opacity: 0.8,
                    marginTop: '2px',
                  }}
                >
                  {provider.description}
                </div>
              </div>
              {isActive && (
                <span className="material-icons" style={{ fontSize: '18px' }}>
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

