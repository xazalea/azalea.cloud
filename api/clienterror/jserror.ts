import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * JavaScript Error Logger API
 * Handles error reporting from Cloud Shell and other scripts
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers - set first
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Log the error (in production, you'd want to send this to a logging service)
    if (req.method === 'POST' || req.method === 'PUT') {
      console.log('JavaScript error reported:', {
        query: req.query,
        body: req.body,
        method: req.method,
      });
    }

    // Always return success - we've logged it (or it's a GET request)
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in jserror handler:', error);
    // Always return a response, even on error
    return res.status(200).json({ 
      success: true,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

