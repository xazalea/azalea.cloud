/**
 * Database Cache Service
 * Uses Firebase to cache data for improved performance
 */

import { ref, set, get, onValue, off } from 'firebase/database';
import { database } from '../config/firebase';

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export class DatabaseCache {
  private static instance: DatabaseCache;
  private memoryCache: Map<string, any> = new Map();
  private defaultTTL: number = 60 * 60 * 1000; // 1 hour

  private constructor() {}

  static getInstance(): DatabaseCache {
    if (!DatabaseCache.instance) {
      DatabaseCache.instance = new DatabaseCache();
    }
    return DatabaseCache.instance;
  }

  /**
   * Gets cached data, checking memory first, then database
   */
  async get<T>(key: string): Promise<T | null> {
    // Check memory cache first
    if (this.memoryCache.has(key)) {
      const entry = this.memoryCache.get(key) as CacheEntry<T>;
      if (Date.now() < entry.expiresAt) {
        return entry.data;
      }
      this.memoryCache.delete(key);
    }

    // Check database cache
    try {
      const cacheRef = ref(database, `cache/${key}`);
      const snapshot = await get(cacheRef);
      
      if (snapshot.exists()) {
        const entry = snapshot.val() as CacheEntry<T>;
        
        // Check if expired
        if (Date.now() < entry.expiresAt) {
          // Store in memory cache
          this.memoryCache.set(key, entry);
          return entry.data;
        } else {
          // Expired, remove from database
          await set(cacheRef, null);
        }
      }
    } catch (error) {
      console.error('Failed to get from database cache:', error);
    }

    return null;
  }

  /**
   * Sets cached data in both memory and database
   */
  async set<T>(key: string, data: T, ttl?: number): Promise<void> {
    const expiresAt = Date.now() + (ttl || this.defaultTTL);
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt,
    };

    // Store in memory cache
    this.memoryCache.set(key, entry);

    // Store in database cache
    try {
      const cacheRef = ref(database, `cache/${key}`);
      await set(cacheRef, entry);
    } catch (error) {
      console.error('Failed to set database cache:', error);
    }
  }

  /**
   * Watches a cache key for changes
   */
  watch<T>(key: string, callback: (data: T | null) => void): () => void {
    const cacheRef = ref(database, `cache/${key}`);
    
    const unsubscribe = onValue(cacheRef, (snapshot) => {
      if (snapshot.exists()) {
        const entry = snapshot.val() as CacheEntry<T>;
        if (Date.now() < entry.expiresAt) {
          this.memoryCache.set(key, entry);
          callback(entry.data);
        } else {
          callback(null);
        }
      } else {
        callback(null);
      }
    });

    return () => {
      off(cacheRef);
      unsubscribe();
    };
  }

  /**
   * Invalidates a cache key
   */
  async invalidate(key: string): Promise<void> {
    this.memoryCache.delete(key);
    
    try {
      const cacheRef = ref(database, `cache/${key}`);
      await set(cacheRef, null);
    } catch (error) {
      console.error('Failed to invalidate cache:', error);
    }
  }

  /**
   * Clears all cache
   */
  async clear(): Promise<void> {
    this.memoryCache.clear();
    
    try {
      const cacheRef = ref(database, 'cache');
      await set(cacheRef, null);
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }

  /**
   * Prefetches data if not cached
   */
  async prefetch<T>(key: string, fetcher: () => Promise<T>, ttl?: number): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const data = await fetcher();
    await this.set(key, data, ttl);
    return data;
  }
}

