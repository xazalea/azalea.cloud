'use client';

import { useState, useEffect, useRef } from 'react';
import { Button, Card, CardBody, Spinner } from '@heroui/react';
import { Play, Square, RefreshCw, Maximize2, Minimize2 } from 'lucide-react';
import { VNCClient } from './VNCClient';

export function DesktopViewer() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      // Connection will be handled by VNCClient
      setIsConnected(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect');
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setError(null);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="w-full">
      <Card className="bg-black/20 backdrop-blur-md border border-white/10">
        <CardBody className="p-6">
          {!isConnected ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Connect to Windows 10 Desktop</h2>
                <p className="text-gray-300 mb-6">
                  Access a full Windows 10 desktop environment directly in your browser
                </p>
              </div>
              <Button
                color="secondary"
                size="lg"
                onPress={handleConnect}
                isLoading={isConnecting}
                startContent={!isConnecting && <Play className="w-5 h-5" />}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
              >
                {isConnecting ? 'Connecting...' : 'Connect to Desktop'}
              </Button>
              {error && (
                <div className="text-red-400 text-sm text-center max-w-md">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <div ref={containerRef} className="relative w-full">
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onPress={toggleFullscreen}
                  className="bg-black/50 text-white"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onPress={handleDisconnect}
                  className="bg-red-500/50 text-white"
                >
                  <Square className="w-4 h-4" />
                </Button>
              </div>
              <div className="bg-black rounded-lg overflow-hidden" style={{ minHeight: '600px' }}>
                <VNCClient
                  onDisconnect={handleDisconnect}
                  onError={(err) => setError(err)}
                />
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

