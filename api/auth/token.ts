import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Auth Token API
 * Provides access tokens for Cloud Shell auto-authentication
 * Uses service account or metadata server tokens
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Try to get token from metadata server (if running in GCP)
    let token: string | null = null;

    try {
      const metadataResponse = await fetch(
        'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
        {
          headers: { 'Metadata-Flavor': 'Google' },
          signal: AbortSignal.timeout(1000),
        }
      );

      if (metadataResponse.ok) {
        const data = await metadataResponse.json();
        token = data.access_token;
        console.log('Got token from metadata server');
      }
    } catch (err) {
      // Not in GCP environment - that's okay, expected in browser
      // Silently continue - we'll return null token
    }

    // If no token from metadata server, return null
    // Cloud Shell will handle its own authentication
    if (!token) {
      res.status(200).json({
        token: null,
        message: 'No token available - Cloud Shell will handle authentication',
      });
      return;
    }

    res.status(200).json({
      token,
      expires_in: 3600,
      token_type: 'Bearer',
    });
  } catch (error) {
    console.error('Error getting token:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to get token',
    });
  }
}

