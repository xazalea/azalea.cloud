/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
module.exports = async function handler(req, res) {
  // Allow credentials for cookie-based authentication
  // Note: When using credentials, we must specify the origin, not '*'
  const origin = req.headers?.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Cookie');
  res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie, Location, WWW-Authenticate');

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

    const proxyHeaders = {
      'User-Agent': (req.headers?.['user-agent'] || 'Mozilla/5.0'),
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

    // Handle redirects (3xx status codes) and OAuth redirects in 401 responses
    if (proxyResponse.status >= 300 && proxyResponse.status < 400) {
      const location = proxyResponse.headers.get('location');
      if (location) {
        res.setHeader('Location', location);
        res.status(proxyResponse.status).end();
        return;
      }
    }

    // For 401 responses, check if there's an OAuth redirect in WWW-Authenticate or Location header
    if (proxyResponse.status === 401) {
      const location = proxyResponse.headers.get('location');
      const wwwAuthenticate = proxyResponse.headers.get('www-authenticate');
      
      // If there's a location header pointing to OAuth, forward it
      if (location && (location.includes('accounts.google.com') || location.includes('oauth2'))) {
        res.setHeader('Location', location);
        res.status(302).end();
      return;
    }

      // Forward WWW-Authenticate header if present
      if (wwwAuthenticate) {
        res.setHeader('WWW-Authenticate', wwwAuthenticate);
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
    // IMPORTANT: Forward Set-Cookie for authentication to work
    proxyResponse.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      // Always forward Set-Cookie for authentication
      if (lowerKey === 'set-cookie') {
        // Set-Cookie can be an array, handle it properly
        const cookies = proxyResponse.headers.getSetCookie ? proxyResponse.headers.getSetCookie() : [value];
        cookies.forEach(cookie => {
          try {
            // Modify cookie to work with our domain
            // Remove domain restrictions and adjust SameSite if needed
            let modifiedCookie = cookie;
            // Remove domain=... if it restricts to .google.com
            modifiedCookie = modifiedCookie.replace(/;\s*[Dd]omain=[^;]+/g, '');
            // Adjust SameSite for cross-origin requests
            if (modifiedCookie.includes('SameSite=')) {
              modifiedCookie = modifiedCookie.replace(/;\s*[Ss]ame[Ss]ite=[^;]+/g, '; SameSite=None');
            } else if (!modifiedCookie.includes('SameSite')) {
              modifiedCookie += '; SameSite=None';
            }
            // Ensure Secure flag for SameSite=None
            if (modifiedCookie.includes('SameSite=None') && !modifiedCookie.includes('Secure')) {
              modifiedCookie += '; Secure';
            }
            res.appendHeader('Set-Cookie', modifiedCookie);
          } catch {
            // If appendHeader doesn't work, try setHeader
            try {
              res.setHeader('Set-Cookie', cookie);
            } catch {}
          }
        });
      } else if (!['access-control-allow-origin', 'content-encoding', 'transfer-encoding', 'content-length'].includes(lowerKey)) {
        try {
        res.setHeader(key, value);
        } catch {}
      }
    });

    // For 401 responses, ensure proper CORS headers so browser can handle OAuth redirect
    if (proxyResponse.status === 401) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Expose-Headers', 'WWW-Authenticate, Location, Set-Cookie');
    }

    // Send response
    if (isJson && typeof data === 'object') {
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
