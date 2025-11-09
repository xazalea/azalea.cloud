'use client';

import { useState } from 'react';
import { Button, Card, CardBody, Input } from '@heroui/react';
import { Globe, ExternalLink, Copy, Check } from 'lucide-react';

export function GoogleProxy() {
  const [targetUrl, setTargetUrl] = useState('');
  const [proxyUrl, setProxyUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const generateProxyUrl = (url: string) => {
    if (!url.trim()) return '';
    // Google Translate proxy format
    const encodedUrl = encodeURIComponent(url);
    return `https://translate.google.com/translate?sl=auto&tl=en&u=${encodedUrl}`;
  };

  const handleGenerate = () => {
    if (targetUrl.trim()) {
      const proxy = generateProxyUrl(targetUrl);
      setProxyUrl(proxy);
      setCopied(false);
    }
  };

  const handleCopy = () => {
    if (proxyUrl) {
      navigator.clipboard.writeText(proxyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const quickLinks = [
    { name: 'Escape Page', url: `${window.location.origin}/escape` },
    { name: 'Desktop', url: `${window.location.origin}/desktop` },
    { name: 'Terminal', url: `${window.location.origin}/terminal` },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-black/20 backdrop-blur-md border border-white/10">
        <CardBody className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Google Proxy Integration</h2>
          <p className="text-gray-300 mb-6">
            Generate Google Translate proxy URLs to access pages through Google's Windows device.
            This allows you to escape single-page restrictions and access the full desktop.
          </p>

          <div className="space-y-4">
            <Input
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="Enter URL to proxy (e.g., https://example.com)"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleGenerate();
                }
              }}
              classNames={{
                input: 'text-white',
                inputWrapper: 'bg-black/50 border-white/20',
              }}
              startContent={<Globe className="w-4 h-4 text-gray-400" />}
            />

            <Button
              color="primary"
              onPress={handleGenerate}
              isDisabled={!targetUrl.trim()}
              className="w-full"
            >
              Generate Proxy URL
            </Button>

            {proxyUrl && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    value={proxyUrl}
                    readOnly
                    classNames={{
                      input: 'text-white text-sm',
                      inputWrapper: 'bg-black/50 border-white/20',
                    }}
                  />
                  <Button
                    isIconOnly
                    variant="flat"
                    onPress={handleCopy}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <Button
                  color="secondary"
                  variant="flat"
                  onPress={() => window.open(proxyUrl, '_blank')}
                  startContent={<ExternalLink className="w-4 h-4" />}
                  className="w-full"
                >
                  Open in New Tab
                </Button>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      <Card className="bg-black/20 backdrop-blur-md border border-white/10">
        <CardBody className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <p className="text-gray-300 mb-4 text-sm">
            Click to generate proxy URLs for these pages:
          </p>
          <div className="space-y-2">
            {quickLinks.map((link, index) => (
              <Button
                key={index}
                variant="flat"
                className="w-full justify-start"
                onPress={() => {
                  setTargetUrl(link.url);
                  setProxyUrl(generateProxyUrl(link.url));
                }}
              >
                <Globe className="w-4 h-4 mr-2" />
                {link.name}
              </Button>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className="bg-yellow-500/20 border-yellow-500/50">
        <CardBody className="p-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">How It Works</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-300">
            <li>Enter a URL or use a quick link above</li>
            <li>Generate the Google proxy URL</li>
            <li>Open the proxy URL - it loads through Google's Windows device</li>
            <li>Use the escape tools on that page to break out of single-page restriction</li>
            <li>Access the full Windows 10 desktop on Google's device</li>
          </ol>
        </CardBody>
      </Card>
    </div>
  );
}

