'use client';

import { useState, useEffect } from 'react';
import { Button, Card, CardBody, Input } from '@heroui/react';
import { Terminal, Globe, AlertCircle, CheckCircle, XCircle, Maximize2 } from 'lucide-react';

export default function EscapePage() {
  const [status, setStatus] = useState<string>('Initializing...');
  const [inIframe, setInIframe] = useState(false);
  const [url, setUrl] = useState('');
  const [attempts, setAttempts] = useState<Array<{ method: string; success: boolean; message: string }>>([]);

  useEffect(() => {
    // Check if we're in an iframe
    const isInIframe = window.self !== window.top;
    setInIframe(isInIframe);
    
    if (isInIframe) {
      setStatus('Detected: Running in iframe. Attempting escape...');
      attemptEscape();
    } else {
      setStatus('Not in iframe - you have direct access!');
    }

    // Show system info
    console.log('System Info:', {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      location: window.location.href,
      inIframe: isInIframe,
    });
  }, []);

  const attemptEscape = () => {
    const methods: Array<{ name: string; fn: () => boolean }> = [
      {
        name: 'Top Window Redirect',
        fn: () => {
          try {
            if (window.top) {
              window.top.location.href = window.location.href;
              return true;
            }
          } catch (e) {
            return false;
          }
          return false;
        },
      },
      {
        name: 'PostMessage to Parent',
        fn: () => {
          try {
            if (window.parent) {
              window.parent.postMessage({ type: 'escape', url: window.location.href }, '*');
              return true;
            }
          } catch (e) {
            return false;
          }
          return false;
        },
      },
      {
        name: 'Window Open',
        fn: () => {
          try {
            const newWindow = window.open(window.location.href, '_blank');
            return !!newWindow;
          } catch (e) {
            return false;
          }
        },
      },
    ];

    methods.forEach((method, index) => {
      setTimeout(() => {
        const success = method.fn();
        setAttempts(prev => [...prev, {
          method: method.name,
          success,
          message: success ? 'Attempted' : 'Blocked by security',
        }]);
      }, index * 500);
    });
  };

  const navigateToUrl = (targetUrl: string) => {
    if (!targetUrl.trim()) return;

    let normalizedUrl = targetUrl.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://') && !normalizedUrl.startsWith('file://')) {
      normalizedUrl = `http://${normalizedUrl}`;
    }

    // Try multiple methods
    const methods = [
      () => {
        try {
          window.location.href = normalizedUrl;
          return true;
        } catch (e) {
          return false;
        }
      },
      () => {
        try {
          window.open(normalizedUrl, '_blank');
          return true;
        } catch (e) {
          return false;
        }
      },
      () => {
        try {
          if (window.top) {
            window.top.location.href = normalizedUrl;
            return true;
          }
        } catch (e) {
          return false;
        }
        return false;
      },
    ];

    methods.forEach((method, index) => {
      setTimeout(() => {
        method();
      }, index * 100);
    });
  };

  const testLocalhost = async (port: number) => {
    const testUrl = `http://localhost:${port}`;
    try {
      const response = await fetch(testUrl, { mode: 'no-cors', method: 'HEAD' });
      return { port, accessible: true };
    } catch (e) {
      // Try to open it anyway
      window.open(testUrl, '_blank');
      return { port, accessible: false };
    }
  };

  const commonLocalhostPorts = [3000, 8080, 5000, 8000, 3001, 5173, 4000, 9000];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-black/20 backdrop-blur-md border border-white/10">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Escape Page</h1>
                <p className="text-gray-300">
                  Break out of single-page restriction and access the full Windows 10 desktop
                </p>
              </div>
              {inIframe && (
                <div className="flex items-center gap-2 text-yellow-400">
                  <AlertCircle className="w-5 h-5" />
                  <span>In Iframe</span>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Status */}
        <Card className="bg-black/20 backdrop-blur-md border border-white/10">
          <CardBody className="p-6">
            <div className="flex items-center gap-2 mb-4">
              {inIframe ? (
                <XCircle className="w-5 h-5 text-yellow-400" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-400" />
              )}
              <span className="text-white font-semibold">Status: {status}</span>
            </div>
            {attempts.length > 0 && (
              <div className="space-y-2">
                {attempts.map((attempt, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    {attempt.success ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-gray-300">
                      {attempt.method}: {attempt.message}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        {/* URL Navigation */}
        <Card className="bg-black/20 backdrop-blur-md border border-white/10">
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Navigate to URL
            </h2>
            <div className="space-y-4">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL (e.g., http://localhost:3000, file:///C:/)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && url) {
                    navigateToUrl(url);
                  }
                }}
                classNames={{
                  input: 'text-white',
                  inputWrapper: 'bg-black/50 border-white/20',
                }}
              />
              <div className="flex gap-2">
                <Button
                  color="primary"
                  onPress={() => navigateToUrl(url)}
                  isDisabled={!url.trim()}
                  className="flex-1"
                >
                  Navigate
                </Button>
                <Button
                  variant="flat"
                  onPress={() => navigateToUrl(url)}
                  isDisabled={!url.trim()}
                >
                  New Tab
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Localhost Access */}
        <Card className="bg-black/20 backdrop-blur-md border border-white/10">
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Localhost Services</h2>
            <p className="text-gray-300 text-sm mb-4">
              Try accessing common localhost ports on the Windows device:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {commonLocalhostPorts.map((port) => (
                <Button
                  key={port}
                  variant="flat"
                  size="sm"
                  onPress={() => navigateToUrl(`http://localhost:${port}`)}
                  className="bg-black/50"
                >
                  :{port}
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* File System Access */}
        <Card className="bg-black/20 backdrop-blur-md border border-white/10">
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">File System Access</h2>
            <p className="text-gray-300 text-sm mb-4">
              Attempt to access Windows file system (may be blocked by browser security):
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {['C:/', 'C:/Windows', 'C:/Users', 'C:/Program Files', 'C:/Windows/System32'].map((path) => (
                <Button
                  key={path}
                  variant="flat"
                  size="sm"
                  onPress={() => navigateToUrl(`file:///${path.replace(/\\/g, '/')}`)}
                  className="bg-black/50"
                >
                  {path}
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Terminal Access */}
        <Card className="bg-black/20 backdrop-blur-md border border-white/10">
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Terminal Access
            </h2>
            <p className="text-gray-300 text-sm mb-4">
              Open browser console (F12) and try these commands:
            </p>
            <div className="bg-black/50 p-4 rounded font-mono text-sm space-y-2">
              <div className="text-green-400">// Try to escape iframe</div>
              <div className="text-white">window.top.location.href = window.location.href;</div>
              <div className="text-green-400 mt-4">// Open localhost</div>
              <div className="text-white">window.open('http://localhost:3000', '_blank');</div>
              <div className="text-green-400 mt-4">// Access file system</div>
              <div className="text-white">window.location.href = 'file:///C:/';</div>
            </div>
          </CardBody>
        </Card>

        {/* System Information */}
        <Card className="bg-black/20 backdrop-blur-md border border-white/10">
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">System Information</h2>
            <div className="bg-black/50 p-4 rounded text-sm space-y-1 font-mono">
              <div className="text-gray-300">
                <span className="text-purple-400">User Agent:</span> {navigator.userAgent}
              </div>
              <div className="text-gray-300">
                <span className="text-purple-400">Platform:</span> {navigator.platform}
              </div>
              <div className="text-gray-300">
                <span className="text-purple-400">Location:</span> {window.location.href}
              </div>
              <div className="text-gray-300">
                <span className="text-purple-400">In Iframe:</span> {inIframe ? 'Yes' : 'No'}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Fullscreen Button */}
        <Button
          color="secondary"
          size="lg"
          onPress={() => {
            if (document.documentElement.requestFullscreen) {
              document.documentElement.requestFullscreen();
            }
          }}
          startContent={<Maximize2 className="w-5 h-5" />}
          className="w-full"
        >
          Enter Fullscreen
        </Button>
      </div>
    </div>
  );
}

