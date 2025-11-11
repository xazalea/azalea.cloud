/**
 * API Fallback Service
 * Automatically falls back to WebVM backend when Vercel API routes return 500 errors
 * Includes comprehensive error handling and ensures WebVM is always available
 */

import { webvmManager } from './webvmManager';

const WEBVM_BACKEND_URL = 'http://localhost:3001';

/**
 * Error class for API fallback errors
 */
export class APIFallbackError extends Error {
  constructor(
    message: string,
    public originalUrl: string,
    public vercelStatus?: number,
    public webvmAvailable: boolean = false,
    public cause?: Error
  ) {
    super(message);
    this.name = 'APIFallbackError';
  }

  /**
   * Get a user-friendly error message
   */
  getUserMessage(): string {
    if (!this.webvmAvailable) {
      return `❌ API Error: ${this.message}\n\n` +
             `The request to ${this.originalUrl} failed, and WebVM backend is not available as a fallback.\n\n` +
             `Please ensure:\n` +
             `1. WebVM is running\n` +
             `2. Backend server is started on port 3001\n` +
             `3. Check the browser console for more details`;
    }

    if (this.vercelStatus === 500) {
      return `⚠️ Vercel API Error: The request to ${this.originalUrl} returned a 500 error.\n\n` +
             `WebVM fallback was attempted but also failed.\n\n` +
             `Error details: ${this.message}`;
    }

    return `❌ API Error: ${this.message}\n\n` +
           `Request URL: ${this.originalUrl}\n` +
           `Status: ${this.vercelStatus || 'Network Error'}`;
  }
}

/**
 * Check if WebVM backend is available (with retry)
 */
async function isWebVMBackendAvailable(): Promise<boolean> {
  try {
    // Use WebVM manager to ensure availability
    const available = await webvmManager.ensureAvailable(1); // Quick check, no retries
    return available;
  } catch {
    return false;
  }
}

/**
 * Fetch with automatic fallback to WebVM backend
 * Includes comprehensive error handling and clear error messages
 */
export async function fetchWithFallback(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const startTime = Date.now();
  
  // First, try Vercel API
  try {
    const response = await fetch(url, options);
    
    // If Vercel returns 500, try WebVM fallback
    if (response.status === 500) {
      console.warn(`[API Fallback] ⚠️ Vercel returned 500 for ${url}, attempting WebVM fallback...`);
      
      // Ensure WebVM is available (with retry)
      const webvmAvailable = await isWebVMBackendAvailable();
      
      if (webvmAvailable) {
        // Map Vercel API paths to WebVM backend paths
        const webvmUrl = mapVercelPathToWebVM(url);
        
        if (webvmUrl) {
          try {
            console.log(`[API Fallback] 🔄 Trying WebVM fallback: ${webvmUrl}`);
            const webvmResponse = await fetch(webvmUrl, options);
            
            if (webvmResponse.ok) {
              const duration = Date.now() - startTime;
              console.log(`[API Fallback] ✅ WebVM fallback succeeded for ${url} (${duration}ms)`);
              return webvmResponse;
            } else {
              // WebVM returned an error status
              const error = new APIFallbackError(
                `WebVM fallback returned status ${webvmResponse.status}`,
                url,
                500,
                true
              );
              console.error(`[API Fallback] ❌ ${error.getUserMessage()}`);
              throw error;
            }
          } catch (webvmError) {
            const error = new APIFallbackError(
              `WebVM fallback failed: ${webvmError instanceof Error ? webvmError.message : 'Unknown error'}`,
              url,
              500,
              true,
              webvmError instanceof Error ? webvmError : undefined
            );
            console.error(`[API Fallback] ❌ ${error.getUserMessage()}`);
            throw error;
          }
        } else {
          // No WebVM mapping available for this URL
          const error = new APIFallbackError(
            `No WebVM fallback available for this endpoint`,
            url,
            500,
            webvmAvailable
          );
          console.error(`[API Fallback] ❌ ${error.getUserMessage()}`);
          throw error;
        }
      } else {
        // WebVM not available
        const error = new APIFallbackError(
          `Vercel API returned 500 and WebVM backend is not available`,
          url,
          500,
          false
        );
        console.error(`[API Fallback] ❌ ${error.getUserMessage()}`);
        throw error;
      }
    }
    
    // Success or non-500 error - return as-is
    if (!response.ok) {
      console.warn(`[API Fallback] ⚠️ Vercel returned ${response.status} for ${url}`);
    }
    
    return response;
  } catch (error) {
    // If it's already an APIFallbackError, re-throw it
    if (error instanceof APIFallbackError) {
      throw error;
    }
    
    // If fetch itself fails (network error), try WebVM
    console.warn(`[API Fallback] ⚠️ Vercel fetch failed for ${url}, attempting WebVM fallback...`);
    console.error(`[API Fallback] Error:`, error);
    
    const webvmAvailable = await isWebVMBackendAvailable();
    if (webvmAvailable) {
      const webvmUrl = mapVercelPathToWebVM(url);
      if (webvmUrl) {
        try {
          console.log(`[API Fallback] 🔄 Trying WebVM fallback: ${webvmUrl}`);
          const webvmResponse = await fetch(webvmUrl, options);
          
          if (webvmResponse.ok) {
            const duration = Date.now() - startTime;
            console.log(`[API Fallback] ✅ WebVM fallback succeeded for ${url} (${duration}ms)`);
            return webvmResponse;
          } else {
            const fallbackError = new APIFallbackError(
              `WebVM fallback returned status ${webvmResponse.status}`,
              url,
              undefined,
              true,
              error instanceof Error ? error : undefined
            );
            console.error(`[API Fallback] ❌ ${fallbackError.getUserMessage()}`);
            throw fallbackError;
          }
        } catch (webvmError) {
          const fallbackError = new APIFallbackError(
            `WebVM fallback failed: ${webvmError instanceof Error ? webvmError.message : 'Unknown error'}`,
            url,
            undefined,
            true,
            webvmError instanceof Error ? webvmError : undefined
          );
          console.error(`[API Fallback] ❌ ${fallbackError.getUserMessage()}`);
          throw fallbackError;
        }
      }
    }
    
    // Both Vercel and WebVM failed
    const finalError = new APIFallbackError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      url,
      undefined,
      webvmAvailable,
      error instanceof Error ? error : undefined
    );
    console.error(`[API Fallback] ❌ ${finalError.getUserMessage()}`);
    throw finalError;
  }
}

/**
 * Map Vercel API paths to WebVM backend paths
 */
function mapVercelPathToWebVM(vercelUrl: string): string | null {
  try {
    const url = new URL(vercelUrl, window.location.origin);
    const path = url.pathname;
    
    // Map Vercel API endpoints to WebVM backend endpoints
    if (path === '/api/environment') {
      return `${WEBVM_BACKEND_URL}/api/environment`;
    }
    
    if (path === '/api/auth/token') {
      return `${WEBVM_BACKEND_URL}/api/auth/token`;
    }
    
    if (path.startsWith('/api/proxy/cloudshell')) {
      // Extract the original path and query
      const originalPath = path.replace('/api/proxy/cloudshell', '');
      const query = url.search;
      return `${WEBVM_BACKEND_URL}/api/proxy/cloudshell${originalPath}${query}`;
    }
    
    if (path === '/clienterror/jserror') {
      const query = url.search;
      return `${WEBVM_BACKEND_URL}/clienterror/jserror${query}`;
    }
    
    // For other paths, return null (no fallback)
    return null;
  } catch {
    return null;
  }
}

// fetchWithFallback and APIFallbackError are already exported above

/**
 * Convenience wrapper for common API calls with error handling
 */
export const apiFallback = {
  /**
   * GET request with fallback
   */
  async get(url: string, options?: RequestInit): Promise<Response> {
    try {
      return await fetchWithFallback(url, { ...options, method: 'GET' });
    } catch (error) {
      if (error instanceof APIFallbackError) {
        // Log user-friendly message
        console.error(error.getUserMessage());
      }
      throw error;
    }
  },
  
  /**
   * POST request with fallback
   */
  async post(url: string, body?: any, options?: RequestInit): Promise<Response> {
    try {
      return await fetchWithFallback(url, {
        ...options,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch (error) {
      if (error instanceof APIFallbackError) {
        console.error(error.getUserMessage());
      }
      throw error;
    }
  },
  
  /**
   * PUT request with fallback
   */
  async put(url: string, body?: any, options?: RequestInit): Promise<Response> {
    try {
      return await fetchWithFallback(url, {
        ...options,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch (error) {
      if (error instanceof APIFallbackError) {
        console.error(error.getUserMessage());
      }
      throw error;
    }
  },
  
  /**
   * DELETE request with fallback
   */
  async delete(url: string, options?: RequestInit): Promise<Response> {
    try {
      return await fetchWithFallback(url, { ...options, method: 'DELETE' });
    } catch (error) {
      if (error instanceof APIFallbackError) {
        console.error(error.getUserMessage());
      }
      throw error;
    }
  },
};

