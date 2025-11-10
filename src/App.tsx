import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './theme/theme';
import { ProviderProvider } from './context/ProviderContext';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Terminal } from './components/Terminal/Terminal';
import { CloudShellLayout } from './components/CloudShell/CloudShellLayout';
import { LandingPage } from './components/LandingPage/LandingPage';
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
import { useTheme } from './theme/theme';

function AppContent() {
  const { currentProvider } = useProvider();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('terminal');
  const [showLanding, setShowLanding] = useState(true);
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
    // Don't wait for this to complete before rendering - use immediate timeout
    if (typeof window !== 'undefined') {
      // Use immediate timeout to prevent blocking
      setTimeout(() => {
        const checkMetadataServer = async () => {
          try {
            // Try to fetch from metadata server with very short timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 200); // 200ms timeout
            
            const response = await fetch(
              'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
              {
                headers: { 'Metadata-Flavor': 'Google' },
                signal: controller.signal,
              }
            ).catch(() => null); // Catch all errors immediately
            
            clearTimeout(timeoutId);
            
            if (response?.ok) {
              manager.start().catch(() => {}); // Don't wait
              setTokenManager(manager);
            }
          } catch (error) {
            // Silently fail - don't block UI
          }
        };

        checkMetadataServer();
      }, 0);
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
      
      // Open desktop in a new tab/window
      // Note: We can't access cross-origin window properties, so we just open it
      const desktopWindow = window.open(
        session.vncUrl,
        'azalea-desktop',
        'width=1280,height=720,resizable=yes,scrollbars=yes,status=yes'
      );
      
      if (desktopWindow) {
        updateStep('complete', 'completed', 'Desktop window opened');
        
        // Monitor if window is closed (this is safe, doesn't access cross-origin content)
        const checkClosed = setInterval(() => {
          try {
            if (desktopWindow.closed) {
              clearInterval(checkClosed);
              setDesktopOpen(false);
            }
          } catch (e) {
            // Cross-origin access blocked, stop checking
            clearInterval(checkClosed);
          }
        }, 1000);
        
        // Store reference for cleanup
        setDesktopUrl(session.vncUrl);
        setDesktopOpen(true);
        setDesktopLoading(false);
        
        // Hide progress after a short delay
        setTimeout(() => {
          setShowProgress(false);
        }, 1500);
        
        showSuccess('Desktop Started', 'Desktop has been opened in a new window. Press F11 for fullscreen.');
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
            <CloudShellLayout
              onDesktopClick={handleStartDesktop}
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
          return (
            <CloudShellLayout
              onDesktopClick={handleStartDesktop}
              desktopLoading={desktopLoading}
            />
          );
      }
    }

    // Only terminal tab is available
    return <Terminal onCommand={undefined} />;
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
      {showLanding ? (
        <LandingPage onGetStarted={() => setShowLanding(false)} />
      ) : (
        <>
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
              <div 
                style={{ 
                  flex: 1, 
                  minHeight: 0, 
                  display: 'flex', 
                  overflow: 'hidden',
                }}
              >
                {renderContent()}
              </div>
            </main>
          </div>
        </>
      )}
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

