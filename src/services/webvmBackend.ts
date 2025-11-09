/**
 * WebVM Backend Service
 * Handles communication with the backend server running in WebVM
 */

export interface BackendConfig {
  host: string;
  port: number;
}

export class WebVMBackend {
  private config: BackendConfig;
  private baseUrl: string;

  constructor(config: BackendConfig = { host: 'localhost', port: 3001 }) {
    this.config = config;
    this.baseUrl = `http://${config.host}:${config.port}`;
  }

  /**
   * Check if backend is available
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000),
      });
      return response.ok;
    } catch (error) {
      console.warn('Backend health check failed:', error);
      return false;
    }
  }

  /**
   * Start desktop container
   */
  async startDesktop(): Promise<{
    success: boolean;
    containerId?: string;
    port?: number;
    vncUrl?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/desktop/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return data;
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
  async stopDesktop(containerId: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/desktop/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ containerId }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get container status
   */
  async getContainerStatus(containerId: string): Promise<{
    success: boolean;
    status?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/desktop/status?containerId=${encodeURIComponent(containerId)}`,
        {
          method: 'GET',
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * List all containers
   */
  async listContainers(): Promise<{
    success: boolean;
    containers?: Array<{ id: string; name: string; status: string }>;
    error?: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/containers`, {
        method: 'GET',
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

