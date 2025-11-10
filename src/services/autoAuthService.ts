/**
 * Auto Authentication Service
 * Automatically authenticates users using metadata server
 * No user interaction required - works like Cloud Shell
 */

import { CloudMetadataService } from '../lib/services/cloudMetadataService';

export interface AuthStatus {
  isAuthenticated: boolean;
  isCloudEnvironment: boolean;
  token?: string;
  error?: string;
}

export class AutoAuthService {
  private metadataService: CloudMetadataService;
  private authStatus: AuthStatus = {
    isAuthenticated: false,
    isCloudEnvironment: false,
  };
  private authPromise: Promise<AuthStatus> | null = null;

  constructor() {
    this.metadataService = new CloudMetadataService({
      autoRefresh: true,
      refreshBufferMinutes: 5,
    });
    
    // Start authentication immediately in the background
    this.authenticate();
  }

  /**
   * Automatically authenticates using metadata server
   * This is called automatically - users don't need to do anything
   */
  async authenticate(): Promise<AuthStatus> {
    // If already authenticating, return the same promise
    if (this.authPromise) {
      return this.authPromise;
    }

    this.authPromise = (async () => {
      try {
        // Check if we're in a cloud environment
        const isCloud = await this.metadataService.isCloudEnvironment();
        this.authStatus.isCloudEnvironment = isCloud;

        if (!isCloud) {
          this.authStatus.error = 'Not running in Google Cloud environment';
          return this.authStatus;
        }

        // Automatically fetch token - no user interaction needed
        const token = await this.metadataService.getAccessToken();
        
        this.authStatus.isAuthenticated = true;
        this.authStatus.token = token;
        this.authStatus.error = undefined;

        console.log('✓ Auto-authenticated via metadata server');
        return this.authStatus;
      } catch (error) {
        this.authStatus.isAuthenticated = false;
        this.authStatus.error = error instanceof Error ? error.message : 'Authentication failed';
        console.error('Auto-authentication failed:', error);
        return this.authStatus;
      }
    })();

    return this.authPromise;
  }

  /**
   * Gets current authentication status
   */
  getAuthStatus(): AuthStatus {
    return { ...this.authStatus };
  }

  /**
   * Checks if authenticated
   */
  isAuthenticated(): boolean {
    return this.authStatus.isAuthenticated;
  }

  /**
   * Gets access token (if authenticated)
   */
  async getToken(): Promise<string | null> {
    if (!this.authStatus.isAuthenticated) {
      await this.authenticate();
    }
    return this.authStatus.token || null;
  }

  /**
   * Waits for authentication to complete
   */
  async waitForAuth(): Promise<AuthStatus> {
    return this.authenticate();
  }
}

// Singleton instance - automatically authenticates on import
export const autoAuthService = new AutoAuthService();

