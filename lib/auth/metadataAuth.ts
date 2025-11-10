/**
 * Metadata Server Authentication Strategy
 * 
 * This module implements the metadata server authentication approach
 * for obtaining and managing Google Cloud access tokens.
 */

export interface AccessToken {
  token: string;
  expiresAt: number;
  createdAt: number;
}

export interface AuthKey {
  id: string;
  token: string;
  expiresAt: number;
  createdAt: number;
  userId: string;
  metadata?: Record<string, any>;
}

/**
 * Fetches an access token from the metadata server
 * Uses API endpoint in browser to avoid mixed content errors
 */
export async function fetchMetadataToken(): Promise<AccessToken> {
  const isBrowser = typeof window !== 'undefined';
  
  try {
    if (isBrowser) {
      // In browser, use API endpoint (server-side can access metadata)
      const response = await fetch('/api/auth/token');
      
      if (!response.ok) {
        throw new Error(`Token API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      if (!data.token) {
        throw new Error('No token available from API');
      }
      
      const expiresAt = Date.now() + ((data.expires_in || 3600) * 1000);
      
      return {
        token: data.token,
        expiresAt,
        createdAt: Date.now(),
      };
    } else {
      // Server-side, can directly access metadata server
      const response = await fetch(
        'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
        {
          headers: {
            'Metadata-Flavor': 'Google',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Metadata server responded with status: ${response.status}`);
      }

      const data = await response.json();
      const expiresAt = Date.now() + (data.expires_in * 1000);

      return {
        token: data.access_token,
        expiresAt,
        createdAt: Date.now(),
      };
    }
  } catch (error) {
    console.error('Failed to fetch metadata token:', error);
    throw error;
  }
}

/**
 * Checks if a token is expired or about to expire (within 5 minutes)
 */
export function isTokenExpired(token: AccessToken, bufferMinutes: number = 5): boolean {
  const bufferMs = bufferMinutes * 60 * 1000;
  return Date.now() >= (token.expiresAt - bufferMs);
}

/**
 * Background token refresh manager
 */
export class TokenRefreshManager {
  private refreshInterval: NodeJS.Timeout | null = null;
  private currentToken: AccessToken | null = null;
  private onTokenUpdate?: (token: AccessToken) => void;

  constructor(onTokenUpdate?: (token: AccessToken) => void) {
    this.onTokenUpdate = onTokenUpdate;
  }

  /**
   * Starts the background token refresh process
   */
  async start(): Promise<AccessToken> {
    // Fetch initial token
    const token = await fetchMetadataToken();
    this.currentToken = token;
    this.onTokenUpdate?.(token);

    // Set up refresh interval (refresh 5 minutes before expiry)
    const refreshIntervalMs = Math.max(
      (token.expiresAt - Date.now()) - (5 * 60 * 1000),
      60000 // Minimum 1 minute
    );

    this.refreshInterval = setInterval(async () => {
      try {
        const newToken = await fetchMetadataToken();
        this.currentToken = newToken;
        this.onTokenUpdate?.(newToken);
      } catch (error) {
        console.error('Background token refresh failed:', error);
      }
    }, refreshIntervalMs);

    return token;
  }

  /**
   * Stops the background refresh process
   */
  stop(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  /**
   * Gets the current token, refreshing if needed
   */
  async getToken(): Promise<AccessToken> {
    if (!this.currentToken || isTokenExpired(this.currentToken)) {
      this.currentToken = await fetchMetadataToken();
      this.onTokenUpdate?.(this.currentToken);
    }
    return this.currentToken;
  }
}

