/**
 * Vercel Tunnel Listener
 * Based on https://github.com/scubbo/vercel-tunnel
 * 
 * This implements the listener that runs on Vercel
 * Since Vercel doesn't support persistent WebSocket servers in serverless,
 * we use Vercel Sandbox API to run the listener in a sandbox environment
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Sandbox } from '@vercel/sandbox';

let cachedSandboxId: string | null = null;

async function getOrCreateSandbox() {
  // Check if we have a cached sandbox
  if (cachedSandboxId) {
    try {
      const cachedSandbox = await Sandbox.get({ sandboxId: cachedSandboxId });
      if (cachedSandbox.status === 'running') {
        return cachedSandbox;
      }
    } catch (error) {
      // Sandbox doesn't exist or is stopped, create new one
      cachedSandboxId = null;
    }
  }

  // Create a new sandbox with the listener
  console.log('Creating new sandbox for tunnel listener...');
  const sandbox = await Sandbox.create({
    source: {
      url: 'https://github.com/scubbo/vercel-tunnel.git',
      type: 'git',
    },
    resources: { vcpus: 2 },
    timeout: 120000, // 2 minutes
    ports: [3000],
    runtime: 'node22',
  });

  console.log('Installing dependencies...');
  const install = await sandbox.runCommand({
    cmd: 'pnpm',
    args: ['-F', 'vercel-tunnel-listener', 'install', '--loglevel', 'info'],
  });

  if (install.exitCode !== 0) {
    throw new Error('Failed to install dependencies');
  }

  console.log('Starting the listener server...');
  await sandbox.runCommand({
    cmd: 'pnpm',
    args: ['-F', 'vercel-tunnel-listener', 'dev'],
    detached: true,
  });

  cachedSandboxId = sandbox.sandboxId;
  return sandbox;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const sandbox = await getOrCreateSandbox();
    const sandboxDomain = sandbox.domain(3000);
    
    // Build the target URL
    const targetUrl = new URL(req.url || '/', `https://${sandboxDomain}`);

    console.log(`Forwarding ${req.method} ${req.url} to ${targetUrl}`);

    // Forward the request to the sandbox
    const response = await fetch(targetUrl.toString(), {
      method: req.method,
      headers: req.headers as HeadersInit,
      body: req.method !== 'GET' && req.method !== 'HEAD'
        ? JSON.stringify(req.body)
        : undefined,
    });

    // Set status
    res.status(response.status);

    // Forward headers (skip content-encoding)
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'content-encoding') {
        res.setHeader(key, value);
      }
    });

    // Get response body
    const text = await response.text();

    // Check for "no active tunnel connection" error
    if (response.status === 503) {
      try {
        const json = JSON.parse(text);
        if (json.error === 'No active tunnel connection') {
          res.setHeader('Content-Type', 'text/html');
          const wsUrl = targetUrl.toString().replace('https://', 'wss://').replace('http://', 'ws://') + '/accept';
          return res.send(
            `<html><body>
              <h2>Tunnel Listener is Running</h2>
              <p>Sandbox is up, but no tunnel daemon is connected.</p>
              <p>To connect, run:</p>
              <pre>pnpm dev:daemon localhost:8080 ${wsUrl}</pre>
              <p>Or use the proxy API directly: <a href="/api/proxy?port=8080">/api/proxy?port=8080</a></p>
            </body></html>`
          );
        }
      } catch (e) {
        // Not JSON, continue
      }
    }

    return res.send(text);
  } catch (error) {
    console.error('Error in tunnel listener:', error);
    return res.status(502).json({
      error: 'Bad Gateway',
      message: error instanceof Error ? error.message : 'Unknown error',
      note: 'Failed to create or access tunnel listener sandbox. Make sure Vercel Sandbox API is configured.',
    });
  }
}
