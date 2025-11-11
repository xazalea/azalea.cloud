import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // Set CORS headers first
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    // Get target path from query parameter
    const pathParam = req.query?.path;
    let targetPath = '';
    
    if (pathParam) {
      if (Array.isArray(pathParam)) {
        targetPath = pathParam.join('/');
      } else {
        targetPath = String(pathParam);
      }
    }

    if (!targetPath) {
      res.status(400).json({ error: 'Path parameter required' });
      return;
    }

    // Build target URL
    const baseUrl = 'https://shell.cloud.google.com';
    let targetUrl: string;
    
    try {
      // Ensure path starts with /
      const cleanPath = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
      const url = new URL(cleanPath, baseUrl);
      targetUrl = url.toString();
    } catch (urlError) {
      res.status(400).json({ 
        error: 'Invalid URL path',
        message: urlError instanceof Error ? urlError.message : 'Failed to construct URL'
      });
      return;
    }

    // Prepare headers for proxy request
    const proxyHeaders: Record<string, string> = {
      'User-Agent': (req.headers?.['user-agent'] as string) || 'Mozilla/5.0 (compatible; AzaleaCloud/1.0)',
      'Accept': (req.headers?.['accept'] as string) || 'application/json, text/plain, */*',
    };

    // Add content type if present
    const contentType = req.headers?.['content-type'];
    if (contentType && typeof contentType === 'string') {
      proxyHeaders['Content-Type'] = contentType;
    }

    // Add cookies if present
    const cookie = req.headers?.['cookie'];
    if (cookie && typeof cookie === 'string') {
      proxyHeaders['Cookie'] = cookie;
    }

    // Prepare request body
    let requestBody: string | undefined = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      if (req.body !== undefined && req.body !== null) {
        if (typeof req.body === 'string') {
          requestBody = req.body;
        } else {
          try {
            requestBody = JSON.stringify(req.body);
          } catch {
            requestBody = String(req.body);
          }
        }
      }
    }

    // Forward request to Cloud Shell
    const proxyResponse = await fetch(targetUrl, {
      method: req.method || 'GET',
      headers: proxyHeaders,
      body: requestBody,
    });

    // Get response data
    const responseContentType = proxyResponse.headers.get('content-type') || '';
    let responseData: any;
    const isJson = responseContentType.includes('application/json');

    try {
      responseData = isJson ? await proxyResponse.json() : await proxyResponse.text();
    } catch {
      // If parsing fails, try text
      try {
        responseData = await proxyResponse.text();
      } catch {
        res.status(502).json({ error: 'Failed to read response from Cloud Shell' });
        return;
      }
    }

    // Forward response headers (except problematic ones)
    proxyResponse.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (!['access-control-allow-origin', 'content-encoding', 'transfer-encoding'].includes(lowerKey)) {
        try {
          res.setHeader(key, value);
        } catch {
          // Ignore header setting errors
        }
      }
    });

    // Send response
    if (isJson) {
      res.status(proxyResponse.status).json(responseData);
    } else {
      res.status(proxyResponse.status).send(responseData);
    }

  } catch (error) {
    console.error('Proxy error:', error);
    // Return error response
    if (!res.headersSent) {
      res.status(500).json({
        error: {
          code: '500',
          message: error instanceof Error ? error.message : 'A server error has occurred',
        },
      });
    }
  }
}
