import React, { useEffect, useState } from 'react';
import { useTheme } from '../../theme/theme';
import { ServiceAccountManager, ServiceAccount } from '../../../lib/auth/serviceAccountManager';
import { KeyGenerator } from '../../../lib/auth/keyGenerator';

export const AccountManager: React.FC = () => {
  const { theme } = useTheme();
  const [accounts, setAccounts] = useState<ServiceAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const serviceAccountManager = new ServiceAccountManager();
  const keyGenerator = new KeyGenerator();
  const userId = 'azalea.compute@gmail.com';

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const userAccounts = await serviceAccountManager.listServiceAccounts(userId);
      setAccounts(userAccounts);
    } catch (error) {
      console.error('Failed to load accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    try {
      setGenerating(true);
      const account = await serviceAccountManager.autoCreateAccountForUser(
        userId,
        'Azalea Cloud User'
      );
      await loadAccounts();
      alert(`Account created: ${account.email}`);
    } catch (error) {
      console.error('Failed to create account:', error);
      alert('Failed to create account. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateKey = async (serviceAccountEmail: string) => {
    try {
      setGenerating(true);
      await keyGenerator.createKeyGenerationJob(serviceAccountEmail, userId);
      alert('Key generation job created. It will be processed shortly.');
    } catch (error) {
      console.error('Failed to generate key:', error);
      alert('Failed to generate key. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div style={{ padding: '24px', color: theme.textSecondary }}>
        Loading accounts...
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, marginBottom: '8px', color: theme.text }}>
            Service Accounts
          </h2>
          <p style={{ margin: 0, color: theme.textSecondary, fontSize: '14px' }}>
            Manage your unlimited AzaleaCloud access accounts
          </p>
        </div>
        <button
          onClick={handleCreateAccount}
          disabled={generating}
          style={{
            backgroundColor: theme.accent,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            cursor: generating ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: generating ? 0.6 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          <span className="material-icons" style={{ fontSize: '18px' }}>
            add
          </span>
          {generating ? 'Creating...' : 'Create Account'}
        </button>
      </div>

      {accounts.length === 0 ? (
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
            account_circle
          </span>
          <p>No service accounts found</p>
          <p style={{ fontSize: '12px' }}>
            Create your first account to get started with unlimited access
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {accounts.map((account) => (
            <div
              key={account.email}
              style={{
                padding: '16px',
                backgroundColor: theme.surfaceVariant,
                borderRadius: '8px',
                border: `1px solid ${theme.border}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: account.status === 'active' ? theme.success : theme.error,
                      }}
                    />
                    <span style={{ fontWeight: 600, color: theme.text }}>
                      {account.displayName}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: theme.textSecondary, fontFamily: 'monospace', marginTop: '4px' }}>
                    {account.email}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleGenerateKey(account.email)}
                    disabled={generating || account.status !== 'active'}
                    style={{
                      backgroundColor: 'transparent',
                      border: `1px solid ${theme.border}`,
                      borderRadius: '6px',
                      padding: '8px 12px',
                      cursor: (generating || account.status !== 'active') ? 'not-allowed' : 'pointer',
                      color: theme.accent,
                      fontSize: '12px',
                      opacity: (generating || account.status !== 'active') ? 0.5 : 1,
                    }}
                  >
                    Generate Key
                  </button>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: theme.textSecondary, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>Status: <strong>{account.status}</strong></div>
                <div>Created: {formatDate(account.createdAt)}</div>
                <div>Project: {account.projectId}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

