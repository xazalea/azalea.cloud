import React from 'react';
import { useTheme } from '../../theme/theme';

export interface ProgressStep {
  id: string;
  label: string;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  message?: string;
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  title: string;
  onClose?: () => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps, title, onClose }) => {
  const { theme } = useTheme();

  const getStepIcon = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return 'check_circle';
      case 'in-progress':
        return 'refresh';
      case 'error':
        return 'error';
      default:
        return 'radio_button_unchecked';
    }
  };

  const getStepColor = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return theme.success || '#4caf50';
      case 'in-progress':
        return theme.accent;
      case 'error':
        return theme.error || '#f44336';
      default:
        return theme.textSecondary;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
          backdropFilter: 'blur(4px)',
        }}
        onClick={(e) => {
          // Prevent closing on backdrop click
          e.stopPropagation();
        }}
      />
      {/* Progress Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: theme.surface,
          borderRadius: '16px',
          padding: '32px',
          boxShadow: `0 16px 48px ${theme.border}40`,
          zIndex: 9999,
          minWidth: '500px',
          maxWidth: '600px',
          border: `2px solid ${theme.border}`,
        }}
      >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: theme.text, margin: 0 }}>
          {title}
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: theme.textSecondary,
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className="material-icons">close</span>
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {steps.map((step, index) => {
          const color = getStepColor(step.status);
          const icon = getStepIcon(step.status);
          const isActive = step.status === 'in-progress';

          return (
            <div
              key={step.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '16px',
                backgroundColor: isActive ? theme.surfaceVariant : 'transparent',
                borderRadius: '8px',
                border: isActive ? `2px solid ${color}` : `1px solid ${theme.border}`,
                transition: 'all 0.3s ease',
              }}
            >
              <span
                className="material-icons"
                style={{
                  fontSize: '24px',
                  color: color,
                  flexShrink: 0,
                  animation: step.status === 'in-progress' ? 'spin 1s linear infinite' : 'none',
                }}
              >
                {icon}
              </span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: step.status === 'in-progress' ? 600 : 500,
                    color: theme.text,
                    marginBottom: step.message ? '4px' : 0,
                  }}
                >
                  {step.label}
                </div>
                {step.message && (
                  <div
                    style={{
                      fontSize: '13px',
                      color: theme.textSecondary,
                      fontStyle: 'italic',
                    }}
                  >
                    {step.message}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </>
  );
};

