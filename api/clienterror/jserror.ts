import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Log error if POST/PUT (silently ignore errors)
  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      console.log('JS Error:', {
        query: req.query,
        body: typeof req.body === 'string' ? req.body.substring(0, 200) : req.body,
      });
    } catch (e) {
      // Ignore logging errors
    }
  }

  // Always return success
  return res.status(200).json({ success: true });
}
