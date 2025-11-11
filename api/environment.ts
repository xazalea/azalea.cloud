import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    // Simple response - always return false
    res.status(200).json({
      isCloudEnvironment: false,
    });
  } catch (error) {
    console.error('Environment API error:', error);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Internal server error',
        isCloudEnvironment: false 
      });
    }
  }
}
