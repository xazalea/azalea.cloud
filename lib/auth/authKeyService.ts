import { ref, set, get, push, remove, onValue, off, DatabaseReference } from 'firebase/database';
import { database } from '../../src/config/firebase';
import { AccessToken, AuthKey } from './metadataAuth';

const AUTH_KEYS_PATH = 'authKeys';
const USER_EMAIL = 'azalea.compute@gmail.com';

/**
 * Service for managing auth keys in Firebase Realtime Database
 */
export class AuthKeyService {
  private userId: string;

  constructor(userId: string = USER_EMAIL) {
    this.userId = userId;
  }

  /**
   * Saves an access token to the database
   */
  async saveAuthKey(token: AccessToken, metadata?: Record<string, any>): Promise<string> {
    const authKeyRef = ref(database, `${AUTH_KEYS_PATH}/${this.userId}`);
    const newKeyRef = push(authKeyRef);

    const authKey: AuthKey = {
      id: newKeyRef.key!,
      token: token.token,
      expiresAt: token.expiresAt,
      createdAt: token.createdAt,
      userId: this.userId,
      metadata,
    };

    await set(newKeyRef, authKey);
    return newKeyRef.key!;
  }

  /**
   * Gets all auth keys for the user
   */
  async getAuthKeys(): Promise<AuthKey[]> {
    const authKeysRef = ref(database, `${AUTH_KEYS_PATH}/${this.userId}`);
    const snapshot = await get(authKeysRef);

    if (!snapshot.exists()) {
      return [];
    }

    const keys: AuthKey[] = [];
    snapshot.forEach((child) => {
      keys.push(child.val() as AuthKey);
    });

    return keys.sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Gets the most recent valid auth key
   */
  async getLatestValidKey(): Promise<AuthKey | null> {
    const keys = await this.getAuthKeys();
    const now = Date.now();
    
    // Find the most recent non-expired key
    for (const key of keys) {
      if (key.expiresAt > now) {
        return key;
      }
    }

    return null;
  }

  /**
   * Deletes an auth key
   */
  async deleteAuthKey(keyId: string): Promise<void> {
    const keyRef = ref(database, `${AUTH_KEYS_PATH}/${this.userId}/${keyId}`);
    await remove(keyRef);
  }

  /**
   * Cleans up expired keys
   */
  async cleanupExpiredKeys(): Promise<number> {
    const keys = await this.getAuthKeys();
    const now = Date.now();
    let deletedCount = 0;

    for (const key of keys) {
      if (key.expiresAt <= now) {
        await this.deleteAuthKey(key.id);
        deletedCount++;
      }
    }

    return deletedCount;
  }

  /**
   * Listens to auth key changes
   */
  subscribeToAuthKeys(callback: (keys: AuthKey[]) => void): () => void {
    const authKeysRef = ref(database, `${AUTH_KEYS_PATH}/${this.userId}`);
    
    const unsubscribe = onValue(authKeysRef, (snapshot) => {
      if (!snapshot.exists()) {
        callback([]);
        return;
      }

      const keys: AuthKey[] = [];
      snapshot.forEach((child) => {
        keys.push(child.val() as AuthKey);
      });

      callback(keys.sort((a, b) => b.createdAt - a.createdAt));
    });

    return () => {
      off(authKeysRef);
    };
  }
}

