/**
 * Background Worker for Automated Account Management
 * Runs periodically to create accounts and generate keys
 */

import { ServiceAccountManager } from '../auth/serviceAccountManager';
import { KeyGenerator } from '../auth/keyGenerator';
import { MetadataManager } from '../auth/metadataManager';
import { TokenRefreshManager } from '../auth/metadataAuth';
import { AuthKeyService } from '../auth/authKeyService';

export interface WorkerConfig {
  enableAutoAccountCreation: boolean;
  enableAutoKeyGeneration: boolean;
  enableAutoMetadataUpdate: boolean;
  checkIntervalMinutes: number;
}

export class AccountWorker {
  private serviceAccountManager: ServiceAccountManager;
  private keyGenerator: KeyGenerator;
  private metadataManager: MetadataManager;
  private authKeyService: AuthKeyService;
  private tokenManager: TokenRefreshManager | null = null;
  private intervalId: NodeJS.Timeout | null = null;
  private config: WorkerConfig;

  constructor(config: Partial<WorkerConfig> = {}) {
    this.config = {
      enableAutoAccountCreation: config.enableAutoAccountCreation ?? true,
      enableAutoKeyGeneration: config.enableAutoKeyGeneration ?? true,
      enableAutoMetadataUpdate: config.enableAutoMetadataUpdate ?? true,
      checkIntervalMinutes: config.checkIntervalMinutes ?? 60,
    };

    this.serviceAccountManager = new ServiceAccountManager();
    this.keyGenerator = new KeyGenerator();
    this.metadataManager = new MetadataManager();
    this.authKeyService = new AuthKeyService();
  }

  /**
   * Starts the background worker
   */
  async start(): Promise<void> {
    console.log('Starting AzaleaCloud Account Worker...');

    // Initial run
    await this.run();

    // Schedule periodic runs
    const intervalMs = this.config.checkIntervalMinutes * 60 * 1000;
    this.intervalId = setInterval(() => {
      this.run().catch(console.error);
    }, intervalMs);

    // Start token refresh manager
    this.tokenManager = new TokenRefreshManager(async (token) => {
      await this.authKeyService.saveAuthKey(token);
    });

    try {
      await this.tokenManager.start();
    } catch (error) {
      console.log('Token manager not available (running locally)');
    }
  }

  /**
   * Stops the background worker
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.tokenManager) {
      this.tokenManager.stop();
      this.tokenManager = null;
    }
  }

  /**
   * Main worker run logic
   */
  private async run(): Promise<void> {
    console.log('Running account worker tasks...');

    try {
      if (this.config.enableAutoKeyGeneration) {
        await this.processKeyGenerationJobs();
      }

      if (this.config.enableAutoAccountCreation) {
        await this.ensureUsersHaveAccounts();
      }

      if (this.config.enableAutoMetadataUpdate) {
        await this.updateInstanceMetadata();
      }

      console.log('Account worker tasks completed successfully');
    } catch (error) {
      console.error('Error in account worker:', error);
    }
  }

  /**
   * Processes pending key generation jobs
   */
  private async processKeyGenerationJobs(): Promise<void> {
    const pendingJobs = await this.keyGenerator.getPendingJobs();
    
    for (const job of pendingJobs) {
      try {
        await this.keyGenerator.processKeyGenerationJob(job);
        console.log(`Processed key generation job: ${job.id}`);
      } catch (error) {
        console.error(`Failed to process job ${job.id}:`, error);
      }
    }
  }

  /**
   * Ensures all users have active service accounts
   */
  private async ensureUsersHaveAccounts(): Promise<void> {
    // In a real implementation, you'd fetch users from Firebase
    // For now, this is a placeholder
    console.log('Checking user accounts...');
  }

  /**
   * Updates instance metadata with latest tokens
   */
  private async updateInstanceMetadata(): Promise<void> {
    try {
      // Get the latest valid token
      const latestKey = await this.authKeyService.getLatestValidKey();
      
      if (latestKey && this.tokenManager) {
        const token = await this.tokenManager.getToken();
        
        // Update metadata on all relevant instances
        // In production, you'd have a list of instances to update
        console.log('Updating instance metadata with latest token...');
      }
    } catch (error) {
      console.error('Failed to update instance metadata:', error);
    }
  }

  /**
   * Creates an account for a new user
   */
  async createAccountForUser(userId: string, displayName: string): Promise<void> {
    try {
      const account = await this.serviceAccountManager.autoCreateAccountForUser(
        userId,
        displayName
      );

      // Generate initial key
      if (this.config.enableAutoKeyGeneration) {
        await this.keyGenerator.createKeyGenerationJob(account.email, userId);
      }

      console.log(`Created account for user ${userId}: ${account.email}`);
    } catch (error) {
      console.error(`Failed to create account for user ${userId}:`, error);
      throw error;
    }
  }
}

