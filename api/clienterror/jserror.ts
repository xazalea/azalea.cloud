import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * JavaScript Error Logger API
 * Handles error reporting from Cloud Shell and other scripts
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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    // Log the error (in production, you'd want to send this to a logging service)
    if (req.method === 'POST' || req.method === 'PUT') {
      try {
        console.log('JavaScript error reported:', {
          query: req.query,
          body: req.body,
          method: req.method,
        });
      } catch (logError) {
        // Ignore logging errors
        console.warn('Failed to log error:', logError);
      }
    }

    // Always return success - we've logged it (or it's a GET request)
    sendResponse(200, { success: true });
    return;
  } catch (error) {
    console.error('Error in jserror handler:', error);
    // Always return a response, even on error
    sendResponse(200, { 
      success: true,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return;
  }
}

