import React, { useEffect, useState } from 'react';
import { useTheme } from '../../theme/theme';
import { AuthKeyService } from '../../../lib/auth/authKeyService';
import { AuthKey } from '../../../lib/auth/metadataAuth';

export const AuthKeys: React.FC = () => {
  const { theme } = useTheme();
  const [keys, setKeys] = useState<AuthKey[]>([]);
  const [loading, setLoading] = useState(true);
  const authKeyService = new AuthKeyService();

  useEffect(() => {
    loadKeys();
    const unsubscribe = authKeyService.subscribeToAuthKeys(setKeys);
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadKeys = async () => {
    try {
      setLoading(true);
      const authKeys = await authKeyService.getAuthKeys();
      setKeys(authKeys);
    } catch (error) {
      console.error('Failed to load auth keys:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const isExpired = (expiresAt: number) => {
    return Date.now() >= expiresAt;
  };

  const handleDelete = async (keyId: string) => {
    if (window.confirm('Are you sure you want to delete this auth key?')) {
      try {
        await authKeyService.deleteAuthKey(keyId);
      } catch (error) {
        console.error('Failed to delete auth key:', error);
        alert('Failed to delete auth key');
      }
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '24px', color: theme.textSecondary }}>
        Loading auth keys...
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, marginBottom: '8px', color: theme.text }}>
          Authentication Keys
        </h2>
        <p style={{ margin: 0, color: theme.textSecondary, fontSize: '14px' }}>
          Manage your Google Cloud access tokens
        </p>
      </div>

      {keys.length === 0 ? (
        <div
          style={{
            padding: '48px',
            textAlign: 'center',
            color: theme.textSecondary,
            backgroundColor: theme.surfaceVariant,
            borderRadius: '8px',
          }}
        >
          <span className="material-icons" style={{ fontSize: '48px', marginBottom: '16px', display: 'block' }}>
            vpn_key
          </span>
          <p>No auth keys found</p>
          <p style={{ fontSize: '12px' }}>
            Auth keys are automatically generated and stored in the background
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {keys.map((key) => {
            const expired = isExpired(key.expiresAt);
            return (
              <div
                key={key.id}
                style={{
                  padding: '16px',
                  backgroundColor: theme.surfaceVariant,
                  borderRadius: '8px',
                  border: `1px solid ${expired ? theme.error : theme.border}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: expired ? theme.error : theme.success,
                        }}
                      />
                      <span style={{ fontWeight: 600, color: theme.text }}>
                        {expired ? 'Expired' : 'Active'}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: theme.textSecondary, fontFamily: 'monospace' }}>
                      {key.token.substring(0, 20)}...
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(key.id)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: theme.error,
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                  >
                    <span className="material-icons" style={{ fontSize: '18px' }}>
                      delete
                    </span>
                  </button>
                </div>
                <div style={{ fontSize: '12px', color: theme.textSecondary, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>Created: {formatDate(key.createdAt)}</div>
                  <div>Expires: {formatDate(key.expiresAt)}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

