import React from 'react';
import { useTheme } from '../../theme/theme';
import { useProvider } from '../../context/ProviderContext';
import { ProviderType } from '../../types/providers';

interface SidebarProps {
  onTabChange?: (tab: string) => void;
  activeTab?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onTabChange, activeTab = 'terminal' }) => {
  const { theme } = useTheme();
  const { currentProvider, setProvider, providers } = useProvider();

  const tabs = [
    { id: 'terminal', label: 'Terminal', icon: 'terminal' },
    { id: 'vm-provisioner', label: 'VM Provisioner', icon: 'dns' },
  ];

  const providerOrder: ProviderType[] = [
    'azalea-cloud',
    'azalea-sshx',
    'azalea-local',
    'azalea-super',
    'azalea-ultra',
  ];

  return (
    <aside
      style={{
        width: '280px',
        backgroundColor: theme.surface,
        borderRight: `1px solid ${theme.border}`,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      {/* Navigation Tabs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              style={{
                width: '100%',
                padding: '16px 20px',
                backgroundColor: isActive ? theme.surfaceVariant : 'transparent',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                color: isActive ? theme.accent : theme.text,
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                fontSize: '16px',
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
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span className="material-icons" style={{ fontSize: '20px' }}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Provider Switcher - Circle Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: theme.textSecondary, marginBottom: '8px' }}>
          Providers
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {providerOrder.map((providerId) => {
            const provider = providers[providerId];
            if (!provider || !provider.enabled) return null;
            
            const isActive = currentProvider === providerId;
            const isSuper = providerId === 'azalea-super';
            const isUltra = providerId === 'azalea-ultra';
            
            return (
              <button
                key={providerId}
                onClick={() => setProvider(providerId)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: isActive ? theme.accent : 'transparent',
                  border: `2px solid ${isActive ? theme.accent : theme.border}`,
                  borderRadius: '50px',
                  cursor: 'pointer',
                  color: isActive ? '#FFFFFF' : theme.text,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = theme.surfaceVariant;
                    e.currentTarget.style.borderColor = theme.accent;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = theme.border;
                  }
                }}
                title={provider.description}
              >
                {/* Circle Icon */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? '#FFFFFF' : theme.surfaceVariant,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: `2px solid ${isActive ? theme.accent : theme.border}`,
                  }}
                >
                  <span 
                    className="material-icons" 
                    style={{ 
                      fontSize: '20px',
                      color: isActive ? theme.accent : theme.text,
                    }}
                  >
                    {provider.icon}
                  </span>
                </div>
                
                {/* Provider Name */}
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: '14px', fontWeight: isActive ? 600 : 500 }}>
                    {provider.name}
                  </div>
                  {(isSuper || isUltra) && (
                    <div style={{ fontSize: '10px', opacity: 0.8, marginTop: '2px' }}>
                      {isSuper ? 'SUPER MODE' : 'ULTRA MODE'}
                    </div>
                  )}
                </div>
                
                {/* Active Indicator */}
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
    </aside>
  );
};
