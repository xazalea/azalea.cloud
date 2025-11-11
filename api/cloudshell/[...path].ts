/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const path = req.query.path;
    const pathStr = Array.isArray(path) ? path.join('/') : (path ? String(path) : '');
    const targetPath = pathStr ? `/${pathStr}` : '/';
    const targetUrl = new URL(targetPath, 'https://shell.cloud.google.com').toString();

    const proxyHeaders = {
      'User-Agent': (req.headers?.['user-agent'] || 'AzaleaCloud/1.0'),
      'Accept': (req.headers?.['accept'] || 'application/json, text/plain, */*'),
      'Accept-Language': (req.headers?.['accept-language'] || 'en-US,en;q=0.9'),
    };

    // Forward important headers
    if (req.headers?.['content-type']) {
      proxyHeaders['Content-Type'] = String(req.headers['content-type']);
    }
    if (req.headers?.['cookie']) {
      proxyHeaders['Cookie'] = String(req.headers['cookie']);
    }
    if (req.headers?.['authorization']) {
      proxyHeaders['Authorization'] = String(req.headers['authorization']);
    }
    if (req.headers?.['referer']) {
      proxyHeaders['Referer'] = String(req.headers['referer']);
    }
    if (req.headers?.['origin']) {
      proxyHeaders['Origin'] = String(req.headers['origin']);
    }

    let body = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const proxyResponse = await fetch(targetUrl, {
      method: req.method || 'GET',
      headers: proxyHeaders,
      body,
      redirect: 'manual', // Handle redirects manually
    });

    // Handle redirects (3xx status codes)
    if (proxyResponse.status >= 300 && proxyResponse.status < 400) {
      const location = proxyResponse.headers.get('location');
      if (location) {
        res.setHeader('Location', location);
        res.status(proxyResponse.status).end();
        return;
      }
    }

    const contentType = proxyResponse.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    let data;
    
    try {
      data = isJson ? await proxyResponse.json() : await proxyResponse.text();
    } catch (e) {
      // If parsing fails, try as text
      try {
        data = await proxyResponse.text();
      } catch {
        data = '';
      }
    }

    // Forward response headers (except problematic ones)
    proxyResponse.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (!['access-control-allow-origin', 'content-encoding', 'transfer-encoding', 'content-length'].includes(lowerKey)) {
        try {
          res.setHeader(key, value);
        } catch {}
      }
    });

    // Send response
    if (isJson && typeof data === 'object') {
      res.status(proxyResponse.status).json(data);
    } else {
      res.status(proxyResponse.status).send(data);
    }
  } catch (error) {
    console.error('Cloud Shell proxy error:', error);
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
