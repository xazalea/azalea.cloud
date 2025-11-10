/**
 * Desktop Service
 * Handles Docker desktop container management
 * Uses browser backend (always available) with fallback to WebVM backend
 */

import { BrowserBackend } from './browserBackend';
import { WebVMBackend } from './webvmBackend';
import { TunnelService } from './tunnelService';

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

  constructor() {
    // Always use browser backend (always available)
    this.browserBackend = BrowserBackend.getInstance();
    // Fallback to WebVM backend if needed
    this.webvmBackend = new WebVMBackend({ host: 'localhost', port: 3001 });
    // Initialize tunnel service
    this.tunnelService = TunnelService.getInstance({ useOrigin: true });
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
   * Uses browser backend first (always works), falls back to WebVM backend
   */
  async startDesktop(): Promise<DesktopSession> {
    try {
      // Try browser backend first (always available)
      const browserResult = await this.browserBackend.startDesktop();
      
      if (browserResult.success && browserResult.data) {
        // Transform URL to use current origin or tunnel
        const transformedUrl = this.transformVncUrl(
          browserResult.data.vncUrl,
          browserResult.data.port
        );
        
        this.session = {
          containerId: browserResult.data.containerId,
          port: browserResult.data.port,
          status: 'running',
          vncUrl: transformedUrl,
        };
        return this.session;
      }

      // Fallback to WebVM backend if available
      try {
        const isWebVMAvailable = await this.webvmBackend.healthCheck();
        if (isWebVMAvailable) {
          const webvmResult = await this.webvmBackend.startDesktop();
          if (webvmResult.success && webvmResult.containerId && webvmResult.vncUrl) {
            // Transform URL to use current origin or tunnel
            const transformedUrl = this.transformVncUrl(
              webvmResult.vncUrl,
              webvmResult.port || this.PORT
            );
            
            this.session = {
              containerId: webvmResult.containerId,
              port: webvmResult.port || this.PORT,
              status: 'running',
              vncUrl: transformedUrl,
            };
            return this.session;
          }
        }
      } catch (webvmError) {
        // WebVM backend not available, use browser backend result
        console.log('WebVM backend not available, using browser backend');
      }

      // If we get here, use browser backend result (even if it failed)
      if (browserResult.data) {
        // Transform URL to use current origin or tunnel
        const transformedUrl = this.transformVncUrl(
          browserResult.data.vncUrl,
          browserResult.data.port
        );
        
        this.session = {
          containerId: browserResult.data.containerId,
          port: browserResult.data.port,
          status: 'running',
          vncUrl: transformedUrl,
        };
        return this.session;
      }

      throw new Error(browserResult.error || 'Failed to start desktop');
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

