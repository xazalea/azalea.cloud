/**
 * Auto Tunnel Service
 * Automatically sets up tunnels when desktop is requested
 * Uses Cloudflare Tunnel (cloudflared) by default
 */

import { ref, set, get, onValue } from 'firebase/database';
import { database } from '../config/firebase';
import { TunnelService } from './tunnelService';
import { DatabaseCache } from './databaseCache';

export interface TunnelInfo {
  url: string;
  port: number;
  service: string;
  createdAt: number;
  expiresAt?: number;
}

export class AutoTunnelService {
  private static instance: AutoTunnelService;
  private tunnelService: TunnelService;
  private databaseCache: DatabaseCache;
  private activeTunnels: Map<number, TunnelInfo> = new Map();

  private constructor() {
    this.tunnelService = TunnelService.getInstance();
    this.databaseCache = DatabaseCache.getInstance();
  }

  static getInstance(): AutoTunnelService {
    if (!AutoTunnelService.instance) {
      AutoTunnelService.instance = new AutoTunnelService();
    }
    return AutoTunnelService.instance;
  }

  /**
   * Automatically sets up a tunnel for the given port
   * Tries to get from cache first (database + memory), then creates new tunnel
   * @param onProgress Callback for progress updates
   */
  async setupTunnel(
    port: number = 8080,
    onProgress?: (message: string) => void
  ): Promise<string> {
    // Check database cache first (fastest)
    onProgress?.('Checking cache for existing tunnel...');
    await new Promise((resolve) => setTimeout(resolve, 300)); // Small delay to show progress
    
    const cacheKey = `tunnel_${port}`;
    const cachedTunnel = await this.databaseCache.get<TunnelInfo>(cacheKey);
    if (cachedTunnel && !this.isExpired(cachedTunnel)) {
      onProgress?.(`Using cached tunnel: ${cachedTunnel.service}`);
      console.log('Using cached tunnel from database:', cachedTunnel.url);
      this.tunnelService.setCustomUrl(cachedTunnel.url);
      this.activeTunnels.set(port, cachedTunnel);
      // Small delay to show the message
      await new Promise((resolve) => setTimeout(resolve, 500));
      return cachedTunnel.url;
    }

    // Check Firebase cache as fallback
    onProgress?.('Checking Firebase for tunnel...');
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    const firebaseTunnel = await this.getCachedTunnel(port);
    if (firebaseTunnel && !this.isExpired(firebaseTunnel)) {
      onProgress?.(`Found tunnel in Firebase: ${firebaseTunnel.service}`);
      console.log('Using cached tunnel from Firebase:', firebaseTunnel.url);
      // Store in database cache for faster access next time
      await this.databaseCache.set(cacheKey, firebaseTunnel, 24 * 60 * 60 * 1000);
      this.tunnelService.setCustomUrl(firebaseTunnel.url);
      this.activeTunnels.set(port, firebaseTunnel);
      await new Promise((resolve) => setTimeout(resolve, 500));
      return firebaseTunnel.url;
    }

    // Try to get tunnel from Vercel first (best option for Vercel deployments)
    onProgress?.('Requesting Vercel tunnel...');
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    try {
      const vercelTunnelUrl = await this.tunnelService.setupVercelTunnel(port);
      if (vercelTunnelUrl) {
        onProgress?.(`Vercel tunnel created: ${vercelTunnelUrl.substring(0, 40)}...`);
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        const tunnelInfo: TunnelInfo = {
          url: vercelTunnelUrl,
          port,
          service: 'vercel',
          createdAt: Date.now(),
          expiresAt: Date.now() + (24 * 60 * 60 * 1000),
        };
        
        onProgress?.('Caching tunnel URL...');
        // Cache in both database cache and Firebase
        await this.databaseCache.set(cacheKey, tunnelInfo, 24 * 60 * 60 * 1000);
        await this.cacheTunnel(port, vercelTunnelUrl, 'vercel');
        this.tunnelService.setCustomUrl(vercelTunnelUrl);
        this.activeTunnels.set(port, tunnelInfo);
        await new Promise((resolve) => setTimeout(resolve, 400));
        return vercelTunnelUrl;
      }
    } catch (error) {
      onProgress?.(`Vercel tunnel unavailable, trying alternatives...`);
      console.warn('Vercel tunnel not available:', error);
    }

    // Fallback: Try other tunnel services
    try {
      const tunnelUrl = await this.requestTunnelFromBackend(port);
      if (tunnelUrl) {
        onProgress?.(`Tunnel created: ${tunnelUrl.substring(0, 40)}...`);
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        const tunnelInfo: TunnelInfo = {
          url: tunnelUrl,
          port,
          service: 'cloudflared',
          createdAt: Date.now(),
          expiresAt: Date.now() + (24 * 60 * 60 * 1000),
        };
        
        onProgress?.('Caching tunnel URL...');
        await this.databaseCache.set(cacheKey, tunnelInfo, 24 * 60 * 60 * 1000);
        await this.cacheTunnel(port, tunnelUrl, 'cloudflared');
        this.tunnelService.setCustomUrl(tunnelUrl);
        this.activeTunnels.set(port, tunnelInfo);
        await new Promise((resolve) => setTimeout(resolve, 400));
        return tunnelUrl;
      }
    } catch (error) {
      onProgress?.(`Backend tunnel unavailable: ${error instanceof Error ? error.message : 'Unknown error'}`);
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.warn('Backend tunnel not available, using origin:', error);
    }

    // Fallback: Use current origin with port
    onProgress?.('Using current origin as tunnel...');
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    const originUrl = this.getOriginUrl(port);
    const tunnelInfo: TunnelInfo = {
      url: originUrl,
      port,
      service: 'origin',
      createdAt: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000),
    };
    
    onProgress?.('Caching origin URL...');
    // Cache in both database cache and Firebase
    await this.databaseCache.set(cacheKey, tunnelInfo, 24 * 60 * 60 * 1000);
    await this.cacheTunnel(port, originUrl, 'origin');
    this.activeTunnels.set(port, tunnelInfo);
    await new Promise((resolve) => setTimeout(resolve, 300));
    return originUrl;
  }

  /**
   * Requests tunnel from backend API
   */
  private async requestTunnelFromBackend(port: number): Promise<string | null> {
    try {
      const response = await fetch('/api/tunnel/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ port }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.url;
      }
    } catch (error) {
      // Backend API not available
    }
    return null;
  }

  /**
   * Gets origin URL with port
   */
  private getOriginUrl(port: number): string {
    const url = new URL(window.location.origin);
    url.port = port.toString();
    return url.toString();
  }

  /**
   * Gets cached tunnel from database
   */
  private async getCachedTunnel(port: number): Promise<TunnelInfo | null> {
    try {
      const tunnelRef = ref(database, `tunnels/${port}`);
      const snapshot = await get(tunnelRef);
      
      if (snapshot.exists()) {
        return snapshot.val() as TunnelInfo;
      }
    } catch (error) {
      console.error('Failed to get cached tunnel:', error);
    }
    return null;
  }

  /**
   * Caches tunnel info in database
   */
  private async cacheTunnel(port: number, url: string, service: string): Promise<void> {
    try {
      const tunnelInfo: TunnelInfo = {
        url,
        port,
        service,
        createdAt: Date.now(),
        expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
      };

      const tunnelRef = ref(database, `tunnels/${port}`);
      await set(tunnelRef, tunnelInfo);
      
      this.activeTunnels.set(port, tunnelInfo);
    } catch (error) {
      console.error('Failed to cache tunnel:', error);
    }
  }

  /**
   * Checks if tunnel is expired
   */
  private isExpired(tunnel: TunnelInfo): boolean {
    if (!tunnel.expiresAt) return false;
    return Date.now() > tunnel.expiresAt;
  }

  /**
   * Gets active tunnel for port
   */
  getActiveTunnel(port: number): TunnelInfo | null {
    return this.activeTunnels.get(port) || null;
  }
}

