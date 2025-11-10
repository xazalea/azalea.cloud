import React from 'react';
import { useTheme } from '../../theme/theme';
import './Header.css';

export const Header: React.FC = () => {
  const { mode, toggleMode, theme } = useTheme();

  return (
    <header
      style={{
        backgroundColor: theme.surface,
        borderBottom: `1px solid ${theme.border}`,
        padding: '20px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: `0 2px 8px ${theme.border}20`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            fontSize: '24px',
            fontWeight: 700,
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          AzaleaCloud
        </div>
        <div
          style={{
            fontSize: '12px',
            color: theme.textSecondary,
            padding: '4px 8px',
            backgroundColor: theme.surfaceVariant,
            borderRadius: '4px',
          }}
        >
          Free Cloud Computing
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => {
            if (window.confirm('Return to landing page?')) {
              localStorage.removeItem('azalea-visited');
              window.location.reload();
            }
          }}
          style={{
            backgroundColor: 'transparent',
            border: `1px solid ${theme.border}`,
            borderRadius: '8px',
            padding: '8px 16px',
            cursor: 'pointer',
            color: theme.textSecondary,
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.surfaceVariant;
            e.currentTarget.style.color = theme.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = theme.textSecondary;
          }}
        >
          <span className="material-icons" style={{ fontSize: '16px' }}>
            home
          </span>
          Home
        </button>
        <div
          style={{
            fontSize: '12px',
            color: theme.textSecondary,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span className="material-icons" style={{ fontSize: '16px' }}>
            account_circle
          </span>
          azalea.compute@gmail.com
        </div>

        <button
          onClick={toggleMode}
          style={{
            backgroundColor: 'transparent',
            border: `1px solid ${theme.border}`,
            borderRadius: '6px',
            padding: '8px 12px',
            cursor: 'pointer',
            color: theme.text,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.surfaceVariant;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <span className="material-icons" style={{ fontSize: '18px' }}>
            {mode === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
          {mode === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </header>
  );
};

