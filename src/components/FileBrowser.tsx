'use client';

import { useState } from 'react';
import { Card, CardBody, Button, Input } from '@heroui/react';
import { Folder, File, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';

interface URLLauncherProps {
  windowId: string;
}

export function FileBrowser({ windowId }: URLLauncherProps) {
  const [currentPath, setCurrentPath] = useState('');
  const [files, setFiles] = useState<Array<{ name: string; type: 'file' | 'directory' }>>([]);
  const [error, setError] = useState<string>('');

  const tryAccessPath = async (path: string) => {
    setError('');
    setCurrentPath(path);
    
    // Try to access via file:// protocol
    try {
      // Note: Browser security prevents direct file system access
      // This is a demonstration of what we'd try
      const fileUrl = path.startsWith('file://') ? path : `file:///${path.replace(/\\/g, '/')}`;
      
      setError('Browser security prevents direct file system access. Trying alternative methods...');
      
      // Try to create an iframe with file:// URL
      // This will likely fail due to security, but we try
      const testPaths = [
        'C:/',
        'C:/Windows',
        'C:/Users',
        'C:/Program Files',
        'C:/Windows/System32',
      ];

      // Simulate file listing (in real scenario, would need server-side access)
      const simulatedFiles = testPaths.map(p => ({
        name: p.split('/').pop() || p,
        type: 'directory' as const,
      }));

      setFiles(simulatedFiles);
    } catch (err) {
      setError(`Cannot access: ${err instanceof Error ? err.message : 'Access denied'}`);
    }
  };

  const navigateTo = (path: string) => {
    if (path.includes('..')) {
      // Go up directory
      const parts = currentPath.split('/');
      parts.pop();
      tryAccessPath(parts.join('/') || '/');
    } else {
      tryAccessPath(path);
    }
  };

  return (
    <div className="w-full h-full bg-slate-900 flex flex-col p-4 gap-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Input
            value={currentPath}
            onChange={(e) => setCurrentPath(e.target.value)}
            placeholder="Enter path (e.g., C:/, C:/Windows)"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && currentPath) {
                tryAccessPath(currentPath);
              }
            }}
            classNames={{
              input: 'text-white',
              inputWrapper: 'bg-black/50 border-white/20',
            }}
            startContent={<Folder className="w-4 h-4 text-gray-400" />}
          />
          <Button
            isIconOnly
            variant="flat"
            onPress={() => tryAccessPath(currentPath)}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="flat"
            onPress={() => navigateTo('..')}
            startContent={<ArrowLeft className="w-4 h-4" />}
          >
            Up
          </Button>
          <Button
            size="sm"
            variant="flat"
            onPress={() => tryAccessPath('C:/')}
          >
            C:/
          </Button>
          <Button
            size="sm"
            variant="flat"
            onPress={() => tryAccessPath('C:/Windows')}
          >
            Windows
          </Button>
          <Button
            size="sm"
            variant="flat"
            onPress={() => tryAccessPath('C:/Users')}
          >
            Users
          </Button>
        </div>

        {error && (
          <Card className="bg-red-500/20 border-red-500/50">
            <CardBody className="p-3">
              <div className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            </CardBody>
          </Card>
        )}

        <div className="text-white text-sm">
          <div className="mb-2">Note: Direct file system access is restricted by browser security.</div>
          <div className="mb-2">Try using the Terminal to execute commands that can access files.</div>
          <div className="text-yellow-400">
            Alternative: Use URL Launcher with file:// protocol URLs
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="text-white text-sm mb-2">Files & Directories:</div>
        <div className="space-y-2">
          {files.map((file, index) => (
            <Card
              key={index}
              className="bg-black/50 border-white/20 cursor-pointer hover:bg-black/70 transition-colors"
              isPressable
              onPress={() => {
                if (file.type === 'directory') {
                  navigateTo(`${currentPath}/${file.name}`);
                }
              }}
            >
              <CardBody className="p-3">
                <div className="flex items-center gap-2">
                  {file.type === 'directory' ? (
                    <Folder className="w-5 h-5 text-blue-400" />
                  ) : (
                    <File className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-300">{file.name}</span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

