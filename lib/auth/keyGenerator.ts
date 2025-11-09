/**
 * Automated Key Generator
 * Generates and distributes service account keys automatically
 */

import { ServiceAccountManager, ServiceAccount, ServiceAccountKey } from './serviceAccountManager';
import { AuthKeyService } from './authKeyService';
import { ref, set, push, get } from 'firebase/database';
import { database } from '../../src/config/firebase';

export interface KeyGenerationJob {
  id: string;
  serviceAccountEmail: string;
  userId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: number;
  completedAt?: number;
  error?: string;
}

export class KeyGenerator {
  private serviceAccountManager: ServiceAccountManager;
  private authKeyService: AuthKeyService;

  constructor() {
    this.serviceAccountManager = new ServiceAccountManager();
    this.authKeyService = new AuthKeyService();
  }

  /**
   * Generates a new key for a service account and stores it
   */
  async generateAndStoreKey(
    serviceAccountEmail: string,
    userId: string
  ): Promise<ServiceAccountKey> {
    try {
      // Generate the key
      const key = await this.serviceAccountManager.generateServiceAccountKey(
        serviceAccountEmail
      );

      // Decode the private key data (base64)
      const privateKeyJson = Buffer.from(key.privateKeyData, 'base64').toString('utf-8');
      const keyData = JSON.parse(privateKeyJson);

      // Store the key securely in Firebase
      await this.storeKeyInFirebase(keyData, serviceAccountEmail, userId);

      // Also store as an auth key for easy access
      await this.authKeyService.saveAuthKey(
        {
          token: keyData.private_key,
          expiresAt: new Date(key.validBeforeTime).getTime(),
          createdAt: Date.now(),
        },
        {
          serviceAccountEmail,
          keyId: key.name,
        }
      );

      return key;
    } catch (error) {
      console.error('Failed to generate and store key:', error);
      throw error;
    }
  }

  /**
   * Stores the key in Firebase
   */
  private async storeKeyInFirebase(
    keyData: any,
    serviceAccountEmail: string,
    userId: string
  ): Promise<void> {
    const keysRef = ref(database, `serviceAccountKeys/${userId}`);
    const newKeyRef = push(keysRef);

    await set(newKeyRef, {
      serviceAccountEmail,
      keyId: keyData.private_key_id,
      keyData: keyData, // In production, encrypt this
      createdAt: Date.now(),
      expiresAt: keyData.expires_at || null,
    });
  }

  /**
   * Processes a key generation job
   */
  async processKeyGenerationJob(job: KeyGenerationJob): Promise<void> {
    try {
      // Update job status
      await this.updateJobStatus(job.id, 'processing');

      // Generate and store the key
      await this.generateAndStoreKey(job.serviceAccountEmail, job.userId);

      // Mark job as completed
      await this.updateJobStatus(job.id, 'completed', Date.now());
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.updateJobStatus(job.id, 'failed', undefined, errorMessage);
      throw error;
    }
  }

  /**
   * Creates a new key generation job
   */
  async createKeyGenerationJob(
    serviceAccountEmail: string,
    userId: string
  ): Promise<string> {
    const jobsRef = ref(database, 'keyGenerationJobs');
    const newJobRef = push(jobsRef);

    const job: KeyGenerationJob = {
      id: newJobRef.key || '',
      serviceAccountEmail,
      userId,
      status: 'pending',
      createdAt: Date.now(),
    };

    await set(newJobRef, job);
    return job.id;
  }

  /**
   * Updates job status
   */
  private async updateJobStatus(
    jobId: string,
    status: KeyGenerationJob['status'],
    completedAt?: number,
    error?: string
  ): Promise<void> {
    const jobRef = ref(database, `keyGenerationJobs/${jobId}`);
    const snapshot = await get(jobRef);
    
    if (snapshot.exists()) {
      const job = snapshot.val() as KeyGenerationJob;
      await set(jobRef, {
        ...job,
        status,
        completedAt: completedAt || job.completedAt,
        error: error || job.error,
      });
    }
  }

  /**
   * Gets pending jobs
   */
  async getPendingJobs(): Promise<KeyGenerationJob[]> {
    const jobsRef = ref(database, 'keyGenerationJobs');
    const snapshot = await get(jobsRef);

    if (!snapshot.exists()) {
      return [];
    }

    const jobs: KeyGenerationJob[] = [];
    snapshot.forEach((child) => {
      const job = child.val() as KeyGenerationJob;
      if (job.status === 'pending') {
        jobs.push(job);
      }
    });

    return jobs.sort((a, b) => a.createdAt - b.createdAt);
  }
}

