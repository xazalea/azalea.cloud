import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * JavaScript Error Logger API
 * Handles error reporting from Cloud Shell and other scripts
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Log the error (in production, you'd want to send this to a logging service)
  if (req.method === 'POST') {
    console.log('JavaScript error reported:', {
      query: req.query,
      body: req.body,
    });
    
    // Return success - we've logged it
    res.status(200).json({ success: true });
    return;
  }

  // GET requests - just return success
  res.status(200).json({ success: true });
}

