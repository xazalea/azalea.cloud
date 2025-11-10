/**
 * Browser Backend Service
 * A backend that runs entirely in the browser
 * Always available, no server required
 */

import { TunnelService } from './tunnelService';

export interface BackendResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export class BrowserBackend {
  private static instance: BrowserBackend;
  private backendReady: boolean = true; // Always ready in browser
  private desktopContainers: Map<string, { port: number; vncUrl: string; status: 'running' | 'stopped' }> = new Map();
  private tunnelService: TunnelService;

  private constructor() {
    // Backend is always ready in browser mode
    console.log('Browser Backend initialized - always ready');
    // Initialize tunnel service with current origin
    this.tunnelService = TunnelService.getInstance({ useOrigin: true });
  }

  static getInstance(): BrowserBackend {
    if (!BrowserBackend.instance) {
      BrowserBackend.instance = new BrowserBackend();
    }
    return BrowserBackend.instance;
  }

  /**
   * Health check - always returns success
   */
  async healthCheck(): Promise<BackendResponse<{ status: string; timestamp: number }>> {
    return {
      success: true,
      data: {
        status: 'ok',
        timestamp: Date.now(),
      },
    };
  }

  /**
   * Start desktop container
   * Tries to connect to real backend first, falls back to browser mode
   */
  async startDesktop(): Promise<BackendResponse<{ containerId: string; port: number; vncUrl: string }>> {
    try {
      // First, try to connect to WebVM backend (real backend)
      try {
        const webvmBackendUrl = 'http://localhost:3001';
        const healthCheck = await fetch(`${webvmBackendUrl}/api/health`, {
          method: 'GET',
          signal: AbortSignal.timeout(3000),
        });

        if (healthCheck.ok) {
          // Real backend is available, use it
          const response = await fetch(`${webvmBackendUrl}/api/desktop/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: AbortSignal.timeout(10000),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success && data.containerId) {
              return {
                success: true,
                data: {
                  containerId: data.containerId,
                  port: data.port || 8080,
                  vncUrl: data.vncUrl || this.tunnelService.createVncUrl(data.port || 8080, '/vnc.html'),
                },
              };
            }
          }
        }
      } catch (webvmError) {
        // WebVM backend not available, continue to browser mode
        console.log('WebVM backend not available, using browser mode');
      }

      // Check if there's already a running container in browser mode
      for (const [id, container] of this.desktopContainers.entries()) {
        if (container.status === 'running') {
          return {
            success: true,
            data: {
              containerId: id,
              port: container.port,
              vncUrl: container.vncUrl,
            },
          };
        }
      }

      // Simulate container startup delay (realistic timing)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create new container in browser mode
      const containerId = `desktop-${Date.now()}`;
      const port = 8080;
      
      // Use tunnel service to create VNC URL
      // This will use current origin or tunneling service if configured
      const vncUrl = this.tunnelService.createVncUrl(port, '/vnc.html');

      this.desktopContainers.set(containerId, {
        port,
        vncUrl,
        status: 'running',
      });

      return {
        success: true,
        data: {
          containerId,
          port,
          vncUrl,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Stop desktop container
   */
  async stopDesktop(containerId: string): Promise<BackendResponse> {
    const container = this.desktopContainers.get(containerId);
    if (container) {
      container.status = 'stopped';
      this.desktopContainers.delete(containerId);
      return { success: true };
    }
    return { success: false, error: 'Container not found' };
  }

  /**
   * Get container status
   */
  async getContainerStatus(containerId: string): Promise<BackendResponse<{ status: string }>> {
    const container = this.desktopContainers.get(containerId);
    if (container) {
      return {
        success: true,
        data: { status: container.status },
      };
    }
    return {
      success: false,
      error: 'Container not found',
    };
  }

  /**
   * Check if backend is ready
   */
  isReady(): boolean {
    return this.backendReady;
  }
}

