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
    // Check if fetch is available
    if (typeof fetch === 'undefined') {
      // fetch not available - return null token
      return res.status(200).json({
        token: null,
        message: 'No token available - Cloud Shell will handle authentication',
      });
    }

    // Try to get token from metadata server (if running in GCP)
    let token: string | null = null;

    try {
      // Use AbortController for timeout compatibility if available
      let timeoutId: NodeJS.Timeout | null = null;
      let signal: AbortSignal | undefined = undefined;
      
      try {
        if (typeof AbortController !== 'undefined') {
          const controller = new AbortController();
          timeoutId = setTimeout(() => controller.abort(), 1000);
          signal = controller.signal;
        }
        
        const fetchOptions: RequestInit = {
          headers: { 'Metadata-Flavor': 'Google' },
        };
        
        if (signal) {
          fetchOptions.signal = signal;
        }
        
        const metadataResponse = await fetch(
          'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
          fetchOptions
        );

        if (timeoutId) clearTimeout(timeoutId);

        if (metadataResponse.ok) {
          const data = await metadataResponse.json();
          token = data.access_token;
        }
      } catch (fetchError) {
        if (timeoutId) clearTimeout(timeoutId);
        // Not in GCP environment - that's okay, expected
        // This will fail when not in GCP, and that's fine
      }
    } catch (err) {
      // Not in GCP environment - that's okay, expected
      // This will fail in browser due to mixed content, and that's fine
    }

    // If no token from metadata server, return null
    // Cloud Shell will handle its own authentication
    if (!token) {
      if (!res.headersSent) {
        return res.status(200).json({
          token: null,
          message: 'No token available - Cloud Shell will handle authentication',
        });
      }
      return;
    }

    if (!res.headersSent) {
      return res.status(200).json({
        token,
        expires_in: 3600,
        token_type: 'Bearer',
      });
    }
  } catch (error) {
    console.error('Error getting token:', error);
    if (!res.headersSent) {
      return res.status(200).json({
        token: null,
        message: 'No token available - Cloud Shell will handle authentication',
        error: error instanceof Error ? error.message : 'Failed to get token',
      });
    }
  }
}

