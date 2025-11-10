/**
 * Desktop Service
 * Handles Docker desktop container management
 * Uses browser backend (always available) with fallback to WebVM backend
 */

import { BrowserBackend } from './browserBackend';
import { WebVMBackend } from './webvmBackend';
import { TunnelService } from './tunnelService';
import { AutoTunnelService } from './autoTunnelService';

export interface DesktopSession {
  containerId: string;
  port: number;
  status: 'starting' | 'running' | 'stopped';
  vncUrl: string;
}

export class DesktopService {
  private session: DesktopSession | null = null;
  private readonly DOCKER_IMAGE = 'dorowu/ubuntu-desktop-lxde-vnc';
  private readonly PORT = 8080;
  private browserBackend: BrowserBackend;
  private webvmBackend: WebVMBackend;
  private tunnelService: TunnelService;
  private autoTunnelService: AutoTunnelService;

  constructor() {
    // Always use browser backend (always available)
    this.browserBackend = BrowserBackend.getInstance();
    // Fallback to WebVM backend if needed
    this.webvmBackend = new WebVMBackend({ host: 'localhost', port: 3001 });
    // Initialize tunnel service
    this.tunnelService = TunnelService.getInstance({ useOrigin: true });
    // Initialize auto tunnel service
    this.autoTunnelService = AutoTunnelService.getInstance();
  }

  /**
   * Transforms a localhost URL to use current origin or tunnel
   */
  private transformVncUrl(url: string, port: number): string {
    // If URL contains localhost, replace with tunnel service URL
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
      return this.tunnelService.createVncUrl(port, '/vnc.html');
    }
    // Otherwise return as-is (might already be a tunnel URL)
    return url;
  }

  /**
   * Starts the desktop container
   * Automatically sets up tunnel, uses browser backend first, falls back to WebVM backend
   * @param onProgress Callback for progress updates
   */
  async startDesktop(
    onProgress?: (step: string, message?: string) => void
  ): Promise<DesktopSession> {
    try {
      onProgress?.('tunnel', 'Checking for cached tunnel...');
      
      // Automatically set up tunnel first (cached or new)
      const port = this.PORT;
      const tunnelUrl = await this.autoTunnelService.setupTunnel(port, (message) => {
        onProgress?.('tunnel', message);
      });
      
      if (tunnelUrl.includes('localhost')) {
        onProgress?.('tunnel', 'Using current origin (no tunnel needed)');
      } else {
        onProgress?.('tunnel', `Tunnel ready: ${tunnelUrl.substring(0, 30)}...`);
      }
      
      onProgress?.('backend', 'Connecting to backend...');
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Try browser backend first (always available)
      const browserResult = await this.browserBackend.startDesktop();
      
      if (browserResult.success && browserResult.data) {
        onProgress?.('desktop', 'Starting desktop container...');
        
        // Transform URL to use current origin or tunnel
        const transformedUrl = this.transformVncUrl(
          browserResult.data.vncUrl,
          browserResult.data.port
        );
        
        onProgress?.('desktop', 'Desktop container started');
        
        this.session = {
          containerId: browserResult.data.containerId,
          port: browserResult.data.port,
          status: 'running',
          vncUrl: transformedUrl,
        };
        
        onProgress?.('complete', 'Desktop ready!');
        return this.session;
      }

      // Fallback to WebVM backend if available
      try {
        onProgress?.('backend', 'Checking WebVM backend...');
        const isWebVMAvailable = await this.webvmBackend.healthCheck();
        if (isWebVMAvailable) {
          onProgress?.('backend', 'WebVM backend available, starting desktop...');
          const webvmResult = await this.webvmBackend.startDesktop();
          if (webvmResult.success && webvmResult.containerId && webvmResult.vncUrl) {
            onProgress?.('desktop', 'Desktop container starting...');
            
            // Transform URL to use current origin or tunnel
            const transformedUrl = this.transformVncUrl(
              webvmResult.vncUrl,
              webvmResult.port || this.PORT
            );
            
            onProgress?.('desktop', 'Desktop container started');
            
            this.session = {
              containerId: webvmResult.containerId,
              port: webvmResult.port || this.PORT,
              status: 'running',
              vncUrl: transformedUrl,
            };
            
            onProgress?.('complete', 'Desktop ready!');
            return this.session;
          }
        } else {
          onProgress?.('backend', 'WebVM backend not available, using browser backend');
        }
      } catch (webvmError) {
        // WebVM backend not available, use browser backend result
        onProgress?.('backend', 'WebVM backend error, using browser backend');
        console.log('WebVM backend not available, using browser backend');
      }

      // If we get here, browser backend failed
      if (!browserResult.success) {
        throw new Error(browserResult.error || 'Backend connection failed');
      }

      // If we get here but no data, something went wrong
      throw new Error('Backend returned success but no container data');
    } catch (error) {
      console.error('Failed to start desktop:', error);
      throw error;
    }
  }

  /**
   * Stops the desktop container
   */
  async stopDesktop(): Promise<void> {
    if (this.session) {
      try {
        // Try browser backend first
        const browserResult = await this.browserBackend.stopDesktop(this.session.containerId);
        if (!browserResult.success) {
          // Fallback to WebVM backend
          try {
            await this.webvmBackend.stopDesktop(this.session.containerId);
          } catch (webvmError) {
            console.error('Error stopping desktop in WebVM backend:', webvmError);
          }
        }
      } catch (error) {
        console.error('Error stopping desktop:', error);
      }
      this.session.status = 'stopped';
      this.session = null;
    }
  }

  /**
   * Gets the current desktop session
   */
  getSession(): DesktopSession | null {
    return this.session;
  }

  /**
   * Checks if desktop is running
   */
  isRunning(): boolean {
    return this.session?.status === 'running' || false;
  }

  /**
   * Gets the VNC URL
   */
  getVncUrl(): string | null {
    return this.session?.vncUrl ?? null;
  }
}

