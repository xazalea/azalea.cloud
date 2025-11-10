import React from 'react';
import { useTheme } from '../../theme/theme';
import { useProvider } from '../../context/ProviderContext';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const { theme } = useTheme();
  const { setCurrentProvider } = useProvider();

  const handleGetStarted = () => {
    setCurrentProvider('azalea-cloud');
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
      {/* Hero Section */}
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          textAlign: 'center',
          marginBottom: '80px',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 700,
            background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.lavender || '#D9A69F'} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '24px',
            lineHeight: 1.2,
          }}
        >
          AzaleaCloud
        </h1>
        <p
          style={{
            fontSize: 'clamp(20px, 3vw, 32px)',
            color: theme.textSecondary,
            marginBottom: '48px',
            lineHeight: 1.6,
            maxWidth: '800px',
            margin: '0 auto 48px',
          }}
        >
          Free cloud computing with automatic authentication.
          No setup required. Just click and go.
        </p>
        <button
          onClick={handleGetStarted}
          style={{
            padding: '20px 48px',
            fontSize: '20px',
            fontWeight: 600,
            backgroundColor: theme.accent,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: `0 8px 24px ${theme.accent}40`,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 12px 32px ${theme.accent}60`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 8px 24px ${theme.accent}40`;
          }}
        >
          Get Started Free
        </button>
      </div>

      {/* Features Grid */}
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '80px',
        }}
      >
        {[
          {
            icon: '⚡',
            title: 'Instant Access',
            description: 'Automatically authenticated via metadata server. No login required.',
          },
          {
            icon: '🖥️',
            title: 'Full Desktop',
            description: 'Complete Ubuntu desktop environment with VNC access.',
          },
          {
            icon: '🔒',
            title: 'Secure',
            description: 'Built on Google Cloud infrastructure with enterprise security.',
          },
          {
            icon: '🚀',
            title: 'Fast',
            description: 'Optimized with database caching for lightning-fast performance.',
          },
          {
            icon: '🌐',
            title: 'Auto Tunnel',
            description: 'Automatic tunneling setup - no configuration needed.',
          },
          {
            icon: '💻',
            title: 'Terminal Access',
            description: 'Full terminal access with gcloud CLI pre-authenticated.',
          },
        ].map((feature, index) => (
          <div
            key={index}
            style={{
              padding: '32px',
              backgroundColor: theme.surfaceVariant,
              borderRadius: '16px',
              border: `1px solid ${theme.border}`,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 8px 24px ${theme.accent}20`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{feature.icon}</div>
            <h3
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: theme.text,
                marginBottom: '12px',
              }}
            >
              {feature.title}
            </h3>
            <p
              style={{
                fontSize: '16px',
                color: theme.textSecondary,
                lineHeight: 1.6,
              }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '48px',
          padding: '48px',
          backgroundColor: theme.surfaceVariant,
          borderRadius: '16px',
          border: `1px solid ${theme.border}`,
        }}
      >
        {[
          { label: 'Users', value: '10K+' },
          { label: 'Uptime', value: '99.9%' },
          { label: 'Speed', value: '<100ms' },
          { label: 'Free', value: 'Forever' },
        ].map((stat, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '48px',
                fontWeight: 700,
                color: theme.accent,
                marginBottom: '8px',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: '16px',
                color: theme.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

