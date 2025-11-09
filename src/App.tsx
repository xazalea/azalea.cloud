import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './theme/theme';
import { ProviderProvider } from './context/ProviderContext';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Terminal } from './components/Terminal/Terminal';
import { AuthKeys } from './components/AuthKeys/AuthKeys';
import { AccountManager } from './components/AccountManager/AccountManager';
import { ProviderSelector } from './components/ProviderSelector/ProviderSelector';
import { ProviderSpecs } from './components/ProviderSpecs/ProviderSpecs';
import { WebVMLocal } from './components/WebVM/WebVMLocal';
import { WebVMSSHX } from './components/WebVM/WebVMSSHX';
import { SuperProvider } from './components/SuperProvider/SuperProvider';
import { UltraProvider } from './components/UltraProvider/UltraProvider';
import { DesktopViewer } from './components/DesktopViewer/DesktopViewer';
import { DesktopService } from './services/desktopService';
import { TokenRefreshManager } from '../lib/auth/metadataAuth';
import { AuthKeyService } from '../lib/auth/authKeyService';
import { startWorker } from './services/workerService';
import { useProvider } from './context/ProviderContext';

function AppContent() {
  const { currentProvider } = useProvider();
  const [activeTab, setActiveTab] = useState('terminal');
  const [tokenManager, setTokenManager] = useState<TokenRefreshManager | null>(null);
  const authKeyServiceRef = React.useRef(new AuthKeyService());
  const desktopServiceRef = React.useRef(new DesktopService());
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [desktopUrl, setDesktopUrl] = useState<string | null>(null);

  useEffect(() => {
    // Initialize token refresh manager
    const manager = new TokenRefreshManager(async (token) => {
      // Save token to database when updated
      try {
        await authKeyServiceRef.current.saveAuthKey(token);
        console.log('Token saved to database');
      } catch (error) {
        console.error('Failed to save token:', error);
      }
    });

    // Start token refresh (only if running in a Google Cloud environment)
    // In a real implementation, you'd check if metadata server is available
    if (typeof window !== 'undefined') {
      // For development, we'll skip the actual metadata server call
      // In production, you'd check if metadata server is accessible
      const checkMetadataServer = async () => {
        try {
          // Try to fetch from metadata server
          const response = await fetch(
            'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
            {
              headers: { 'Metadata-Flavor': 'Google' },
              signal: AbortSignal.timeout(1000), // 1 second timeout
            }
          );
          if (response.ok) {
            await manager.start();
            setTokenManager(manager);
          }
        } catch (error) {
          // Metadata server not available (expected in local development)
          console.log('Metadata server not available (running locally)');
        }
      };

      checkMetadataServer();
    }

    // Start background worker for automated account management
    startWorker();

    return () => {
      manager.stop();
    };
  }, []);

  const handleStartDesktop = async () => {
    try {
      const session = await desktopServiceRef.current.startDesktop();
      setDesktopUrl(session.vncUrl);
      setDesktopOpen(true);
    } catch (error) {
      console.error('Failed to start desktop:', error);
      alert('Failed to start desktop. Please make sure Docker is running and the image is available.');
    }
  };

  const handleCloseDesktop = async () => {
    await desktopServiceRef.current.stopDesktop();
    setDesktopOpen(false);
    setDesktopUrl(null);
  };

  const renderContent = () => {
    // Show desktop if open
    if (desktopOpen && desktopUrl) {
      return <DesktopViewer vncUrl={desktopUrl} onClose={handleCloseDesktop} />;
    }

    // Render provider-specific content based on current provider
    if (activeTab === 'terminal') {
      switch (currentProvider) {
        case 'azalea-cloud':
          return (
            <Terminal 
              onCommand={undefined}
              onDesktopClick={handleStartDesktop}
              showDesktopButton={true}
            />
          );
        case 'azalea-sshx':
          return <WebVMSSHX />;
        case 'azalea-local':
          return <WebVMLocal />;
        case 'azalea-super':
          return <SuperProvider />;
        case 'azalea-ultra':
          return <UltraProvider />;
        default:
          return <Terminal onCommand={undefined} />;
      }
    }

    // Other tabs are provider-agnostic
    switch (activeTab) {
      case 'accounts':
        return <AccountManager />;
      case 'auth':
        return <AuthKeys />;
      case 'files':
        return (
          <div style={{ padding: '24px', color: '#BABBB1' }}>
            <h2>File Manager</h2>
            <p>File management coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div style={{ padding: '24px', color: '#BABBB1' }}>
            <h2>Settings</h2>
            <p>Settings coming soon...</p>
          </div>
        );
      default:
        return <Terminal />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F0DAD5' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main
          style={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F0DAD5',
          }}
        >
          {activeTab === 'terminal' && (
            <>
              <div style={{ padding: '16px 16px 0 16px' }}>
                <ProviderSelector />
              </div>
              <div style={{ padding: '0 16px' }}>
                <ProviderSpecs />
              </div>
              {currentProvider === 'azalea-cloud' && (
                <div style={{ padding: '0 16px 8px 16px', fontSize: '12px', color: '#6C739C' }}>
                  <span className="material-icons" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '4px' }}>
                    info
                  </span>
                  Backend server runs automatically in WebVM for Docker operations
                </div>
              )}
            </>
          )}
          <div style={{ flex: 1, minHeight: 0, padding: activeTab === 'terminal' ? '16px' : '0', display: 'flex' }}>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ProviderProvider>
        <AppContent />
      </ProviderProvider>
    </ThemeProvider>
  );
}

export default App;

