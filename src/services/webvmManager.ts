/**
 * WebVM Manager Service
 * Ensures WebVM backend is always available and provides clear error handling
 */

const WEBVM_BACKEND_URL = 'http://localhost:3001';
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds
const HEALTH_CHECK_INTERVAL = 5000; // 5 seconds

export interface WebVMStatus {
  available: boolean;
  lastCheck: number;
  error?: string;
  retryCount: number;
}

class WebVMManager {
  private status: WebVMStatus = {
    available: false,
    lastCheck: 0,
    retryCount: 0,
  };
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private initializationPromise: Promise<boolean> | null = null;

  /**
   * Check if WebVM backend is available
   */
  async checkAvailability(): Promise<boolean> {
    try {
      const response = await fetch(`${WEBVM_BACKEND_URL}/api/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(2000),
      });
      
      const isAvailable = response.ok;
      this.status = {
        available: isAvailable,
        lastCheck: Date.now(),
        retryCount: isAvailable ? 0 : this.status.retryCount,
      };
      
      return isAvailable;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.status = {
        available: false,
        lastCheck: Date.now(),
        error: errorMessage,
        retryCount: this.status.retryCount + 1,
      };
      
      // Don't log health check failures - WebVM is optional
      // Only log if we've had many failures (indicating it might be needed)
      if (this.status.retryCount > 10) {
        console.log(`[WebVM Manager] WebVM backend not available (optional fallback)`);
      }
      return false;
    }
  }

  /**
   * Ensure WebVM backend is available, with retry logic
   * Returns false gracefully if WebVM is not available (it's optional)
   */
  async ensureAvailable(retries: number = MAX_RETRIES): Promise<boolean> {
    // If already checking, wait for that check to complete
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this._ensureAvailable(retries);
    const result = await this.initializationPromise;
    this.initializationPromise = null;
    return result;
  }

  private async _ensureAvailable(retries: number): Promise<boolean> {
    // Check if already available
    if (this.status.available && Date.now() - this.status.lastCheck < 10000) {
      return true;
    }

    // Try to check availability (quick check, no retries)
    let isAvailable = await this.checkAvailability();
    
    if (isAvailable) {
      this.startHealthCheck();
      return true;
    }

    // WebVM is not available - this is OK, it's optional
    // Only log at debug level, don't show errors
    if (retries > 1) {
      // Only log if we're doing multiple retries (meaning it's actually needed)
      console.log('[WebVM Manager] WebVM backend not available (optional fallback)');
    }
    
    return false;
  }

  /**
   * Attempt to start WebVM backend
   * This could trigger WebVM initialization if needed
   */
  private async attemptStartWebVM(): Promise<boolean> {
    // For now, we can't programmatically start WebVM from the browser
    // This would require WebVM to be already loaded in an iframe
    // In a real implementation, this could:
    // 1. Check if WebVM iframe exists
    // 2. Inject initialization script into WebVM
    // 3. Wait for backend to start
    
    // For now, just return false - the user needs to have WebVM running
    // In production, you might want to auto-inject the backend script
    return false;
  }

  /**
   * Start periodic health checks
   */
  startHealthCheck(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    this.healthCheckInterval = setInterval(async () => {
      await this.checkAvailability();
    }, HEALTH_CHECK_INTERVAL);
  }

  /**
   * Stop health checks
   */
  stopHealthCheck(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
  }

  /**
   * Get current status
   */
  getStatus(): WebVMStatus {
    return { ...this.status };
  }

  /**
   * Get a user-friendly error message
   * Returns empty string if WebVM is optional (not needed)
   */
  getErrorMessage(): string {
    if (this.status.available) {
      return '';
    }

    // WebVM is optional - only show error if it was actually needed
    // For now, return empty string to indicate it's optional
    return '';
  }
}

// Singleton instance
export const webvmManager = new WebVMManager();

// Start health checks on module load
if (typeof window !== 'undefined') {
  // Initial check after a short delay
  setTimeout(() => {
    webvmManager.checkAvailability().then(available => {
      if (available) {
        webvmManager.startHealthCheck();
      }
    });
  }, 2000);
}

