import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * JavaScript Error Logger API
 * Handles error reporting from Cloud Shell and other scripts
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Log the error (in production, you'd want to send this to a logging service)
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('JavaScript error reported:', {
      query: req.query,
      body: req.body,
        method: req.method,
    });
    
    // Return success - we've logged it
      if (!res.headersSent) {
    res.status(200).json({ success: true });
      }
    return;
  }

    // GET/DELETE/any other requests - just return success
    if (!res.headersSent) {
  res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error('Error in jserror handler:', error);
    if (!res.headersSent) {
      res.status(200).json({ 
        success: true,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

