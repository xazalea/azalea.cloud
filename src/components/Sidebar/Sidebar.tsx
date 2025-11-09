import React from 'react';
import { useTheme } from '../../theme/theme';

interface SidebarProps {
  onTabChange?: (tab: string) => void;
  activeTab?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onTabChange, activeTab = 'terminal' }) => {
  const { theme } = useTheme();

  const tabs = [
    { id: 'terminal', label: 'Terminal', icon: 'terminal' },
    { id: 'accounts', label: 'Accounts', icon: 'account_circle' },
    { id: 'files', label: 'Files', icon: 'folder' },
    { id: 'auth', label: 'Auth Keys', icon: 'vpn_key' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <aside
      style={{
        width: '240px',
        backgroundColor: theme.surface,
        borderRight: `1px solid ${theme.border}`,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: isActive ? theme.surfaceVariant : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              color: isActive ? theme.accent : theme.text,
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
    </aside>
  );
};

