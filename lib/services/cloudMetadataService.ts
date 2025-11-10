/**
 * Cloud Metadata Service
 * Provides a cloud service interface that automatically uses metadata server authentication
 * Similar to Google Cloud Shell's automatic authentication
 */

export interface MetadataTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface CloudServiceConfig {
  metadataServerUrl?: string;
  customMetadataKey?: string;
  autoRefresh?: boolean;
  refreshBufferMinutes?: number;
}

export class CloudMetadataService {
  private config: CloudServiceConfig;
  private currentToken: string | null = null;
  private tokenExpiresAt: number = 0;
  private refreshTimer: NodeJS.Timeout | null = null;

  constructor(config: CloudServiceConfig = {}) {
    this.config = {
      metadataServerUrl: 'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
      customMetadataKey: 'long-lived-token',
      autoRefresh: true,
      refreshBufferMinutes: 5,
      ...config,
    };
  }

  /**
   * Checks if we're running in a Google Cloud environment
   */
  async isCloudEnvironment(): Promise<boolean> {
    try {
      const response = await fetch(
        'http://metadata.google.internal/computeMetadata/v1/instance/',
        {
          headers: { 'Metadata-Flavor': 'Google' },
          signal: AbortSignal.timeout(1000),
        }
      );
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Fetches an access token from the metadata server
   */
  async fetchMetadataToken(): Promise<MetadataTokenResponse> {
    if (!this.config.metadataServerUrl) {
      throw new Error('Metadata server URL not configured');
    }

    const response = await fetch(this.config.metadataServerUrl, {
      headers: { 'Metadata-Flavor': 'Google' },
    });

    if (!response.ok) {
      throw new Error(`Metadata server responded with status: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Fetches a token from custom metadata
   */
  async fetchCustomMetadataToken(): Promise<string> {
    const metadataUrl = `http://metadata.google.internal/computeMetadata/v1/instance/attributes/${this.config.customMetadataKey}`;
    
    const response = await fetch(metadataUrl, {
      headers: { 'Metadata-Flavor': 'Google' },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch custom metadata token: ${response.status}`);
    }

    return await response.text();
  }

  /**
   * Gets a valid access token, refreshing if necessary
   */
  async getAccessToken(): Promise<string> {
    // Check if we have a valid token
    if (this.currentToken && Date.now() < this.tokenExpiresAt) {
      return this.currentToken;
    }

    // Try custom metadata first (long-lived tokens)
    try {
      const customToken = await this.fetchCustomMetadataToken();
      this.currentToken = customToken;
      // Custom tokens don't expire, set far future
      this.tokenExpiresAt = Date.now() + 365 * 24 * 60 * 60 * 1000; // 1 year
      
      if (this.config.autoRefresh) {
        this.scheduleRefresh();
      }
      
      return customToken;
    } catch (error) {
      console.log('Custom metadata token not available, using default service account token');
    }

    // Fall back to default service account token
    const tokenData = await this.fetchMetadataToken();
    this.currentToken = tokenData.access_token;
    this.tokenExpiresAt = Date.now() + (tokenData.expires_in * 1000);

    if (this.config.autoRefresh) {
      this.scheduleRefresh();
    }

    return this.currentToken;
  }

  /**
   * Schedules automatic token refresh
   */
  private scheduleRefresh(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    const bufferMs = (this.config.refreshBufferMinutes || 5) * 60 * 1000;
    const refreshTime = Math.max(this.tokenExpiresAt - Date.now() - bufferMs, 60000); // At least 1 minute

    this.refreshTimer = setTimeout(async () => {
      try {
        await this.getAccessToken();
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    }, refreshTime);
  }

  /**
   * Executes a gcloud command using the access token
   */
  async executeGcloudCommand(command: string[]): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const token = await this.getAccessToken();
    
    // Create a temporary token file
    const tokenFile = `/tmp/gcloud_token_${Date.now()}.txt`;
    
    // In a real implementation, this would write to the file system
    // For now, we'll return the command that should be executed
    const gcloudCommand = [
      'gcloud',
      ...command,
      '--access-token-file',
      tokenFile,
    ];

    return {
      stdout: `Command: ${gcloudCommand.join(' ')}\nToken: ${token.substring(0, 20)}...`,
      stderr: '',
      exitCode: 0,
    };
  }

  /**
   * Gets instance metadata
   */
  async getInstanceMetadata(): Promise<Record<string, string>> {
    const response = await fetch(
      'http://metadata.google.internal/computeMetadata/v1/instance/?recursive=true',
      {
        headers: { 'Metadata-Flavor': 'Google' },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch instance metadata: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Stops the service and cleans up
   */
  stop(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
    this.currentToken = null;
    this.tokenExpiresAt = 0;
  }
}

