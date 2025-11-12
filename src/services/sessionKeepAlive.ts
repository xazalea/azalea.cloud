/**
 * Browser-Based Session Keep-Alive Service
 * Provides multiple methods to keep Cloud Shell sessions alive from the frontend
 * Works in conjunction with server-side keep-alive scripts
 */

export class SessionKeepAlive {
  private static instance: SessionKeepAlive;
  private keepAliveInterval: NodeJS.Timeout | null = null;
  private isActive: boolean = false;
  private methods: Array<() => Promise<void>> = [];
  private interval: number = 180000; // 3 minutes default

  private constructor() {
    this.setupMethods();
  }

  static getInstance(): SessionKeepAlive {
    if (!SessionKeepAlive.instance) {
      SessionKeepAlive.instance = new SessionKeepAlive();
    }
    return SessionKeepAlive.instance;
  }

  /**
   * Setup all keep-alive methods
   */
  private setupMethods(): void {
    // Method 1: Terminal Activity Simulation
    this.methods.push(async () => {
      try {
        // Simulate terminal activity by sending a lightweight command
        // This is done via the Cloud Shell API proxy
        await fetch('/api/proxy/cloudshell?path=/api/status', {
          method: 'GET',
          cache: 'no-cache',
        }).catch(() => {
          // Ignore errors - this is just for activity
        });
      } catch {
        // Ignore errors
      }
    });

    // Method 2: File System Activity (via API if available)
    this.methods.push(async () => {
      try {
        // Touch a file via API
        await fetch('/api/proxy/cloudshell?path=/api/filesystem/touch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: '.azalea/.browser_activity' }),
        }).catch(() => {
          // Ignore errors
        });
      } catch {
        // Ignore errors
      }
    });

    // Method 3: WebSocket Keep-Alive (if WebSocket is available)
    this.methods.push(async () => {
      try {
        // Send a ping via WebSocket if available
        const ws = (window as any).__cloudShellWebSocket;
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'ping', timestamp: Date.now() }));
        }
      } catch {
        // Ignore errors
      }
    });

    // Method 4: DOM Activity (simulate user interaction)
    this.methods.push(async () => {
      try {
        // Trigger a lightweight DOM event that Cloud Shell might detect
        const event = new Event('visibilitychange', { bubbles: true });
        document.dispatchEvent(event);
        
        // Also update a data attribute
        document.body.setAttribute('data-last-activity', Date.now().toString());
      } catch {
        // Ignore errors
      }
    });

    // Method 5: LocalStorage Activity
    this.methods.push(async () => {
      try {
        localStorage.setItem('azalea_keepalive', Date.now().toString());
        // Clean up old entries
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith('azalea_keepalive_old_')) {
            localStorage.removeItem(key);
          }
        });
      } catch {
        // Ignore errors
      }
    });

    // Method 6: Fetch Activity (lightweight API calls)
    this.methods.push(async () => {
      try {
        // Make a lightweight request to maintain network activity
        await fetch('/api/backend/health', {
          method: 'GET',
          cache: 'no-cache',
          signal: AbortSignal.timeout(2000),
        }).catch(() => {
          // Ignore errors
        });
      } catch {
        // Ignore errors
      }
    });
  }

  /**
   * Start keep-alive service
   */
  start(interval?: number): void {
    if (this.isActive) {
      console.log('[Session Keep-Alive] Already running');
      return;
    }

    if (interval) {
      this.interval = interval;
    }

    this.isActive = true;
    console.log(`[Session Keep-Alive] Starting with ${this.interval / 1000}s interval`);

    // Execute immediately
    this.executeMethods();

    // Then execute on interval
    this.keepAliveInterval = setInterval(() => {
      this.executeMethods();
    }, this.interval);
  }

  /**
   * Stop keep-alive service
   */
  stop(): void {
    if (!this.isActive) {
      return;
    }

    this.isActive = false;
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }

    console.log('[Session Keep-Alive] Stopped');
  }

  /**
   * Execute all keep-alive methods
   */
  private async executeMethods(): Promise<void> {
    if (!this.isActive) {
      return;
    }

    const timestamp = new Date().toISOString();
    console.log(`[Session Keep-Alive] Executing all methods at ${timestamp}`);

    // Execute all methods in parallel
    const promises = this.methods.map(async (method, index) => {
      try {
        await method();
        return { method: index, success: true };
      } catch (error) {
        return { method: index, success: false, error };
      }
    });

    const results = await Promise.allSettled(promises);
    const successCount = results.filter(r => r.status === 'fulfilled').length;
    
    if (successCount > 0) {
      console.log(`[Session Keep-Alive] Completed ${successCount}/${this.methods.length} methods`);
    }
  }

  /**
   * Get current status
   */
  getStatus(): { active: boolean; interval: number; methods: number } {
    return {
      active: this.isActive,
      interval: this.interval,
      methods: this.methods.length,
    };
  }

  /**
   * Inject keep-alive script into Cloud Shell iframe
   */
  async injectIntoCloudShell(iframe: HTMLIFrameElement): Promise<void> {
    try {
      const iframeWindow = iframe.contentWindow;
      if (!iframeWindow) {
        console.warn('[Session Keep-Alive] Cannot access iframe window');
        return;
      }

      // Wait for Cloud Shell to load
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Inject keep-alive script
      const script = `
        (function() {
          console.log('[Session Keep-Alive] Injected into Cloud Shell');
          
          // Create keep-alive function
          function keepAlive() {
            // Method 1: Touch file
            try {
              const xhr = new XMLHttpRequest();
              xhr.open('POST', '/api/proxy/cloudshell?path=/api/filesystem/touch', true);
              xhr.setRequestHeader('Content-Type', 'application/json');
              xhr.send(JSON.stringify({ path: '.azalea/.browser_activity' }));
            } catch (e) {}
            
            // Method 2: Terminal activity
            try {
              fetch('/api/proxy/cloudshell?path=/api/status', { method: 'GET', cache: 'no-cache' });
            } catch (e) {}
            
            // Method 3: DOM activity
            try {
              document.dispatchEvent(new Event('visibilitychange', { bubbles: true }));
            } catch (e) {}
          }
          
          // Start keep-alive
          setInterval(keepAlive, 180000); // 3 minutes
          keepAlive(); // Execute immediately
          
          console.log('[Session Keep-Alive] Started in Cloud Shell');
        })();
      `;

      try {
        iframeWindow.eval(script);
        console.log('[Session Keep-Alive] Successfully injected into Cloud Shell');
      } catch (evalError) {
        console.warn('[Session Keep-Alive] Cannot eval in iframe (CSP restriction), using alternative method');
        // Alternative: Use postMessage
        iframeWindow.postMessage({ type: 'azalea-keepalive', action: 'start' }, '*');
      }
    } catch (error) {
      console.warn('[Session Keep-Alive] Failed to inject into Cloud Shell:', error);
    }
  }
}

