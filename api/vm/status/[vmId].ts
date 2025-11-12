import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Get VM Status API Endpoint
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { vmId } = req.query;

    if (!vmId || typeof vmId !== 'string') {
      return res.status(400).json({ error: 'VM ID is required' });
    }

    // In production, this would check the actual VM status from SpinUp VM service
    // For now, return a mock status
    return res.status(200).json({
      success: true,
      vmId,
      status: 'ready', // or 'provisioning', 'error'
      vncUrl: `/api/vm/vnc/${vmId}`,
      sshUrl: `ssh://vm-${vmId}@azalea-cloud.vercel.app`,
    });
  } catch (error) {
    console.error('VM status error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to get VM status',
    });
  }
}

