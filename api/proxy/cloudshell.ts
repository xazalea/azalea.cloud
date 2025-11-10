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
      // Use AbortController for timeout compatibility
      const controller = new AbortController();
      let timeoutId: NodeJS.Timeout | null = null;
      
      try {
        timeoutId = setTimeout(() => controller.abort(), 1000);
        
        const metadataResponse = await fetch(
          'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
          {
            headers: { 'Metadata-Flavor': 'Google' },
            signal: controller.signal,
          }
        );

        if (timeoutId) clearTimeout(timeoutId);

        if (metadataResponse.ok) {
          const data = await metadataResponse.json();
          accessToken = data.access_token;
        }
      } catch (fetchError) {
        if (timeoutId) clearTimeout(timeoutId);
        // Not in GCP - that's okay, expected
      }
    } catch (err) {
      // Not in GCP - that's okay, expected
    }

    // Build target URL
    const baseUrl = 'https://shell.cloud.google.com';
    const url = new URL(targetPath.startsWith('/') ? targetPath : `/${targetPath}`, baseUrl);

    // Forward the request to Cloud Shell with proper headers
    const proxyHeaders: Record<string, string> = {
      'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0 (compatible; AzaleaCloud/1.0)',
      'Accept': req.headers['accept'] || 'application/json, text/plain, */*',
      'Accept-Language': req.headers['accept-language'] || 'en-US,en;q=0.9',
    };

    // Add content type if present
    if (req.headers['content-type']) {
      proxyHeaders['Content-Type'] = req.headers['content-type'];
    }

    // Add authorization if we have a token
    if (accessToken) {
      proxyHeaders['Authorization'] = `Bearer ${accessToken}`;
    }

    // Add cookies if present (for session)
    if (req.headers['cookie']) {
      proxyHeaders['Cookie'] = req.headers['cookie'];
    }

    // Forward the request
    let proxyResponse: Response;
    try {
      proxyResponse = await fetch(url.toString(), {
        method: req.method,
        headers: proxyHeaders,
        body: req.method !== 'GET' && req.method !== 'HEAD' 
          ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body))
          : undefined,
      });
    } catch (fetchError) {
      console.error('Failed to fetch from Cloud Shell:', fetchError);
      return res.status(502).json({
        error: 'Failed to connect to Cloud Shell',
        message: fetchError instanceof Error ? fetchError.message : 'Unknown error',
      });
    }

    // Get response data - try JSON first, fallback to text
    const contentType = proxyResponse.headers.get('content-type') || '';
    let data: any;
    let isJson = false;
    
    try {
      if (contentType.includes('application/json')) {
        data = await proxyResponse.json();
        isJson = true;
      } else {
        data = await proxyResponse.text();
      }
    } catch (err) {
      // If parsing fails, get as text
      try {
        data = await proxyResponse.text();
      } catch (textError) {
        console.error('Failed to read response:', textError);
        return res.status(502).json({
          error: 'Failed to read response from Cloud Shell',
        });
      }
    }
    
    // Forward response headers (except CORS and security headers)
    proxyResponse.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (!['access-control-allow-origin', 'x-frame-options', 'content-security-policy', 'content-encoding', 'transfer-encoding'].includes(lowerKey)) {
        res.setHeader(key, value);
      }
    });

    // Set content type explicitly based on what we got
    if (isJson) {
      res.setHeader('Content-Type', 'application/json');
    }

    return res.status(proxyResponse.status).send(isJson ? JSON.stringify(data) : data);
  } catch (error) {
    console.error('Proxy error:', error);
    // Make sure we haven't already sent a response
    if (!res.headersSent) {
      return res.status(500).json({
        error: error instanceof Error ? error.message : 'Proxy request failed',
      });
    }
  }
}

