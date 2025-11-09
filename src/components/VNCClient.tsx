'use client';

import { useEffect, useRef, useState } from 'react';
import { Spinner } from '@heroui/react';

interface VNCClientProps {
  onDisconnect: () => void;
  onError: (error: string) => void;
}

export function VNCClient({ onDisconnect, onError }: VNCClientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<string>('Connecting...');
  const wsRef = useRef<WebSocket | null>(null);
  const frameBufferRef = useRef<ImageData | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight || 600;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize WebSocket connection to our proxy
    const connect = async () => {
      try {
        // Use wss:// for production, ws:// for development
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = process.env.NEXT_PUBLIC_WS_URL || `${protocol}//${window.location.host}/api/vnc/ws`;
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          setStatus('Connected');
          setIsLoading(false);
          // Request initial screen
          ws.send(JSON.stringify({ type: 'init', width: canvas.width, height: canvas.height }));
        };

        ws.onmessage = (event) => {
          if (event.data instanceof Blob) {
            // Handle binary frame data
            event.data.arrayBuffer().then((buffer) => {
              const uint8Array = new Uint8Array(buffer);
              // Decode and render frame
              renderFrame(ctx, uint8Array, canvas.width, canvas.height);
            });
          } else {
            // Handle text messages
            try {
              const message = JSON.parse(event.data);
              if (message.type === 'status') {
                setStatus(message.status);
              } else if (message.type === 'error') {
                onError(message.error);
                setIsLoading(false);
              } else if (message.type === 'frame') {
                // Frame data as base64
                const img = new Image();
                img.onload = () => {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                img.src = `data:image/png;base64,${message.data}`;
              }
            } catch (e) {
              console.error('Error parsing message:', e);
            }
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          onError('Connection error. Please try again.');
          setIsLoading(false);
        };

        ws.onclose = () => {
          setStatus('Disconnected');
          setIsLoading(false);
          onDisconnect();
        };
      } catch (error) {
        console.error('Connection error:', error);
        onError('Failed to connect to desktop. Please check your configuration.');
        setIsLoading(false);
      }
    };

    connect();

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
      const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
      mousePosRef.current = { x, y };

      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'mouse',
          x,
          y,
          button: 0,
        }));
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
      const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
      const button = e.button === 0 ? 1 : e.button === 2 ? 4 : 2;

      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'mouse',
          x,
          y,
          button,
          down: true,
        }));
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
      const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
      const button = e.button === 0 ? 1 : e.button === 2 ? 4 : 2;

      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'mouse',
          x,
          y,
          button,
          down: false,
        }));
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'wheel',
          x: mousePosRef.current.x,
          y: mousePosRef.current.y,
          deltaX: e.deltaX,
          deltaY: e.deltaY,
        }));
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Keyboard event handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'key',
          key: e.key,
          code: e.code,
          keyCode: e.keyCode,
          down: true,
        }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'key',
          key: e.key,
          code: e.code,
          keyCode: e.keyCode,
          down: false,
        }));
      }
    };

    // Attach event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);
    canvas.addEventListener('contextmenu', handleContextMenu);
    canvas.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('keyup', handleKeyUp);
    canvas.tabIndex = 0; // Make canvas focusable for keyboard events

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('contextmenu', handleContextMenu);
      canvas.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('keyup', handleKeyUp);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [onDisconnect, onError]);

  // Simple frame rendering (for demonstration)
  const renderFrame = (ctx: CanvasRenderingContext2D, data: Uint8Array, width: number, height: number) => {
    // This is a simplified renderer. In production, you'd use proper VNC protocol decoding
    // For now, we'll create a placeholder
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px monospace';
    ctx.fillText('Desktop connection active', 20, 30);
    ctx.fillText(`Resolution: ${width}x${height}`, 20, 50);
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="text-center">
            <Spinner size="lg" color="secondary" />
            <p className="text-white mt-4">{status}</p>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
}

