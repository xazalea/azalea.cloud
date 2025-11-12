import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Stop VM API Endpoint
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { vmId } = req.query;

    if (!vmId || typeof vmId !== 'string') {
      return res.status(400).json({ error: 'VM ID is required' });
    }

    // In production, this would stop the VM using SpinUp VM service
    return res.status(200).json({
      success: true,
      message: `VM ${vmId} stopped successfully`,
    });
  } catch (error) {
    console.error('VM stop error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to stop VM',
    });
  }
}

