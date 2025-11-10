import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Cloud Shell Proxy API
 * Proxies requests to Google Cloud Shell to bypass CORS restrictions
 * Adds authentication automatically
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Get the path from query or from X-Original-URL header
    let targetPath = '';
    let originalUrl = req.headers['x-original-url'] as string;
    
    if (originalUrl) {
      // Extract path and query from original URL
      try {
        const url = new URL(originalUrl);
        targetPath = url.pathname + url.search;
      } catch {
        // If URL parsing fails, use as-is
        targetPath = originalUrl.replace('https://shell.cloud.google.com', '');
      }
    } else {
      // Fallback to query parameter
      const { path, ...queryParams } = req.query;
      targetPath = Array.isArray(path) ? path.join('/') : path || '';
      
      // Add query parameters to path
      const queryString = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (key !== 'path' && value) {
          if (Array.isArray(value)) {
            value.forEach(v => queryString.append(key, String(v)));
          } else {
            queryString.append(key, String(value));
          }
        }
      });
      
      if (queryString.toString()) {
        targetPath += (targetPath.includes('?') ? '&' : '?') + queryString.toString();
      }
    }

    if (!targetPath) {
      res.status(400).json({ error: 'Path parameter required' });
      return;
    }

    // Get access token for authentication
    let accessToken: string | null = null;
    
    try {
      // Try metadata server (if running in GCP)
      const metadataResponse = await fetch(
        'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
        {
          headers: { 'Metadata-Flavor': 'Google' },
          signal: AbortSignal.timeout(1000),
        }
      );

      if (metadataResponse.ok) {
        const data = await metadataResponse.json();
        accessToken = data.access_token;
      }
    } catch (err) {
      // Not in GCP - that's okay, expected
    }

    // Build target URL
    const baseUrl = 'https://shell.cloud.google.com';
    const url = new URL(targetPath.startsWith('/') ? targetPath : `/${targetPath}`, baseUrl);

    // Forward the request to Cloud Shell
    const proxyResponse = await fetch(url.toString(), {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
        ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
        'User-Agent': req.headers['user-agent'] || 'AzaleaCloud/1.0',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    // Get response data
    const data = await proxyResponse.text();
    
    // Forward response headers
    proxyResponse.headers.forEach((value, key) => {
      // Skip CORS headers and security headers
      if (!['access-control-allow-origin', 'x-frame-options', 'content-security-policy'].includes(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });

    res.status(proxyResponse.status).send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Proxy request failed',
    });
  }
}

