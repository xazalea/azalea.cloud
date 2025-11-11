import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Environment Check API
 * Checks if the server is running in a Google Cloud environment
 * This runs server-side, so it can safely access the metadata server
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

    // Always return false for now - we're not in GCP
    // This endpoint is mainly for checking, and we can safely assume false
    return res.status(200).json({
      isCloudEnvironment: false,
    });
  } catch (error) {
    // Catch any errors at any level
    console.error('Environment check error:', error);
    if (!res.headersSent) {
      return res.status(200).json({
        isCloudEnvironment: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

