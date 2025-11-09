/**
 * Worker Service
 * Manages the background worker for automated account creation
 */

import { AccountWorker } from '../../lib/workers/accountWorker';

let workerInstance: AccountWorker | null = null;

/**
 * Starts the background worker
 */
export function startWorker(): void {
  if (workerInstance) {
    console.log('Worker already running');
    return;
  }

  workerInstance = new AccountWorker({
    enableAutoAccountCreation: true,
    enableAutoKeyGeneration: true,
    enableAutoMetadataUpdate: true,
    checkIntervalMinutes: 60, // Check every hour
  });

  workerInstance.start().catch(console.error);
}

/**
 * Stops the background worker
 */
export function stopWorker(): void {
  if (workerInstance) {
    workerInstance.stop();
    workerInstance = null;
  }
}

/**
 * Creates an account for a user
 */
export async function createUserAccount(userId: string, displayName: string): Promise<void> {
  if (!workerInstance) {
    // Create a temporary worker instance
    const tempWorker = new AccountWorker();
    await tempWorker.createAccountForUser(userId, displayName);
  } else {
    await workerInstance.createAccountForUser(userId, displayName);
  }
}

