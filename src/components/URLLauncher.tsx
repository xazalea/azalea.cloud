'use client';

import { useState } from 'react';
import { Button, Input, Card, CardBody } from '@heroui/react';
import { Globe, ExternalLink, AlertCircle } from 'lucide-react';

interface URLLauncherProps {
  windowId: string;
}

export function URLLauncher({ windowId }: URLLauncherProps) {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState<'iframe' | 'window' | 'fetch'>('iframe');
  const [status, setStatus] = useState<string>('');

  const commonUrls = [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://localhost:5000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8080',
    'file:///C:/',
    'file:///C:/Windows/System32',
    'http://localhost',
    'https://www.google.com',
  ];

  const launchUrl = async (targetUrl: string, launchMethod: typeof method = method) => {
    setStatus('Launching...');
    
    try {
      // Normalize URL
      let normalizedUrl = targetUrl.trim();
      if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://') && !normalizedUrl.startsWith('file://')) {
        normalizedUrl = `http://${normalizedUrl}`;
      }

      switch (launchMethod) {
        case 'iframe':
          // Create iframe in current page
          const iframe = document.createElement('iframe');
          iframe.src = normalizedUrl;
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.border = 'none';
          iframe.sandbox.add('allow-same-origin', 'allow-scripts', 'allow-forms', 'allow-popups');
          
          const container = document.getElementById(`url-container-${windowId}`);
          if (container) {
            container.innerHTML = '';
            container.appendChild(iframe);
            setStatus(`Loaded in iframe: ${normalizedUrl}`);
          }
          break;

        case 'window':
          // Open in new window/tab
          try {
            const newWindow = window.open(normalizedUrl, '_blank');
            if (newWindow) {
              setStatus(`Opened in new window: ${normalizedUrl}`);
            } else {
              setStatus('Popup blocked. Try iframe method.');
            }
          } catch (error) {
            setStatus(`Error: ${error instanceof Error ? error.message : 'Failed to open window'}`);
          }
          break;

        case 'fetch':
          // Try to fetch content
          try {
            const response = await fetch(normalizedUrl, { 
              mode: 'no-cors',
              method: 'GET'
            });
            setStatus(`Fetch attempted: ${normalizedUrl} (CORS may block response)`);
          } catch (error) {
            setStatus(`Fetch error: ${error instanceof Error ? error.message : 'Failed'}`);
          }
          break;
      }
    } catch (error) {
      setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="w-full h-full bg-slate-900 flex flex-col p-4 gap-4">
      <div className="space-y-4">
        <div>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL (e.g., http://localhost:3000, file:///C:/)"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && url) {
                launchUrl(url);
              }
            }}
            classNames={{
              input: 'text-white',
              inputWrapper: 'bg-black/50 border-white/20',
            }}
            startContent={<Globe className="w-4 h-4 text-gray-400" />}
          />
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            color={method === 'iframe' ? 'secondary' : 'default'}
            variant={method === 'iframe' ? 'solid' : 'flat'}
            onPress={() => setMethod('iframe')}
            className="flex-1"
          >
            Iframe
          </Button>
          <Button
            size="sm"
            color={method === 'window' ? 'secondary' : 'default'}
            variant={method === 'window' ? 'solid' : 'flat'}
            onPress={() => setMethod('window')}
            className="flex-1"
          >
            New Window
          </Button>
          <Button
            size="sm"
            color={method === 'fetch' ? 'secondary' : 'default'}
            variant={method === 'fetch' ? 'solid' : 'flat'}
            onPress={() => setMethod('fetch')}
            className="flex-1"
          >
            Fetch
          </Button>
        </div>

        <Button
          color="primary"
          onPress={() => launchUrl(url)}
          isDisabled={!url.trim()}
          startContent={<ExternalLink className="w-4 h-4" />}
          className="w-full"
        >
          Launch URL
        </Button>

        {status && (
          <Card className="bg-black/50 border-white/20">
            <CardBody className="p-3">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <AlertCircle className="w-4 h-4" />
                <span>{status}</span>
              </div>
            </CardBody>
          </Card>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="text-white text-sm mb-2">Common URLs:</div>
        <div className="space-y-2">
          {commonUrls.map((commonUrl, index) => (
            <Card
              key={index}
              className="bg-black/50 border-white/20 cursor-pointer hover:bg-black/70 transition-colors"
              isPressable
              onPress={() => {
                setUrl(commonUrl);
                launchUrl(commonUrl);
              }}
            >
              <CardBody className="p-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-300">{commonUrl}</span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      <div id={`url-container-${windowId}`} className="flex-1 border border-white/20 rounded bg-black/50 overflow-hidden" />
    </div>
  );
}

