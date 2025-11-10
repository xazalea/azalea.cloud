/**
 * Proxy API
 * Proxies requests to localhost services through Vercel
 */

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const port = url.searchParams.get('port');
  const targetPath = url.searchParams.get('path') || '/';

  if (!port) {
    return new Response(JSON.stringify({ error: 'Port parameter required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // For VNC, we need to proxy WebSocket connections
    // This is a simplified version - in production, you'd use a proper WebSocket proxy
    const targetUrl = `http://localhost:${port}${targetPath}`;

    // For GET requests (like VNC HTML page)
    if (req.method === 'GET') {
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'User-Agent': req.headers.get('User-Agent') || 'AzaleaCloud',
        },
      });

      const contentType = response.headers.get('Content-Type') || 'text/html';
      const body = await response.text();

      return new Response(body, {
        status: response.status,
        headers: {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // For other methods, forward the request
    const body = req.method !== 'GET' && req.method !== 'HEAD' 
      ? await req.text() 
      : undefined;

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': req.headers.get('Content-Type') || 'application/json',
        'User-Agent': req.headers.get('User-Agent') || 'AzaleaCloud',
      },
      body,
    });

    const responseBody = await response.text();
    const contentType = response.headers.get('Content-Type') || 'text/html';

    return new Response(responseBody, {
      status: response.status,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Proxy error',
        message: 'Unable to connect to localhost service. Make sure the service is running.',
      }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

