/**
 * Tunnel Service
 * Handles tunneling for VNC desktop connections
 * Supports multiple tunneling services
 */

export interface TunnelConfig {
  service?: 'cloudflared' | 'ngrok' | 'localtunnel' | 'custom';
  customUrl?: string;
  useOrigin?: boolean;
}

export class TunnelService {
  private static instance: TunnelService;
  private tunnelUrl: string | null = null;
  private config: TunnelConfig;

  private constructor(config: TunnelConfig = {}) {
    this.config = {
      useOrigin: true, // Default to using current origin
      ...config,
    };
  }

  static getInstance(config?: TunnelConfig): TunnelService {
    if (!TunnelService.instance) {
      TunnelService.instance = new TunnelService(config);
    }
    return TunnelService.instance;
  }

  /**
   * Gets the base URL for desktop connections
   * Uses current origin by default, or tunneling service if configured
   */
  getBaseUrl(): string {
    // If custom URL is set, use it
    if (this.config.customUrl) {
      return this.config.customUrl;
    }

    // If tunnel URL is already set, use it
    if (this.tunnelUrl) {
      return this.tunnelUrl;
    }

    // Default to current origin
    if (this.config.useOrigin) {
      return window.location.origin;
    }

    // Fallback to localhost (shouldn't happen)
    return 'http://localhost:8080';
  }

  /**
   * Creates a VNC URL using the base URL
   */
  createVncUrl(port: number = 8080, path: string = '/vnc.html'): string {
    const baseUrl = this.getBaseUrl();
    
    // If using current origin, construct URL with port
    // This assumes the VNC server is accessible via the same origin
    // In production, you'd typically use a reverse proxy or tunnel
    if (this.config.useOrigin && baseUrl === window.location.origin) {
      // For now, use the origin with the port
      // In production, you'd set up a reverse proxy or use a tunnel
      const url = new URL(baseUrl);
      url.port = port.toString();
      return `${url.toString()}${path}`;
    }

    // Otherwise use direct URL (tunnel URL)
    return `${baseUrl}${path}`;
  }

  /**
   * Sets up a tunnel using Vercel Tunnel
   * Uses Vercel's infrastructure to proxy to localhost
   */
  async setupVercelTunnel(port: number): Promise<string> {
    try {
      const response = await fetch('/api/tunnel/vercel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ port }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.url) {
          this.tunnelUrl = data.url;
          return data.url;
        }
      }
    } catch (error) {
      console.error('Failed to setup Vercel tunnel:', error);
    }

    throw new Error('Failed to setup Vercel tunnel');
  }

  /**
   * Sets up a tunnel using Cloudflare Tunnel (cloudflared)
   * This would typically be done server-side
   */
  async setupCloudflaredTunnel(port: number): Promise<string> {
    try {
      // In a real implementation, this would call a backend API
      // that runs: cloudflared tunnel --url http://localhost:${port}
      const response = await fetch('/api/tunnel/cloudflared', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ port }),
      });

      if (response.ok) {
        const data = await response.json();
        this.tunnelUrl = data.url;
        return data.url;
      }
    } catch (error) {
      console.error('Failed to setup Cloudflare tunnel:', error);
    }

    throw new Error('Failed to setup tunnel');
  }

  /**
   * Sets up a tunnel using ngrok
   * This would typically be done server-side
   */
  async setupNgrokTunnel(port: number): Promise<string> {
    try {
      // In a real implementation, this would call a backend API
      // that runs: ngrok http ${port}
      const response = await fetch('/api/tunnel/ngrok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ port }),
      });

      if (response.ok) {
        const data = await response.json();
        this.tunnelUrl = data.url;
        return data.url;
      }
    } catch (error) {
      console.error('Failed to setup ngrok tunnel:', error);
    }

    throw new Error('Failed to setup tunnel');
  }

  /**
   * Sets up a tunnel using localtunnel
   * This would typically be done server-side
   */
  async setupLocaltunnel(port: number): Promise<string> {
    try {
      // In a real implementation, this would call a backend API
      // that runs: lt --port ${port}
      const response = await fetch('/api/tunnel/localtunnel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ port }),
      });

      if (response.ok) {
        const data = await response.json();
        this.tunnelUrl = data.url;
        return data.url;
      }
    } catch (error) {
      console.error('Failed to setup localtunnel:', error);
    }

    throw new Error('Failed to setup tunnel');
  }

  /**
   * Sets a custom tunnel URL
   */
  setCustomUrl(url: string): void {
    this.tunnelUrl = url;
    this.config.customUrl = url;
  }

  /**
   * Gets the current tunnel URL
   */
  getTunnelUrl(): string | null {
    return this.tunnelUrl;
  }
}

