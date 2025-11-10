import React from 'react';
import { useTheme } from '../../theme/theme';
import { useProvider } from '../../context/ProviderContext';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const { theme } = useTheme();
  const { setProvider } = useProvider();

  const handleGetStarted = () => {
    setProvider('azalea-cloud');
    onGetStarted();
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.surface} 0%, ${theme.surfaceVariant} 100%)`,
        padding: '40px',
        overflow: 'auto',
      }}
    >
      {/* Minimal Hero Section */}
      <div
        style={{
          maxWidth: '800px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(56px, 10vw, 120px)',
            fontWeight: 700,
            color: theme.text,
            marginBottom: '24px',
            lineHeight: 1.1,
            letterSpacing: '-2px',
          }}
        >
          AzaleaCloud
        </h1>
        <p
          style={{
            fontSize: 'clamp(20px, 3vw, 28px)',
            color: theme.textSecondary,
            marginBottom: '48px',
            lineHeight: 1.6,
            fontWeight: 300,
          }}
        >
          Free cloud computing.
          <br />
          Automatic authentication.
          <br />
          No setup required.
        </p>
        <button
          onClick={handleGetStarted}
          style={{
            padding: '18px 48px',
            fontSize: '18px',
            fontWeight: 600,
            backgroundColor: theme.accent,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: `0 4px 16px ${theme.accent}30`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 8px 24px ${theme.accent}50`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 4px 16px ${theme.accent}30`;
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
