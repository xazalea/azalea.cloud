import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Cloud Shell Proxy API
 * Proxies requests to Google Cloud Shell to bypass CORS restrictions
 * Adds authentication automatically
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Ensure we only send one response
  let responseSent = false;
  
  const sendResponse = (status: number, data: any) => {
    if (responseSent) {
      console.warn('Attempted to send response twice, ignoring');
      return;
    }
    responseSent = true;
    res.status(status).json(data);
  };

  const sendTextResponse = (status: number, data: string) => {
    if (responseSent) {
      console.warn('Attempted to send response twice, ignoring');
      return;
    }
    responseSent = true;
    res.status(status).send(data);
  };

  try {
    // CORS headers - set first
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

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
      targetPath = Array.isArray(path) ? path.join('/') : (path || '');
      
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
      sendResponse(400, { error: 'Path parameter required' });
      return;
    }

    // Check if fetch is available (should always be available in Vercel)
    if (typeof fetch === 'undefined') {
      sendResponse(500, {
        error: 'fetch API not available',
        message: 'Server runtime does not support fetch API',
      });
      return;
    }

    // Get access token for authentication
    let accessToken: string | null = null;
    
    try {
      // Try metadata server (if running in GCP)
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
          accessToken = data.access_token;
        }
      } catch (fetchError) {
        if (timeoutId) clearTimeout(timeoutId);
        // Not in GCP - that's okay, expected
      }
    } catch (err) {
      // Not in GCP - that's okay, expected
    }

    // Build target URL - properly handle path and query string
    const baseUrl = 'https://shell.cloud.google.com';
    let url: URL;
    try {
      // Separate path and query string
      const [pathPart, queryPart] = targetPath.split('?');
      const cleanPath = pathPart.startsWith('/') ? pathPart : `/${pathPart}`;
      
      // Construct URL with base
      url = new URL(cleanPath, baseUrl);
      
      // Add query string if present
      if (queryPart) {
        const params = new URLSearchParams(queryPart);
        params.forEach((value, key) => {
          url.searchParams.append(key, value);
        });
      }
    } catch (urlError) {
      console.error('Invalid URL construction:', urlError, 'targetPath:', targetPath);
      sendResponse(400, {
        error: 'Invalid URL path',
        message: urlError instanceof Error ? urlError.message : 'Failed to construct URL',
      });
      return;
    }

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
      sendResponse(502, {
        error: 'Failed to connect to Cloud Shell',
        message: fetchError instanceof Error ? fetchError.message : 'Unknown error',
      });
      return;
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
        sendResponse(502, {
          error: 'Failed to read response from Cloud Shell',
        });
        return;
      }
    }
    
    // Forward response headers (except CORS and security headers)
    if (!responseSent) {
      proxyResponse.headers.forEach((value, key) => {
        const lowerKey = key.toLowerCase();
        if (!['access-control-allow-origin', 'x-frame-options', 'content-security-policy', 'content-encoding', 'transfer-encoding'].includes(lowerKey)) {
          try {
            res.setHeader(key, value);
          } catch (headerError) {
            // Ignore header setting errors (e.g., invalid header values)
            console.warn(`Failed to set header ${key}:`, headerError);
          }
        }
      });

      // Set content type explicitly based on what we got
      if (isJson) {
        res.setHeader('Content-Type', 'application/json');
      }

      sendTextResponse(proxyResponse.status, isJson ? JSON.stringify(data) : data);
    }
    return;
  } catch (error) {
    console.error('Proxy error:', error);
    // Always return a response, even on error
    if (!responseSent && !res.headersSent) {
      sendResponse(500, {
        error: {
          code: '500',
          message: error instanceof Error ? error.message : 'A server error has occurred',
        },
      });
    }
    return;
  }
}

