'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody } from '@heroui/react';
import { Cpu, HardDrive, Monitor, Network, AlertCircle } from 'lucide-react';

interface SystemInfoProps {
  windowId: string;
}

export function SystemInfo({ windowId }: SystemInfoProps) {
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    // Gather all available system information
    const systemInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      languages: navigator.languages,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: (navigator as any).deviceMemory,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        colorDepth: window.screen.colorDepth,
        pixelDepth: window.screen.pixelDepth,
      },
      window: {
        width: window.innerWidth,
        height: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
      },
      location: {
        href: window.location.href,
        origin: window.location.origin,
        protocol: window.location.protocol,
        host: window.location.host,
        hostname: window.location.hostname,
        port: window.location.port,
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
      },
      inIframe: window.self !== window.top,
      localStorage: typeof Storage !== 'undefined',
      sessionStorage: typeof Storage !== 'undefined',
      geolocation: 'geolocation' in navigator,
      mediaDevices: 'mediaDevices' in navigator,
      webGL: (() => {
        try {
          const canvas = document.createElement('canvas');
          return !!canvas.getContext('webgl') || !!canvas.getContext('experimental-webgl');
        } catch {
          return false;
        }
      })(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
    };

    setInfo(systemInfo);
  }, []);

  if (!info) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        Loading system information...
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-slate-900 overflow-y-auto p-4">
      <div className="space-y-4">
        <Card className="bg-black/50 border-white/20">
          <CardBody className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Monitor className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Display Information</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <div>Screen: {info.screen.width}x{info.screen.height}</div>
              <div>Available: {info.screen.availWidth}x{info.screen.availHeight}</div>
              <div>Color Depth: {info.screen.colorDepth} bits</div>
              <div>Window: {info.window.width}x{info.window.height}</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-black/50 border-white/20">
          <CardBody className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">System</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <div>Platform: {info.platform}</div>
              <div>User Agent: {info.userAgent}</div>
              <div>Language: {info.language}</div>
              <div>Hardware Concurrency: {info.hardwareConcurrency} cores</div>
              {info.deviceMemory && <div>Device Memory: {info.deviceMemory} GB</div>}
              <div>Timezone: {info.timezone}</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-black/50 border-white/20">
          <CardBody className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Network className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Network & Location</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <div>Current URL: {info.location.href}</div>
              <div>Origin: {info.location.origin}</div>
              <div>Protocol: {info.location.protocol}</div>
              <div>Host: {info.location.host}</div>
              <div>Online: {info.onLine ? 'Yes' : 'No'}</div>
              <div>In Iframe: {info.inIframe ? 'Yes' : 'No'}</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-black/50 border-white/20">
          <CardBody className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <HardDrive className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Capabilities</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <div>Local Storage: {info.localStorage ? 'Available' : 'Not Available'}</div>
              <div>Session Storage: {info.sessionStorage ? 'Available' : 'Not Available'}</div>
              <div>Geolocation: {info.geolocation ? 'Available' : 'Not Available'}</div>
              <div>Media Devices: {info.mediaDevices ? 'Available' : 'Not Available'}</div>
              <div>WebGL: {info.webGL ? 'Available' : 'Not Available'}</div>
              <div>Cookies: {info.cookieEnabled ? 'Enabled' : 'Disabled'}</div>
            </div>
          </CardBody>
        </Card>

        {info.inIframe && (
          <Card className="bg-yellow-500/20 border-yellow-500/50">
            <CardBody className="p-4">
              <div className="flex items-center gap-2 text-yellow-400">
                <AlertCircle className="w-5 h-5" />
                <div>
                  <div className="font-semibold">Running in iframe</div>
                  <div className="text-sm text-yellow-300 mt-1">
                    Use the Terminal "escape" command to try breaking out of iframe restrictions.
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}

