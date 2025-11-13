import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Backend Health Check API
 * Uses BrowserBackend which is always available
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // CORS headers
    const origin = req.headers?.origin;
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    // BrowserBackend is always available - return success
    res.status(200).json({
      status: 'ok',
      timestamp: Date.now(),
      backend: 'browser',
    });
  } catch (error) {
    console.error('Backend health error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

