import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Start Desktop API
 * Uses BrowserBackend which is always available
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  const origin = req.headers?.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // BrowserBackend simulates desktop startup
  // In a real implementation, this would start a container
  // For now, return a simulated response
  const containerId = `desktop-${Date.now()}`;
  const port = 8080;
  
  // Use the current origin for VNC URL
  const vncUrl = `${req.headers.origin || 'http://localhost:8080'}/vnc.html`;

  res.status(200).json({
    success: true,
    containerId,
    port,
    vncUrl,
    backend: 'browser',
  });
};

