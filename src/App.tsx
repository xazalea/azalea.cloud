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
import { WebVMWithBackend } from './components/WebVM/WebVMWithBackend';
import { SuperProvider } from './components/SuperProvider/SuperProvider';
import { UltraProvider } from './components/UltraProvider/UltraProvider';
import { DesktopViewer } from './components/DesktopViewer/DesktopViewer';
import { ProgressIndicator, ProgressStep } from './components/ProgressIndicator/ProgressIndicator';
import { NotificationSystem, useNotifications } from './components/Notifications/NotificationSystem';
import { DesktopService } from './services/desktopService';
import { TokenRefreshManager } from '../lib/auth/metadataAuth';
import { AuthKeyService } from '../lib/auth/authKeyService';
import { startWorker } from './services/workerService';
import { useProvider } from './context/ProviderContext';

function AppContent() {
  const { currentProvider } = useProvider();
  const [activeTab, setActiveTab] = useState('terminal');
  const [desktopLoading, setDesktopLoading] = useState(false);
  const [progressSteps, setProgressSteps] = useState<ProgressStep[]>([]);
  const [showProgress, setShowProgress] = useState(false);
  const { notifications, showError, showSuccess, showInfo, removeNotification } = useNotifications();
  const [tokenManager, setTokenManager] = useState<TokenRefreshManager | null>(null);
  const authKeyServiceRef = React.useRef(new AuthKeyService());
  const desktopServiceRef = React.useRef(new DesktopService());
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [desktopUrl, setDesktopUrl] = useState<string | null>(null);

  useEffect(() => {
    // Initialize token refresh manager (non-blocking)
    const manager = new TokenRefreshManager(async (token) => {
      // Save token to database when updated
      try {
        await authKeyServiceRef.current.saveAuthKey(token);
        console.log('Token saved to database');
      } catch (error) {
        console.error('Failed to save token:', error);
      }
    });

    // Start token refresh asynchronously (non-blocking)
    // Don't wait for this to complete before rendering
    if (typeof window !== 'undefined') {
      // Use requestIdleCallback if available, otherwise setTimeout
      const scheduleCheck = (callback: () => void) => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(callback, { timeout: 2000 });
        } else {
          setTimeout(callback, 100);
        }
      };

      scheduleCheck(() => {
        const checkMetadataServer = async () => {
          try {
            // Try to fetch from metadata server with short timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 500); // 500ms timeout
            
            const response = await fetch(
              'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
              {
                headers: { 'Metadata-Flavor': 'Google' },
                signal: controller.signal,
              }
            );
            clearTimeout(timeoutId);
            
            if (response.ok) {
              await manager.start();
              setTokenManager(manager);
            }
          } catch (error) {
            // Metadata server not available (expected in local development)
            // Silently fail - don't block UI
          }
        };

        checkMetadataServer();
      });
    }

    // Start background worker asynchronously (non-blocking)
    setTimeout(() => {
      startWorker();
    }, 0);

    return () => {
      manager.stop();
    };
  }, []);

  const handleStartDesktop = async () => {
    setDesktopLoading(true);
    setShowProgress(true);
    
    // Initialize progress steps
    const initialSteps: ProgressStep[] = [
      { id: 'tunnel', label: 'Setting up tunnel', status: 'pending' },
      { id: 'backend', label: 'Connecting to backend', status: 'pending' },
      { id: 'desktop', label: 'Starting desktop container', status: 'pending' },
      { id: 'complete', label: 'Opening desktop', status: 'pending' },
    ];
    setProgressSteps(initialSteps);

    const updateStep = (stepId: string, status: ProgressStep['status'], message?: string) => {
      setProgressSteps((prev) =>
        prev.map((step) =>
          step.id === stepId
            ? { ...step, status, message }
            : step.status === 'in-progress' && status !== 'in-progress'
            ? { ...step, status: 'completed' }
            : step
        )
      );
    };

    try {
      // Automatically set up tunnel and start desktop with progress callbacks
      const session = await desktopServiceRef.current.startDesktop((step, message) => {
        updateStep(step, 'in-progress', message);
      });

      // Mark all steps as completed
      setProgressSteps((prev) =>
        prev.map((step) => ({ ...step, status: 'completed' }))
      );

      updateStep('complete', 'in-progress', 'Opening desktop window...');
      
      // Small delay to show completion
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Open desktop in a new tab/window with fullscreen option
      const desktopWindow = window.open(
        session.vncUrl,
        'azalea-desktop',
        'width=1280,height=720,resizable=yes,scrollbars=yes,status=yes'
      );
      
      if (desktopWindow) {
        updateStep('complete', 'completed', 'Desktop window opened');
        
        // Try to request fullscreen after a short delay
        desktopWindow.addEventListener('load', () => {
          setTimeout(() => {
            try {
              if (desktopWindow.document.documentElement.requestFullscreen) {
                desktopWindow.document.documentElement.requestFullscreen();
              }
            } catch (e) {
              // Fullscreen request failed, but window is open
              console.log('Fullscreen not available, but desktop window is open');
            }
          }, 1000);
        });
        
        // Store reference for cleanup
        setDesktopUrl(session.vncUrl);
        setDesktopOpen(true);
        setDesktopLoading(false);
        
        // Hide progress after a short delay
        setTimeout(() => {
          setShowProgress(false);
        }, 1500);
        
        showSuccess('Desktop Started', 'Desktop has been opened in a new window.');
      } else {
        // Popup blocked, show error
        updateStep('complete', 'error', 'Popup blocked');
        setDesktopLoading(false);
        setShowProgress(false);
        showError(
          'Popup Blocked',
          'Please allow popups for this site to open the desktop in a new window. Check your browser settings.'
        );
      }
    } catch (error) {
      // Mark current step as error
      const currentStep = progressSteps.find((s) => s.status === 'in-progress');
      if (currentStep) {
        updateStep(currentStep.id, 'error', error instanceof Error ? error.message : 'Unknown error');
      }
      
      setDesktopLoading(false);
      setShowProgress(false);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      showError(
        'Desktop Startup Failed',
        `Failed to start desktop: ${errorMessage}\n\nPlease ensure:\n- Docker is running\n- VNC container image is available\n- Network connectivity is working`
      );
      
      console.error('Failed to start desktop:', error);
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
              desktopLoading={desktopLoading}
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
      <NotificationSystem notifications={notifications} onRemove={removeNotification} />
      {showProgress && (
        <ProgressIndicator
          steps={progressSteps}
          title="Starting Desktop"
          onClose={() => {
            if (window.confirm('Cancel desktop startup?')) {
              setShowProgress(false);
              setDesktopLoading(false);
            }
          }}
        />
      )}
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
            padding: '48px 64px',
            gap: '32px',
          }}
        >
          {activeTab === 'terminal' && (
            <>
              <div style={{ padding: '0' }}>
                <ProviderSelector />
              </div>
              <div style={{ padding: '0' }}>
                <ProviderSpecs />
              </div>
            </>
          )}
          <div 
            style={{ 
              flex: 1, 
              minHeight: 0, 
              padding: '32px', 
              display: 'flex', 
              overflow: 'hidden',
              borderRadius: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }}
          >
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

