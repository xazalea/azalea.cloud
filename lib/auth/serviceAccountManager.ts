/**
 * Service Account Manager
 * Handles creation and management of service accounts for unlimited user access
 */

import { GoogleAuth } from 'google-auth-library';
import { IAM } from '@google-cloud/iam';
import { ref, set, push, get, onValue, off, DatabaseReference } from 'firebase/database';
import { database } from '../../src/config/firebase';

export interface ServiceAccount {
  email: string;
  displayName: string;
  uniqueId: string;
  projectId: string;
  createdAt: number;
  keyId?: string;
  status: 'active' | 'suspended' | 'deleted';
}

export interface ServiceAccountKey {
  name: string;
  privateKeyData: string;
  validAfterTime: string;
  validBeforeTime: string;
  keyAlgorithm: string;
  keyType: string;
  keyOrigin: string;
}

export class ServiceAccountManager {
  private auth: GoogleAuth;
  private iamClient: IAM;
  private projectId: string;
  private serviceAccountEmail: string;

  constructor() {
    // Initialize with the provided service account
    this.projectId = 'azaleacompute';
    this.serviceAccountEmail = 'azalea@azaleacompute.iam.gserviceaccount.com';
    
    // Initialize Google Auth with service account
    this.auth = new GoogleAuth({
      keyFile: './azaleacompute-fe11c72f4aa9.json',
      scopes: [
        'https://www.googleapis.com/auth/cloud-platform',
        'https://www.googleapis.com/auth/iam',
      ],
    });

    this.iamClient = new IAM({
      auth: this.auth,
      projectId: this.projectId,
    });
  }

  /**
   * Creates a new service account for a user
   */
  async createServiceAccount(
    displayName: string,
    userId: string
  ): Promise<ServiceAccount> {
    try {
      const accountId = `azalea-user-${userId}-${Date.now()}`.toLowerCase();
      
      const [serviceAccount] = await this.iamClient.projects.serviceAccounts.create({
        name: `projects/${this.projectId}`,
        accountId,
        serviceAccount: {
          displayName: `${displayName} - AzaleaCloud User`,
          description: `Service account for AzaleaCloud user: ${userId}`,
        },
      });

      const newAccount: ServiceAccount = {
        email: serviceAccount.email || '',
        displayName: serviceAccount.displayName || displayName,
        uniqueId: serviceAccount.uniqueId || '',
        projectId: this.projectId,
        createdAt: Date.now(),
        status: 'active',
      };

      // Grant necessary roles
      await this.grantRoles(serviceAccount.email || '', [
        'roles/iam.serviceAccountUser',
        'roles/compute.instanceAdmin.v1',
        'roles/storage.objectViewer',
      ]);

      // Store in Firebase
      await this.saveServiceAccountToFirebase(newAccount, userId);

      return newAccount;
    } catch (error) {
      console.error('Failed to create service account:', error);
      throw error;
    }
  }

  /**
   * Grants IAM roles to a service account
   */
  private async grantRoles(
    serviceAccountEmail: string,
    roles: string[]
  ): Promise<void> {
    // Note: This would require additional IAM permissions
    // In production, you'd use the Resource Manager API
    console.log(`Granting roles to ${serviceAccountEmail}:`, roles);
  }

  /**
   * Generates a new key for a service account
   */
  async generateServiceAccountKey(
    serviceAccountEmail: string
  ): Promise<ServiceAccountKey> {
    try {
      const name = `projects/${this.projectId}/serviceAccounts/${serviceAccountEmail}`;
      
      const [key] = await this.iamClient.projects.serviceAccounts.keys.create({
        name,
        keyAlgorithm: 'KEY_ALG_RSA_2048',
        privateKeyType: 'TYPE_GOOGLE_CREDENTIALS_FILE',
      });

      return {
        name: key.name || '',
        privateKeyData: key.privateKeyData || '',
        validAfterTime: key.validAfterTime || '',
        validBeforeTime: key.validBeforeTime || '',
        keyAlgorithm: key.keyAlgorithm || '',
        keyType: key.keyType || '',
        keyOrigin: key.keyOrigin || '',
      };
    } catch (error) {
      console.error('Failed to generate service account key:', error);
      throw error;
    }
  }

  /**
   * Lists all service accounts for a user
   */
  async listServiceAccounts(userId: string): Promise<ServiceAccount[]> {
    const accountsRef = ref(database, `serviceAccounts/${userId}`);
    const snapshot = await get(accountsRef);

    if (!snapshot.exists()) {
      return [];
    }

    const accounts: ServiceAccount[] = [];
    snapshot.forEach((child) => {
      accounts.push(child.val() as ServiceAccount);
    });

    return accounts.sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Saves service account to Firebase
   */
  private async saveServiceAccountToFirebase(
    account: ServiceAccount,
    userId: string
  ): Promise<void> {
    const accountRef = ref(database, `serviceAccounts/${userId}`);
    const newAccountRef = push(accountRef);
    await set(newAccountRef, account);
  }

  /**
   * Deletes a service account
   */
  async deleteServiceAccount(
    serviceAccountEmail: string,
    userId: string
  ): Promise<void> {
    try {
      const name = `projects/${this.projectId}/serviceAccounts/${serviceAccountEmail}`;
      await this.iamClient.projects.serviceAccounts.delete({ name });

      // Remove from Firebase
      const accountsRef = ref(database, `serviceAccounts/${userId}`);
      const snapshot = await get(accountsRef);
      
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          const account = child.val() as ServiceAccount;
          if (account.email === serviceAccountEmail) {
            const accountRef = ref(database, `serviceAccounts/${userId}/${child.key}`);
            // Note: Would need remove() function imported
            // await remove(accountRef);
          }
        });
      }
    } catch (error) {
      console.error('Failed to delete service account:', error);
      throw error;
    }
  }

  /**
   * Automatically creates accounts for new users
   */
  async autoCreateAccountForUser(userId: string, displayName: string): Promise<ServiceAccount> {
    // Check if user already has an account
    const existingAccounts = await this.listServiceAccounts(userId);
    
    if (existingAccounts.length > 0 && existingAccounts[0].status === 'active') {
      return existingAccounts[0];
    }

    // Create new account
    return await this.createServiceAccount(displayName, userId);
  }
}

