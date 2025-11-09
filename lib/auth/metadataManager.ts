/**
 * Metadata Manager
 * Manages custom metadata entries for long-lived access tokens
 */

// Server-side only imports - these packages are not needed for frontend build
// @ts-ignore - Optional server-side dependency
import type { GoogleAuth } from 'google-auth-library';
// @ts-ignore - Optional server-side dependency
import type { Compute } from '@google-cloud/compute';
import { ref, set, get } from 'firebase/database';
import { database } from '../../src/config/firebase';

export interface MetadataEntry {
  key: string;
  value: string;
  instanceName: string;
  zone: string;
  projectId: string;
  createdAt: number;
}

export class MetadataManager {
  private auth: GoogleAuth;
  private compute: Compute;
  private projectId: string;

  constructor() {
    this.projectId = 'azaleacompute';
    
    // Server-side only: Initialize Google Cloud clients
    // These will only work in a Node.js environment, not in the browser
    if (typeof window === 'undefined') {
      try {
        // @ts-ignore - Dynamic import for server-side only
        const { GoogleAuth } = require('google-auth-library');
        // @ts-ignore - Dynamic import for server-side only
        const { Compute } = require('@google-cloud/compute');
        
        this.auth = new GoogleAuth({
          keyFile: './azaleacompute-fe11c72f4aa9.json',
          scopes: [
            'https://www.googleapis.com/auth/cloud-platform',
            'https://www.googleapis.com/auth/compute',
          ],
        });

        this.compute = new Compute({
          auth: this.auth,
          projectId: this.projectId,
        });
      } catch (error) {
        console.warn('Google Cloud Compute libraries not available (server-side only)');
      }
    }
  }

  /**
   * Sets custom metadata on a compute instance
   */
  async setInstanceMetadata(
    instanceName: string,
    zone: string,
    metadataKey: string,
    metadataValue: string
  ): Promise<void> {
    try {
      const zoneObj = this.compute.zone(zone);
      const instance = zoneObj.instance(instanceName);

      // Get current metadata
      const [metadata] = await instance.getMetadata();
      const currentMetadata = metadata.metadata?.items || [];

      // Add or update the metadata entry
      const existingIndex = currentMetadata.findIndex(
        (item: any) => item.key === metadataKey
      );

      if (existingIndex >= 0) {
        currentMetadata[existingIndex].value = metadataValue;
      } else {
        currentMetadata.push({
          key: metadataKey,
          value: metadataValue,
        });
      }

      // Update instance metadata
      await instance.setMetadata({
        items: currentMetadata,
      });

      // Store in Firebase
      await this.saveMetadataEntry({
        key: metadataKey,
        value: metadataValue,
        instanceName,
        zone,
        projectId: this.projectId,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.error('Failed to set instance metadata:', error);
      throw error;
    }
  }

  /**
   * Sets a long-lived token as metadata
   */
  async setLongLivedToken(
    instanceName: string,
    zone: string,
    token: string
  ): Promise<void> {
    await this.setInstanceMetadata(instanceName, zone, 'long-lived-token', token);
  }

  /**
   * Gets metadata from an instance
   */
  async getInstanceMetadata(
    instanceName: string,
    zone: string
  ): Promise<Record<string, string>> {
    try {
      const zoneObj = this.compute.zone(zone);
      const instance = zoneObj.instance(instanceName);
      const [metadata] = await instance.getMetadata();

      const metadataMap: Record<string, string> = {};
      if (metadata.metadata?.items) {
        metadata.metadata.items.forEach((item: any) => {
          metadataMap[item.key] = item.value;
        });
      }

      return metadataMap;
    } catch (error) {
      console.error('Failed to get instance metadata:', error);
      throw error;
    }
  }

  /**
   * Saves metadata entry to Firebase
   */
  private async saveMetadataEntry(entry: MetadataEntry): Promise<void> {
    const entryRef = ref(
      database,
      `metadataEntries/${entry.instanceName}/${entry.key}`
    );
    await set(entryRef, entry);
  }

  /**
   * Gets all metadata entries for an instance
   */
  async getMetadataEntries(instanceName: string): Promise<MetadataEntry[]> {
    const entriesRef = ref(database, `metadataEntries/${instanceName}`);
    const snapshot = await get(entriesRef);

    if (!snapshot.exists()) {
      return [];
    }

    const entries: MetadataEntry[] = [];
    snapshot.forEach((child) => {
      entries.push(child.val() as MetadataEntry);
    });

    return entries;
  }
}

