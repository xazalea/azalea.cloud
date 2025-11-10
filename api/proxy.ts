/**
 * Proxy API
 * Proxies requests to localhost services through Vercel
 * Based on vercel-tunnel proxy implementation
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  const port = req.query.port as string;
  let targetPath = (req.query.path as string) || '/';
  
  // Decode the path if it was encoded
  try {
    targetPath = decodeURIComponent(targetPath);
  } catch (e) {
    // If decoding fails, use as-is
  }

  if (!port) {
    return res.status(400).json({ error: 'Port parameter required' });
  }

  try {
    // For Vercel, we can't access localhost directly from serverless functions
    // The service must be running in a way that's accessible
    // Options:
    // 1. Service runs in WebVM (accessible via fetch)
    // 2. Service is publicly deployed
    // 3. Daemon is running and connected via WebSocket
    
    // Try to proxy to the service
    // In a WebVM environment, localhost:port might be accessible
    // In a real deployment, this would go through the tunnel daemon
    
    const targetUrl = `http://localhost:${port}${targetPath}`;
    
    try {
      const proxyResponse = await fetch(targetUrl, {
        method: req.method || 'GET',
        headers: {
          'User-Agent': 'AzaleaCloud-Proxy',
          ...(req.headers as Record<string, string>),
        },
        body: req.method !== 'GET' && req.method !== 'HEAD' 
          ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body))
          : undefined,
      });

      const responseBody = await proxyResponse.text();
      
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      // Copy headers
      proxyResponse.headers.forEach((value, key) => {
        if (key.toLowerCase() !== 'content-encoding' && key.toLowerCase() !== 'content-length') {
          res.setHeader(key, value);
        }
      });

      return res.status(proxyResponse.status).send(responseBody);
    } catch (fetchError) {
      // If localhost fetch fails, return helpful error
      return res.status(502).json({
        error: 'Service Unavailable',
        message: `Unable to connect to localhost:${port}. This is expected in Vercel serverless functions.`,
        solution: 'To use desktop tunneling, you need to:',
        options: [
          '1. Run the tunnel daemon locally: node backend/vercelTunnelDaemon.js localhost:8080 wss://your-app.vercel.app/api/tunnel/accept',
          '2. Or deploy your desktop service publicly and use its URL directly',
          '3. Or use WebVM backend which can access localhost services',
        ],
        note: 'The proxy API works when the service is accessible from the Vercel function environment.',
      });
    }
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(502).json({
      error: error instanceof Error ? error.message : 'Proxy error',
      message: 'Unable to connect to tunnel service.',
    });
  }
}

