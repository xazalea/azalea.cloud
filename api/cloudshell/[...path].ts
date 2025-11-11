import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Get path from catch-all route
    const path = req.query.path;
    const pathStr = Array.isArray(path) ? path.join('/') : (path ? String(path) : '');

    // Build target URL
    const baseUrl = 'https://shell.cloud.google.com';
    const targetPath = pathStr ? `/${pathStr}` : '/';
    
    let targetUrl: string;
    try {
      const url = new URL(targetPath, baseUrl);
      // Add query parameters from original request
      if (req.query) {
        Object.entries(req.query).forEach(([key, value]) => {
          if (key !== 'path' && value !== undefined && value !== null) {
            try {
              if (Array.isArray(value)) {
                value.forEach(v => url.searchParams.append(key, String(v)));
              } else {
                url.searchParams.append(key, String(value));
              }
            } catch {
              // Ignore invalid query params
            }
          }
        });
      }
      targetUrl = url.toString();
    } catch (urlError) {
      return res.status(400).json({ 
        error: 'Invalid URL path',
        message: urlError instanceof Error ? urlError.message : 'Failed to construct URL'
      });
    }

    // Prepare headers
    const proxyHeaders: Record<string, string> = {
      'User-Agent': (req.headers?.['user-agent'] as string) || 'AzaleaCloud/1.0',
    };

    const contentType = req.headers?.['content-type'];
    if (contentType && typeof contentType === 'string') {
      proxyHeaders['Content-Type'] = contentType;
    }

    const cookie = req.headers?.['cookie'];
    if (cookie && typeof cookie === 'string') {
      proxyHeaders['Cookie'] = cookie;
    }

    // Prepare body
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

    // Forward request
    const proxyResponse = await fetch(targetUrl, {
      method: req.method || 'GET',
      headers: proxyHeaders,
      body: requestBody,
    });

    // Get response data
    const responseContentType = proxyResponse.headers.get('content-type') || '';
    const isJson = responseContentType.includes('application/json');
    let responseData: any;

    try {
      responseData = isJson ? await proxyResponse.json() : await proxyResponse.text();
    } catch {
      try {
        responseData = await proxyResponse.text();
      } catch {
        return res.status(502).json({ error: 'Failed to read response from Cloud Shell' });
      }
    }

    // Forward headers
    proxyResponse.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (!['access-control-allow-origin', 'content-encoding', 'transfer-encoding'].includes(lowerKey)) {
        try {
          res.setHeader(key, value);
        } catch {
          // Ignore header errors
        }
      }
    });

    // Send response
    if (isJson) {
      return res.status(proxyResponse.status).json(responseData);
    } else {
      return res.status(proxyResponse.status).send(responseData);
    }

  } catch (error) {
    console.error('Cloud Shell proxy error:', error);
    if (!res.headersSent) {
      return res.status(500).json({
        error: {
          code: '500',
          message: error instanceof Error ? error.message : 'A server error has occurred',
        },
      });
    }
  }
}
