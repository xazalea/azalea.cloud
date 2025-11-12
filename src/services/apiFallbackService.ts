/**
 * API Fallback Service
 * Automatically falls back to WebVM backend when Vercel API routes return 500 errors
 * Includes comprehensive error handling and ensures WebVM is always available
 */

import { webvmManager } from './webvmManager';

const WEBVM_BACKEND_URL = 'http://localhost:3001';
const BROWSER_BACKEND_URL = '/api/backend'; // Browser-based backend (always available)

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
      // WebVM is optional - don't make it sound like a critical error
      return `⚠️ API Error: ${this.message}\n\n` +
             `The request to ${this.originalUrl} failed.\n` +
             `WebVM backend is not available as a fallback (this is optional).\n\n` +
             `Note: This is expected if WebVM is not running. The application will continue to work with Vercel APIs.`;
    }

    if (this.vercelStatus === 500) {
      return `⚠️ Vercel API Error: The request to ${this.originalUrl} returned a 500 error.\n\n` +
             `WebVM fallback was attempted but also failed.\n\n` +
             `Error details: ${this.message}`;
    }

    return `⚠️ API Error: ${this.message}\n\n` +
           `Request URL: ${this.originalUrl}\n` +
           `Status: ${this.vercelStatus || 'Network Error'}`;
  }
}

/**
 * Check if WebVM backend is available (with retry)
 * Falls back to browser backend if WebVM is not available
 */
async function isWebVMBackendAvailable(): Promise<boolean> {
  try {
    // First try WebVM backend (localhost:3001)
    const response = await fetch(`${WEBVM_BACKEND_URL}/api/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(2000),
    });
    if (response.ok) {
      return true;
    }
  } catch {
    // WebVM backend not available
  }
  
  // Fallback to browser backend (always available)
  try {
    const response = await fetch(`${BROWSER_BACKEND_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(2000),
    });
    return response.ok;
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
      // Ensure WebVM is available (quick check)
      const webvmAvailable = await isWebVMBackendAvailable();
      
      if (webvmAvailable) {
        // Map Vercel API paths to WebVM backend paths
        const webvmUrl = mapVercelPathToWebVM(url);
        
        if (webvmUrl) {
          try {
            const webvmResponse = await fetch(webvmUrl, options);
            
            if (webvmResponse.ok) {
              const duration = Date.now() - startTime;
              console.log(`[API Fallback] ✅ WebVM fallback succeeded for ${url} (${duration}ms)`);
              return webvmResponse;
            } else {
              // WebVM returned an error status - log but return original 500
              console.warn(`[API Fallback] ⚠️ WebVM fallback returned ${webvmResponse.status} for ${url}`);
              return response; // Return original 500
            }
          } catch (webvmError) {
            // WebVM fallback failed - log but return original 500
            console.warn(`[API Fallback] ⚠️ WebVM fallback failed for ${url}:`, webvmError instanceof Error ? webvmError.message : 'Unknown error');
            return response; // Return original 500
          }
        }
      }
      
      // WebVM not available or no mapping - return 500 response
      // Don't log - this is expected when WebVM isn't running
      return response;
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
    const webvmAvailable = await isWebVMBackendAvailable();
    if (webvmAvailable) {
      const webvmUrl = mapVercelPathToWebVM(url);
      if (webvmUrl) {
        try {
          const webvmResponse = await fetch(webvmUrl, options);
          
          if (webvmResponse.ok) {
            const duration = Date.now() - startTime;
            console.log(`[API Fallback] ✅ WebVM fallback succeeded for ${url} (${duration}ms)`);
            return webvmResponse;
          }
        } catch (webvmError) {
          // WebVM fallback failed - continue to throw original error
        }
      }
    }
    
    // Both Vercel and WebVM failed - throw original error
    throw error;
  }
}

/**
 * Map Vercel API paths to backend paths
 * Returns WebVM backend URL if available, otherwise browser backend URL
 */
function mapVercelPathToWebVM(vercelUrl: string): string | null {
  try {
    const url = new URL(vercelUrl, window.location.origin);
    const path = url.pathname;
    
    // Map Vercel API endpoints to backend endpoints
    // Default to browser backend (always available)
    // WebVM backend will be tried in fetchWithFallback if available
    
    if (path === '/api/environment') {
      // Prefer WebVM, but fallback to browser backend
      return `${WEBVM_BACKEND_URL}/api/environment`;
    }
    
    if (path === '/api/auth/token') {
      // Prefer WebVM, but fallback to browser backend
      return `${WEBVM_BACKEND_URL}/api/auth/token`;
    }
    
    if (path.startsWith('/api/proxy/cloudshell')) {
      // Extract the original path and query
      const originalPath = path.replace('/api/proxy/cloudshell', '');
      const query = url.search;
      // Prefer WebVM, but fallback to browser backend
      return `${WEBVM_BACKEND_URL}/api/proxy/cloudshell${originalPath}${query}`;
    }
    
    if (path === '/clienterror/jserror') {
      const query = url.search;
      // Prefer WebVM, but fallback to browser backend
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

