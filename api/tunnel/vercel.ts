/**
 * Vercel Tunnel API
 * Creates a tunnel using Vercel's infrastructure
 * Based on https://github.com/scubbo/vercel-tunnel
 */

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { port } = await req.json();

    if (!port || typeof port !== 'number') {
      return new Response(JSON.stringify({ error: 'Port is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Use Vercel's deployment URL as the tunnel endpoint
    // The tunnel will proxy requests to localhost:port
    const vercelUrl = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
    
    if (!vercelUrl) {
      // Fallback: use current request origin
      const origin = req.headers.get('origin') || req.headers.get('host');
      const protocol = origin?.includes('localhost') ? 'http' : 'https';
      const baseUrl = origin ? `${protocol}://${origin}` : 'https://azalea-cloud.vercel.app';
      
      return new Response(
        JSON.stringify({
          success: true,
          url: `${baseUrl}/api/proxy?port=${port}`,
          port,
          service: 'vercel',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const tunnelUrl = `https://${vercelUrl}/api/proxy?port=${port}`;

    return new Response(
      JSON.stringify({
        success: true,
        url: tunnelUrl,
        port,
        service: 'vercel',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to create tunnel',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

