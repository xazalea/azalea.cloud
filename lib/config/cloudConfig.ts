/**
 * Cloud Shell Configuration
 * Converted from shell.html configuration
 */

export interface CloudConfig {
  productName: string;
  deleteIsEnforced: boolean;
  sealIsEnforced: boolean;
  heartbeatRate: number;
  periodicReportingRateMillis: number;
  disableAllReporting: boolean;
}

export const defaultCloudConfig: CloudConfig = {
  productName: 'azalea-cloud-compute',
  deleteIsEnforced: false,
  sealIsEnforced: false,
  heartbeatRate: 0.5,
  periodicReportingRateMillis: 60000.0,
  disableAllReporting: false,
};

export interface ServerVars {
  user: [string, string, string, string?];
  endpoints: string[];
  serverVersion: string;
  clientId: string;
  apiKey: string;
  resourceManagerUrl: string;
  scopes: string;
  timeout: number;
  workstationsUrl: string;
}

export const defaultServerVars: ServerVars = {
  user: ['azalea.compute@gmail.com', '0', 'Azalea', 'Cloud'],
  endpoints: [
    'https://shell.azalea-cloud.com',
    'https://api.azalea-cloud.com',
  ],
  serverVersion: 'azalea-cloud-server_1.0.0',
  clientId: 'azalea-cloud-client-id',
  apiKey: 'azalea-cloud-api-key',
  resourceManagerUrl: 'https://resourcemanager.azalea-cloud.com',
  scopes: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/cloud-platform',
  timeout: 60,
  workstationsUrl: 'https://workstations.azalea-cloud.com',
};

