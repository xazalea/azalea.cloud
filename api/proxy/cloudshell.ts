import type { VercelRequest, VercelResponse } from '@vercel/node';

module.exports = async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

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
    const targetUrl = new URL(cleanPath, 'https://shell.cloud.google.com').toString();

    const proxyHeaders: Record<string, string> = {
      'User-Agent': (req.headers?.['user-agent'] as string) || 'Mozilla/5.0',
      'Accept': (req.headers?.['accept'] as string) || 'application/json',
    };

    if (req.headers?.['content-type']) {
      proxyHeaders['Content-Type'] = String(req.headers['content-type']);
    }
    if (req.headers?.['cookie']) {
      proxyHeaders['Cookie'] = String(req.headers['cookie']);
    }

    let body: string | undefined = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const proxyResponse = await fetch(targetUrl, {
      method: req.method || 'GET',
      headers: proxyHeaders,
      body,
    });

    const contentType = proxyResponse.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await proxyResponse.json() : await proxyResponse.text();

    proxyResponse.headers.forEach((value, key) => {
      if (!['access-control-allow-origin', 'content-encoding'].includes(key.toLowerCase())) {
        try {
          res.setHeader(key, value);
        } catch {}
      }
    });

    if (isJson) {
      res.status(proxyResponse.status).json(data);
    } else {
      res.status(proxyResponse.status).send(data);
    }
  } catch (error) {
    console.error('Proxy error:', error);
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
