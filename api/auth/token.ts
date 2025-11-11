import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Auth Token API
 * Provides access tokens for Cloud Shell auto-authentication
 * Uses service account or metadata server tokens
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  let responseSent = false;
  
  const sendResponse = (status: number, data: any) => {
    if (responseSent || res.headersSent) {
      if (!responseSent) {
        console.warn('Response already sent, ignoring duplicate');
      }
      return;
    }
    responseSent = true;
    res.status(status).json(data);
  };

  try {
    // CORS headers - set first
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (req.method !== 'GET') {
      sendResponse(405, { error: 'Method not allowed' });
      return;
    }

    // Always return null token - Cloud Shell will handle its own authentication
    // We're not running in GCP, so no metadata server token is available
    sendResponse(200, {
      token: null,
      message: 'No token available - Cloud Shell will handle authentication',
    });
    return;
  } catch (error) {
    console.error('Error getting token:', error);
    // Always return a response, even on error
    sendResponse(200, {
      token: null,
      message: 'No token available - Cloud Shell will handle authentication',
      error: error instanceof Error ? error.message : 'Failed to get token',
    });
    return;
  }
}

