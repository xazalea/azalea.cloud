import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Auth Token API
 * Provides access tokens for Cloud Shell auto-authentication
 * Uses service account or metadata server tokens
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // CORS headers
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

    // Always return null token - Cloud Shell will handle its own authentication
    // We're not running in GCP, so no metadata server token is available
    return res.status(200).json({
      token: null,
      message: 'No token available - Cloud Shell will handle authentication',
    });
  } catch (error) {
    console.error('Error getting token:', error);
    if (!res.headersSent) {
      return res.status(200).json({
        token: null,
        message: 'No token available - Cloud Shell will handle authentication',
        error: error instanceof Error ? error.message : 'Failed to get token',
      });
    }
  }
}

