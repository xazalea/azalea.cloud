import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Unified VM API endpoint
 * Handles: /api/vm/provision, /api/vm/status/:vmId, /api/vm/stop/:vmId
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  const origin = req.headers?.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const path = req.query.path as string[];
  const pathStr = Array.isArray(path) ? path.join('/') : (path || '');

  try {
    // Route: /api/vm/provision
    if (pathStr === 'provision' && req.method === 'POST') {
      const { distribution, downloadUrl, memory, diskSize, cpuCores, architecture } = req.body;
      
      if (!distribution || !downloadUrl) {
        return res.status(400).json({ error: 'Distribution and downloadUrl are required' });
      }

      const vmId = `vm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Simulate VM provisioning
      return res.status(200).json({
        success: true,
        vmId,
        status: 'provisioning',
        message: 'VM provisioning started. This may take a few minutes.',
        vncUrl: `/api/vm/vnc/${vmId}`,
        sshUrl: `ssh://vm-${vmId}@azalea-cloud.vercel.app`,
      });
    }

    // Route: /api/vm/status/:vmId
    if (pathStr.startsWith('status/') && req.method === 'GET') {
      const vmId = pathStr.replace('status/', '');
      
      return res.status(200).json({
        success: true,
        vmId,
        status: 'ready',
        vncUrl: `/api/vm/vnc/${vmId}`,
        sshUrl: `ssh://vm-${vmId}@azalea-cloud.vercel.app`,
      });
    }

    // Route: /api/vm/stop/:vmId
    if (pathStr.startsWith('stop/') && (req.method === 'DELETE' || req.method === 'POST')) {
      const vmId = pathStr.replace('stop/', '');
      
      return res.status(200).json({
        success: true,
        message: `VM ${vmId} stopped successfully`,
      });
    }

    return res.status(404).json({ error: 'Not found' });
  } catch (error) {
    console.error('VM API error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'VM operation failed',
    });
  }
}

