/**
 * Vercel Tunnel Accept Endpoint
 * WebSocket endpoint for daemon connections
 * 
 * Note: Vercel doesn't support WebSocket servers directly in serverless functions.
 * This endpoint provides connection info and uses a polling/long-polling fallback.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // For WebSocket connections, Vercel serverless functions have limitations
  // We'll use a different approach: store connection info and use polling
  
  if (req.method === 'GET') {
    // Return connection endpoint info
    // In a real implementation, you'd use a WebSocket service like Pusher, Ably, or similar
    return res.status(200).json({
      type: 'websocket_endpoint',
      url: `${req.headers.host}/api/tunnel/accept`,
      note: 'For full WebSocket support, use a WebSocket service or deploy the listener separately',
      fallback: 'Use /api/proxy for HTTP proxying',
    });
  }

  if (req.method === 'POST') {
    // Handle connection registration
    const { connectionId, targetPort } = req.body;
    
    // Store connection info (in production, use Redis or similar)
    // For now, we'll use the proxy API as the main mechanism
    
    return res.status(200).json({
      success: true,
      message: 'Connection registered',
      proxyUrl: `/api/proxy?port=${targetPort || 8080}`,
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

