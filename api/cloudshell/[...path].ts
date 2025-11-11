import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Cloud Shell API Proxy
 * Handles all /cloudshell/* requests and proxies them to Google Cloud Shell
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  let responseSent = false;
  
  const sendResponse = (status: number, data: any) => {
    if (responseSent || res.headersSent) {
      if (!responseSent) {
        console.warn('Response already sent, ignoring duplicate');
      }
      return;
    }
    responseSent = true;
    res.status(status).json(data);
  };

  const sendTextResponse = (status: number, data: string) => {
    if (responseSent || res.headersSent) {
      if (!responseSent) {
        console.warn('Response already sent, ignoring duplicate');
      }
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
    let url: URL;
    try {
      url = new URL(targetPath, baseUrl);
      
      // Add query parameters from original request
      Object.entries(req.query).forEach(([key, value]) => {
        if (key !== 'path' && value) {
          try {
            if (Array.isArray(value)) {
              value.forEach(v => url.searchParams.append(key, String(v)));
            } else {
              url.searchParams.append(key, String(value));
            }
          } catch (paramError) {
            // Ignore invalid query parameters
            console.warn(`Failed to add query parameter ${key}:`, paramError);
          }
        }
      });
    } catch (urlError) {
      console.error('Invalid URL construction:', urlError, 'pathStr:', pathStr);
      sendResponse(400, {
        error: 'Invalid URL path',
        message: urlError instanceof Error ? urlError.message : 'Failed to construct URL',
      });
      return;
    }

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
      sendResponse(502, {
        error: 'Failed to connect to Cloud Shell',
        message: fetchError instanceof Error ? fetchError.message : 'Unknown error',
      });
      return;
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

      // Set content type explicitly
      if (isJson) {
        res.setHeader('Content-Type', 'application/json');
      }

      sendTextResponse(proxyResponse.status, isJson ? JSON.stringify(data) : data);
    }
    return;
  } catch (error) {
    console.error('Cloud Shell proxy error:', error);
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

