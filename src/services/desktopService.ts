/**
 * Desktop Service
 * Handles Docker desktop container management via WebVM backend
 */

import { WebVMBackend } from './webvmBackend';

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
  private backend: WebVMBackend;

  constructor() {
    // Initialize backend connection
    // In WebVM, the backend runs on localhost:3001
    this.backend = new WebVMBackend({ host: 'localhost', port: 3001 });
  }

  /**
   * Starts the desktop container via WebVM backend
   */
  async startDesktop(): Promise<DesktopSession> {
    try {
      // Check if backend is available
      const isBackendAvailable = await this.backend.healthCheck();
      if (!isBackendAvailable) {
        throw new Error('Backend server is not available. Make sure it is running in WebVM.');
      }

      // Call backend API to start desktop
      const result = await this.backend.startDesktop();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to start desktop container');
      }

      if (!result.containerId || !result.vncUrl) {
        throw new Error('Invalid response from backend');
      }

      this.session = {
        containerId: result.containerId,
        port: result.port || this.PORT,
        status: 'running',
        vncUrl: result.vncUrl,
      };

      return this.session;
    } catch (error) {
      console.error('Failed to start desktop:', error);
      throw error;
    }
  }

  /**
   * Stops the desktop container via WebVM backend
   */
  async stopDesktop(): Promise<void> {
    if (this.session) {
      try {
        const result = await this.backend.stopDesktop(this.session.containerId);
        if (!result.success) {
          console.error('Failed to stop desktop:', result.error);
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

