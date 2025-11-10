import React, { useState, useEffect } from 'react';
import { useTheme } from '../../theme/theme';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications, onRemove }) => {
  const { theme } = useTheme();

  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.duration !== 0) {
        const timer = setTimeout(() => {
          onRemove(notification.id);
        }, notification.duration || 5000);
        return () => clearTimeout(timer);
      }
    });
  }, [notifications, onRemove]);

  if (notifications.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '500px',
      }}
    >
      {notifications.map((notification) => {
        const colors = {
          success: { bg: '#4caf50', icon: 'check_circle' },
          error: { bg: '#f44336', icon: 'error' },
          info: { bg: theme.accent, icon: 'info' },
          warning: { bg: '#ff9800', icon: 'warning' },
        };

        const color = colors[notification.type];

        return (
          <div
            key={notification.id}
            style={{
              backgroundColor: color.bg,
              color: '#FFFFFF',
              padding: '20px 24px',
              borderRadius: '12px',
              boxShadow: `0 8px 24px ${color.bg}40`,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              animation: 'slideIn 0.3s ease-out',
              minWidth: '400px',
            }}
          >
            <span className="material-icons" style={{ fontSize: '28px', flexShrink: 0 }}>
              {color.icon}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                {notification.title}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.95, lineHeight: 1.5 }}>
                {notification.message}
              </div>
            </div>
            <button
              onClick={() => onRemove(notification.id)}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <span className="material-icons" style={{ fontSize: '20px', color: '#FFFFFF' }}>
                close
              </span>
            </button>
          </div>
        );
      })}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

// Notification manager hook
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = `notif-${Date.now()}-${Math.random()}`;
    setNotifications((prev) => [...prev, { ...notification, id }]);
    return id;
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const showError = (title: string, message: string) => {
    return addNotification({ type: 'error', title, message, duration: 10000 });
  };

  const showSuccess = (title: string, message: string) => {
    return addNotification({ type: 'success', title, message, duration: 5000 });
  };

  const showInfo = (title: string, message: string) => {
    return addNotification({ type: 'info', title, message, duration: 5000 });
  };

  const showWarning = (title: string, message: string) => {
    return addNotification({ type: 'warning', title, message, duration: 7000 });
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    showError,
    showSuccess,
    showInfo,
    showWarning,
  };
};

