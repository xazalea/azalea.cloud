/**
 * Proxy for gstatic.com resources (Cloud Shell scripts, CSS, etc.)
 * This bypasses CORS restrictions
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
module.exports = async function handler(req, res) {
  // CORS headers
  const origin = req.headers?.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Type, Content-Length');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const pathParam = req.query?.path;
    if (!pathParam) {
      res.status(400).json({ error: 'Path parameter required' });
      return;
    }

    const targetPath = Array.isArray(pathParam) ? pathParam.join('/') : String(pathParam);
    const cleanPath = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
    const targetUrl = new URL(cleanPath, 'https://www.gstatic.com').toString();

    const proxyHeaders: Record<string, string> = {
      'User-Agent': (req.headers?.['user-agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
      'Accept': req.headers?.['accept'] || '*/*',
      'Accept-Language': req.headers?.['accept-language'] || 'en-US,en;q=0.9',
    };

    // Forward referer and origin if present
    if (req.headers?.['referer']) {
      proxyHeaders['Referer'] = String(req.headers['referer']);
    }
    if (req.headers?.['origin']) {
      proxyHeaders['Origin'] = String(req.headers['origin']);
    }

    const proxyResponse = await fetch(targetUrl, {
      method: 'GET',
      headers: proxyHeaders,
      redirect: 'follow',
    });

    // Forward content type
    const contentType = proxyResponse.headers.get('content-type') || '';
    res.setHeader('Content-Type', contentType);

    // Forward cache headers
    if (proxyResponse.headers.get('cache-control')) {
      res.setHeader('Cache-Control', proxyResponse.headers.get('cache-control')!);
    }
    if (proxyResponse.headers.get('etag')) {
      res.setHeader('ETag', proxyResponse.headers.get('etag')!);
    }

    // Get the response data
    const data = await proxyResponse.arrayBuffer();

    // Send response
    res.status(proxyResponse.status);
    res.send(Buffer.from(data));
  } catch (error) {
    console.error('Gstatic proxy error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        error: {
          code: '500',
          message: error instanceof Error ? error.message : 'A server error has occurred',
        },
      });
    }
  }
};

