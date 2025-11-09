/**
 * Google API Loader
 * Converted from api.js - Simplified version for AzaleaCloud
 */

export interface GapiConfig {
  apiKey: string;
  clientId: string;
  discoveryDocs: string[];
  scope: string;
}

export interface GapiAuthResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

declare global {
  interface Window {
    gapi?: {
      load: (features: string, options?: { callback?: () => void } | (() => void)) => void;
      auth2?: {
        init: (config: any) => Promise<any>;
        getAuthInstance: () => any;
      };
      client?: {
        init: (config: GapiConfig) => Promise<void>;
        request: (options: any) => Promise<any>;
      };
    };
    gapi_onload?: () => void;
  }
}

/**
 * Loads the Google API client library
 */
export function loadGapi(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.gapi) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.gapi_onload = () => resolve();
      if (window.gapi) {
        // gapi.load can accept either a callback function or an options object
        const loadOptions: { callback?: () => void } = {
          callback: window.gapi_onload,
        };
        window.gapi.load('', loadOptions);
      } else {
        resolve();
      }
    };
    script.onerror = () => reject(new Error('Failed to load Google API'));
    document.head.appendChild(script);
  });
}

/**
 * Initializes the Google API client
 */
export async function initGapiClient(config: GapiConfig): Promise<void> {
  await loadGapi();

  if (!window.gapi || !window.gapi.client) {
    throw new Error('Google API client not loaded');
  }

  await window.gapi.client.init({
    apiKey: config.apiKey,
    clientId: config.clientId,
    discoveryDocs: config.discoveryDocs,
    scope: config.scope,
  });
}

/**
 * Makes an authenticated request using the Google API client
 */
export async function gapiRequest(options: {
  path: string;
  method?: string;
  params?: Record<string, any>;
  body?: any;
}): Promise<any> {
  if (!window.gapi || !window.gapi.client) {
    throw new Error('Google API client not initialized');
  }

  return window.gapi.client.request({
    path: options.path,
    method: options.method || 'GET',
    params: options.params,
    body: options.body,
  });
}

