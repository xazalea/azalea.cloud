'use client';

import { useState, useEffect, useRef } from 'react';
import { Button, Card, CardBody, Input, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@heroui/react';
import { Terminal, Folder, Globe, Settings, Maximize2, X, FileText, Command } from 'lucide-react';
import { TerminalWindow } from './TerminalWindow';
import { FileBrowser } from './FileBrowser';
import { SystemInfo } from './SystemInfo';
import { URLLauncher } from './URLLauncher';

interface Window {
  id: string;
  title: string;
  type: 'terminal' | 'filebrowser' | 'systeminfo' | 'urllauncher' | 'browser';
  url?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
}

export function WebDesktop() {
  const [windows, setWindows] = useState<Window[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);
  const desktopRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createWindow = (type: Window['type'], title: string, url?: string) => {
    const newWindow: Window = {
      id: `window-${Date.now()}`,
      title,
      type,
      url,
      x: 100 + windows.length * 30,
      y: 100 + windows.length * 30,
      width: 800,
      height: 600,
      minimized: false,
      maximized: false,
      zIndex: nextZIndex,
    };
    setWindows([...windows, newWindow]);
    setNextZIndex(nextZIndex + 1);
  };

  const updateWindow = (id: string, updates: Partial<Window>) => {
    setWindows(windows.map(w => w.id === id ? { ...w, ...updates } : w));
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const bringToFront = (id: string) => {
    const window = windows.find(w => w.id === id);
    if (window && window.zIndex !== nextZIndex - 1) {
      updateWindow(id, { zIndex: nextZIndex });
      setNextZIndex(nextZIndex + 1);
    }
  };

  const renderWindowContent = (window: Window) => {
    switch (window.type) {
      case 'terminal':
        return <TerminalWindow windowId={window.id} />;
      case 'filebrowser':
        return <FileBrowser windowId={window.id} />;
      case 'systeminfo':
        return <SystemInfo windowId={window.id} />;
      case 'urllauncher':
        return <URLLauncher windowId={window.id} />;
      case 'browser':
        return (
          <iframe
            src={window.url}
            className="w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
            allow="camera; microphone; geolocation"
          />
        );
      default:
        return <div>Unknown window type</div>;
    }
  };

  return (
    <div ref={desktopRef} className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-4 z-10">
        <button
          onClick={() => createWindow('terminal', 'Terminal')}
          className="flex flex-col items-center gap-2 p-4 bg-black/20 backdrop-blur-md rounded-lg border border-white/10 hover:bg-black/40 transition-colors text-white"
        >
          <Terminal className="w-8 h-8" />
          <span className="text-xs">Terminal</span>
        </button>
        <button
          onClick={() => createWindow('filebrowser', 'File Browser')}
          className="flex flex-col items-center gap-2 p-4 bg-black/20 backdrop-blur-md rounded-lg border border-white/10 hover:bg-black/40 transition-colors text-white"
        >
          <Folder className="w-8 h-8" />
          <span className="text-xs">Files</span>
        </button>
        <button
          onClick={() => createWindow('urllauncher', 'URL Launcher')}
          className="flex flex-col items-center gap-2 p-4 bg-black/20 backdrop-blur-md rounded-lg border border-white/10 hover:bg-black/40 transition-colors text-white"
        >
          <Globe className="w-8 h-8" />
          <span className="text-xs">Browser</span>
        </button>
        <button
          onClick={() => createWindow('systeminfo', 'System Info')}
          className="flex flex-col items-center gap-2 p-4 bg-black/20 backdrop-blur-md rounded-lg border border-white/10 hover:bg-black/40 transition-colors text-white"
        >
          <Settings className="w-8 h-8" />
          <span className="text-xs">System</span>
        </button>
      </div>

      {/* Windows */}
      {windows.map(window => (
        <div
          key={window.id}
          className="absolute bg-black/90 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl flex flex-col"
          style={{
            left: window.maximized ? 0 : window.x,
            top: window.maximized ? 0 : window.y,
            width: window.maximized ? '100%' : window.width,
            height: window.maximized ? '100%' : window.height,
            zIndex: window.zIndex,
            display: window.minimized ? 'none' : 'flex',
          }}
          onClick={() => bringToFront(window.id)}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-black/50 border-b border-white/10">
            <div className="flex items-center gap-2 text-white">
              {window.type === 'terminal' && <Terminal className="w-4 h-4" />}
              {window.type === 'filebrowser' && <Folder className="w-4 h-4" />}
              {window.type === 'urllauncher' && <Globe className="w-4 h-4" />}
              {window.type === 'systeminfo' && <Settings className="w-4 h-4" />}
              {window.type === 'browser' && <Globe className="w-4 h-4" />}
              <span className="text-sm font-medium">{window.title}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => updateWindow(window.id, { maximized: !window.maximized })}
                className="text-white min-w-0 w-6 h-6"
              >
                <Maximize2 className="w-3 h-3" />
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => closeWindow(window.id)}
                className="text-white min-w-0 w-6 h-6"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Window Content */}
          <div className="flex-1 overflow-hidden">
            {renderWindowContent(window)}
          </div>
        </div>
      ))}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/50 backdrop-blur-md border-t border-white/10 flex items-center gap-2 px-4 z-50">
        {windows.map(window => (
          <button
            key={window.id}
            onClick={() => {
              if (window.minimized) {
                updateWindow(window.id, { minimized: false });
              } else {
                updateWindow(window.id, { minimized: true });
              }
              bringToFront(window.id);
            }}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              window.minimized
                ? 'bg-white/10 text-white/70'
                : 'bg-purple-500/50 text-white'
            }`}
          >
            {window.title}
          </button>
        ))}
      </div>
    </div>
  );
}

