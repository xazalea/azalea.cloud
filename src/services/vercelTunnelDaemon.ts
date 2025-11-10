/**
 * Vercel Tunnel Daemon
 * Based on https://github.com/scubbo/vercel-tunnel
 * 
 * Browser-compatible implementation of the tunnel daemon
 * Connects to Vercel listener and forwards requests to localhost
 */

export interface TunnelDaemon {
  start(targetPort: number, listenerUrl: string): Promise<void>;
  stop(): void;
  isConnected(): boolean;
}

interface HttpRequest {
  type: 'http_request';
  method: string;
  path: string;
  headers: Record<string, string | string[]>;
  body: any;
  query: Record<string, string | string[]>;
}

interface HttpResponse {
  type: 'http_response';
  status: number;
  headers: Record<string, string | string[]>;
  body: any;
}

export class VercelTunnelDaemon implements TunnelDaemon {
  private ws: WebSocket | null = null;
  private targetPort: number = 8080;
  private listenerUrl: string = '';
  private connected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectDelay: number = 2000;

  async start(targetPort: number, listenerUrl: string): Promise<void> {
    this.targetPort = targetPort;
    this.listenerUrl = listenerUrl;

    // Convert HTTP/HTTPS URL to WebSocket URL
    const wsUrl = listenerUrl
      .replace(/^http:/, 'ws:')
      .replace(/^https:/, 'wss:')
      .replace(/\/$/, '') + '/accept';

    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          console.log('✅ Connected to Vercel tunnel listener');
          this.connected = true;
          this.reconnectAttempts = 0;
          resolve();
        };

        this.ws.onmessage = async (event) => {
          try {
            const message = JSON.parse(event.data);

            if (message.type === 'connected') {
              console.log('🔗 Tunnel connection established');
              return;
            }

            if (message.type === 'http_request') {
              await this.handleHttpRequest(message as HttpRequest);
              return;
            }

            console.warn('⚠️ Unknown message type:', message.type);
          } catch (error) {
            console.error('❌ Error parsing WebSocket message:', error);
          }
        };

        this.ws.onclose = () => {
          console.log('🔌 WebSocket connection closed');
          this.connected = false;
          this.attemptReconnect();
        };

        this.ws.onerror = (error) => {
          console.error('❌ WebSocket error:', error);
          this.connected = false;
          // Don't reject on error, try to reconnect
        };

        // Timeout after 10 seconds if not connected
        setTimeout(() => {
          if (!this.connected) {
            reject(new Error('Connection timeout'));
          }
        }, 10000);
      } catch (error) {
        reject(error);
      }
    });
  }

  private async handleHttpRequest(request: HttpRequest): Promise<void> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    console.log(`📨 ${request.method} ${request.path}`);

    try {
      // Build target URL
      const targetUrl = new URL(request.path, `http://localhost:${this.targetPort}`);
      
      // Add query parameters
      if (request.query && Object.keys(request.query).length > 0) {
        Object.entries(request.query).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => targetUrl.searchParams.append(key, v));
          } else {
            targetUrl.searchParams.set(key, value);
          }
        });
      }

      // Forward request to localhost
      const response = await fetch(targetUrl.toString(), {
        method: request.method,
        headers: request.headers as HeadersInit,
        body: request.body 
          ? (typeof request.body === 'string' 
              ? request.body 
              : JSON.stringify(request.body))
          : undefined,
      });

      // Collect response
      const contentType = response.headers.get('content-type') || '';
      let body: any;

      if (contentType.includes('application/json')) {
        try {
          body = await response.json();
        } catch {
          body = await response.text();
        }
      } else if (contentType.startsWith('text/') || contentType.includes('html')) {
        body = await response.text();
      } else {
        // For binary, convert to base64
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        body = Buffer.from(arrayBuffer).toString('base64');
      }

      // Prepare response
      const responseHeaders: Record<string, string | string[]> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      const responseData: HttpResponse = {
        type: 'http_response',
        status: response.status,
        headers: responseHeaders,
        body: body,
      };

      // Send response back through WebSocket
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(responseData));
        console.log(`📤 ${response.status} ${request.method} ${request.path}`);
      }
    } catch (error) {
      console.error(`❌ Request error for ${request.method} ${request.path}:`, error);

      const errorResponse: HttpResponse = {
        type: 'http_response',
        status: 502,
        headers: { 'content-type': 'application/json' },
        body: { 
          error: 'Bad Gateway', 
          message: error instanceof Error ? error.message : 'Unknown error' 
        },
      };

      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(errorResponse));
      }
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error(`❌ Failed to reconnect after ${this.maxReconnectAttempts} attempts`);
      return;
    }

    this.reconnectAttempts++;
    console.log(`⚠️ Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);

    setTimeout(() => {
      this.start(this.targetPort, this.listenerUrl).catch((error) => {
        console.error('Reconnection failed:', error);
      });
    }, this.reconnectDelay);
  }

  stop(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.connected = false;
  }

  isConnected(): boolean {
    return this.connected && this.ws?.readyState === WebSocket.OPEN;
  }
}
