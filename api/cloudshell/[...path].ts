import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Cloud Shell API Proxy
 * Handles all /cloudshell/* requests and proxies them to Google Cloud Shell
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
    // Get the path from the catch-all route
    const path = req.query.path as string[] | string;
    const pathStr = Array.isArray(path) ? path.join('/') : path || '';
    
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

    // Build target URL to Google Cloud Shell
    const baseUrl = 'https://shell.cloud.google.com';
    const targetPath = pathStr ? `/${pathStr}` : '/';
    const url = new URL(targetPath, baseUrl);
    
    // Add query parameters from original request
    Object.entries(req.query).forEach(([key, value]) => {
      if (key !== 'path' && value) {
        if (Array.isArray(value)) {
          value.forEach(v => url.searchParams.append(key, String(v)));
        } else {
          url.searchParams.append(key, String(value));
        }
      }
    });

    // Forward the request to Cloud Shell
    let proxyResponse: Response;
    try {
      proxyResponse = await fetch(url.toString(), {
        method: req.method,
        headers: {
          'Content-Type': req.headers['content-type'] || 'application/json',
          ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
          'User-Agent': req.headers['user-agent'] || 'AzaleaCloud/1.0',
          // Forward other important headers
          ...(req.headers['cookie'] && { 'Cookie': req.headers['cookie'] }),
          ...(req.headers['referer'] && { 'Referer': req.headers['referer'] }),
        },
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

    // Get response data
    const contentType = proxyResponse.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    let data: any;
    
    try {
      data = isJson ? await proxyResponse.json() : await proxyResponse.text();
    } catch (err) {
      // If parsing fails, try to get as text
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

    // Set content type explicitly
    if (isJson) {
      res.setHeader('Content-Type', 'application/json');
    }

    return res.status(proxyResponse.status).send(isJson ? JSON.stringify(data) : data);
  } catch (error) {
    console.error('Cloud Shell proxy error:', error);
    // Make sure we haven't already sent a response
    if (!res.headersSent) {
      return res.status(500).json({
        error: error instanceof Error ? error.message : 'Proxy request failed',
      });
    }
  }
}

