/**
 * Start Desktop API
 * Uses BrowserBackend which is always available
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
module.exports = async function handler(req, res) {
  // CORS headers
  const origin = req.headers?.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // BrowserBackend simulates desktop startup
    // In a real implementation, this would start a container
    // For now, return a simulated response
    const containerId = `desktop-${Date.now()}`;
    const port = 8080;
    
    // Use the current origin for VNC URL
    const vncUrl = `${req.headers.origin || 'http://localhost:8080'}/vnc.html`;

    res.status(200).json({
      success: true,
      containerId,
      port,
      vncUrl,
      backend: 'browser',
    });
  } catch (error) {
    console.error('Desktop start error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

