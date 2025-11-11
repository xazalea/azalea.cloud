import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Environment Check API
 * Checks if the server is running in a Google Cloud environment
 * This runs server-side, so it can safely access the metadata server
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
    // Try to access metadata server (only works if running in GCP)
    // Use AbortController for timeout compatibility
    const controller = new AbortController();
    let timeoutId: NodeJS.Timeout | null = null;
    
    try {
      timeoutId = setTimeout(() => controller.abort(), 1000);
      
      const response = await fetch(
        'http://metadata.google.internal/computeMetadata/v1/instance/',
        {
          headers: { 'Metadata-Flavor': 'Google' },
          signal: controller.signal,
        }
      );
      
      if (timeoutId) clearTimeout(timeoutId);
      
      return res.status(200).json({
        isCloudEnvironment: response.ok,
      });
    } catch (fetchError) {
      if (timeoutId) clearTimeout(timeoutId);
      // Not in GCP environment - that's okay
      // This is expected when not running in GCP
      return res.status(200).json({
        isCloudEnvironment: false,
      });
    }
  } catch (error) {
    // Catch any other errors
    console.error('Environment check error:', error);
    // Always return 200 with false - don't fail the request
    if (!res.headersSent) {
      return res.status(200).json({
        isCloudEnvironment: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

