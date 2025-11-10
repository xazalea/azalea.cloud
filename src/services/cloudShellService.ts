/**
 * Cloud Shell Service
 * Handles cloud shell operations and commands with automatic metadata server authentication
 * Similar to Google Cloud Shell's seamless authentication
 */

import { gapiRequest } from '../../lib/api/gapiLoader';
import { CloudMetadataService } from '../../lib/services/cloudMetadataService';

export interface CloudShellSession {
  id: string;
  status: 'active' | 'inactive' | 'terminated';
  createdAt: number;
}

export interface CommandResult {
  output: string;
  exitCode: number;
  timestamp: number;
}

export class CloudShellService {
  private sessionId: string | null = null;
  private metadataService: CloudMetadataService;
  private isCloudEnvironment: boolean = false;

  constructor() {
    this.metadataService = new CloudMetadataService({
      autoRefresh: true,
      refreshBufferMinutes: 5,
    });
    // Initialize immediately and silently - don't wait for user
    this.initializeCloudEnvironment().catch(() => {
      // Silently fail if not in cloud environment
    });
  }

  /**
   * Initializes cloud environment and checks for metadata server
   * This happens automatically in the background - users don't need to authenticate
   */
  private async initializeCloudEnvironment(): Promise<void> {
    try {
      this.isCloudEnvironment = await this.metadataService.isCloudEnvironment();
      if (this.isCloudEnvironment) {
        // Pre-fetch token to ensure it's ready - this is automatic authentication
        await this.metadataService.getAccessToken();
        console.log('✓ Cloud environment detected - automatically authenticated via metadata server');
      }
    } catch (error) {
      // Silently handle - not in cloud environment
      this.isCloudEnvironment = false;
    }
  }

  /**
   * Creates a new cloud shell session
   */
  async createSession(): Promise<CloudShellSession> {
    try {
      // In a real implementation, this would call your backend API
      const session: CloudShellSession = {
        id: `session-${Date.now()}`,
        status: 'active',
        createdAt: Date.now(),
      };
      this.sessionId = session.id;
      return session;
    } catch (error) {
      console.error('Failed to create cloud shell session:', error);
      throw error;
    }
  }

  /**
   * Executes a command in the cloud shell
   * Automatically uses metadata server authentication for gcloud commands
   */
  async executeCommand(command: string): Promise<CommandResult> {
    if (!this.sessionId) {
      await this.createSession();
    }

    try {
      // Check if this is a gcloud command and we're in a cloud environment
      if (this.isCloudEnvironment && command.trim().startsWith('gcloud')) {
        return await this.executeGcloudCommand(command);
      }

      // For other commands, use standard execution
      const result = await this.simulateCommand(command);
      return result;
    } catch (error) {
      console.error('Failed to execute command:', error);
      throw error;
    }
  }

  /**
   * Executes a gcloud command with automatic metadata server authentication
   */
  private async executeGcloudCommand(command: string): Promise<CommandResult> {
    try {
      // Get access token from metadata server
      const token = await this.metadataService.getAccessToken();
      
      // Parse gcloud command
      const parts = command.trim().split(/\s+/);
      const gcloudArgs = parts.slice(1); // Remove 'gcloud' from the command

      // Execute with token
      const result = await this.metadataService.executeGcloudCommand(gcloudArgs);
      
      return {
        output: result.stdout,
        exitCode: result.exitCode,
        timestamp: Date.now(),
      };
    } catch (error) {
      return {
        output: `Error: ${error instanceof Error ? error.message : 'Unknown error'}\n` +
                'Make sure you are running in a Google Cloud environment.',
        exitCode: 1,
        timestamp: Date.now(),
      };
    }
  }

  /**
   * Simulates command execution (for development)
   */
  private async simulateCommand(command: string): Promise<CommandResult> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const cmd = command.trim().toLowerCase();
    let output = '';
    let exitCode = 0;

    if (cmd.startsWith('gcloud')) {
      output = 'Google Cloud SDK - AzaleaCloud Edition\n';
      output += 'Command executed successfully.';
    } else if (cmd === 'pwd') {
      output = '/home/azalea';
    } else if (cmd === 'whoami') {
      output = 'azalea';
    } else if (cmd === 'ls') {
      output = 'total 0\n';
      output += 'drwxr-xr-x  2 azalea azalea 4096 Jan  1 00:00 .\n';
      output += 'drwxr-xr-x  3 azalea azalea 4096 Jan  1 00:00 ..';
    } else if (cmd === 'help') {
      output = 'Available commands:\n';
      output += '  help          - Show help\n';
      output += '  gcloud        - Google Cloud CLI\n';
      output += '  ls            - List files\n';
      output += '  pwd           - Print working directory\n';
      output += '  whoami        - Display current user';
    } else {
      output = `Command not found: ${command.split(' ')[0]}`;
      exitCode = 127;
    }

    return {
      output,
      exitCode,
      timestamp: Date.now(),
    };
  }

  /**
   * Terminates the current session
   */
  async terminateSession(): Promise<void> {
    if (this.sessionId) {
      // In a real implementation, this would call your backend API
      this.sessionId = null;
    }
    // Clean up metadata service
    this.metadataService.stop();
  }

  /**
   * Gets the current access token (for debugging/inspection)
   */
  async getAccessToken(): Promise<string | null> {
    if (!this.isCloudEnvironment) {
      return null;
    }
    try {
      return await this.metadataService.getAccessToken();
    } catch {
      return null;
    }
  }

  /**
   * Checks if running in cloud environment
   */
  isInCloudEnvironment(): boolean {
    return this.isCloudEnvironment;
  }
}

