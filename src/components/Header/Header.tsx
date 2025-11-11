import React, { useState, useEffect } from 'react';
import { useTheme } from '../../theme/theme';
import './Header.css';

interface CommitInfo {
  hash: string;
  message: string;
}

export const Header: React.FC = () => {
  const { mode, toggleMode, theme } = useTheme();
  const [commitInfo, setCommitInfo] = useState<CommitInfo | null>(null);

  useEffect(() => {
    // Get commit info from Vite build-time injected environment variables
    // These are set in vite.config.ts from git or Vercel env vars
    const commitHash = import.meta.env.VITE_COMMIT_HASH || 'unknown';
    const commitMessage = import.meta.env.VITE_COMMIT_MESSAGE || 'No commit message';
    
    setCommitInfo({
      hash: commitHash,
      message: commitMessage.length > 50 ? commitMessage.substring(0, 50) + '...' : commitMessage,
    });
  }, []);

  return (
    <header
      style={{
        backgroundColor: theme.surface,
        borderBottom: `1px solid ${theme.border}`,
        padding: '24px 48px',
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {commitInfo && (
          <div
            style={{
              fontSize: '12px',
              color: theme.textSecondary,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'monospace',
              padding: '4px 12px',
              backgroundColor: theme.surfaceVariant,
              borderRadius: '4px',
            }}
            title={commitInfo.message}
          >
            <span style={{ color: theme.accent, fontWeight: 600 }}>
              {commitInfo.hash}
            </span>
            <span style={{ color: theme.textSecondary }}>
              {commitInfo.message}
            </span>
          </div>
        )}

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

