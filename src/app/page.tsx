'use client';

import { useState } from 'react';
import { Button, Card, CardBody, Tabs, Tab } from '@heroui/react';
import { Monitor, Cloud, Zap, Shield, Moon, Sun, Globe } from 'lucide-react';
import { DesktopViewer } from '@/components/DesktopViewer';
import { WebDesktop } from '@/components/WebDesktop';
import { GoogleProxy } from '@/components/GoogleProxy';
import { useTheme } from 'next-themes';

export default function Home() {
  const [activeTab, setActiveTab] = useState('proxy');
  const { theme, setTheme } = useTheme();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cloud className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AzaleaCloud
            </h1>
          </div>
          <Button
            isIconOnly
            variant="light"
            onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-white"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
          className="w-full"
          classNames={{
            tabList: 'bg-black/20 backdrop-blur-md',
            tab: 'text-white data-[selected=true]:text-purple-400',
            panel: 'mt-4',
          }}
        >
          <Tab
            key="proxy"
            title={
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Google Proxy</span>
              </div>
            }
          >
            <GoogleProxy />
          </Tab>
          <Tab
            key="desktop"
            title={
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                <span>Desktop</span>
              </div>
            }
          >
            <WebDesktop />
          </Tab>
          <Tab
            key="vnc"
            title={
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                <span>VNC (Direct)</span>
              </div>
            }
          >
            <DesktopViewer />
          </Tab>
          <Tab
            key="about"
            title={
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>About</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <Card className="bg-black/20 backdrop-blur-md border border-white/10">
                <CardBody className="p-6">
                  <Monitor className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Full Desktop Access</h3>
                  <p className="text-gray-300">
                    Access complete Windows 10 desktop environment with full keyboard and mouse support.
                  </p>
                </CardBody>
              </Card>
              <Card className="bg-black/20 backdrop-blur-md border border-white/10">
                <CardBody className="p-6">
                  <Zap className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                  <p className="text-gray-300">
                    Optimized for speed with low latency connections and efficient rendering.
                  </p>
                </CardBody>
              </Card>
              <Card className="bg-black/20 backdrop-blur-md border border-white/10">
                <CardBody className="p-6">
                  <Shield className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Secure</h3>
                  <p className="text-gray-300">
                    Encrypted connections ensure your sessions are private and secure.
                  </p>
                </CardBody>
              </Card>
            </div>
          </Tab>
        </Tabs>
      </div>
    </main>
  );
}

