/**
 * VNC Client Library
 * Handles VNC protocol communication
 */

export interface VNCConfig {
  host: string;
  port: number;
  password?: string;
  path?: string;
}

export class VNCClient {
  private ws: WebSocket | null = null;
  private config: VNCConfig;
  private onFrame?: (frame: ImageData) => void;
  private onStatus?: (status: string) => void;
  private onError?: (error: string) => void;

  constructor(config: VNCConfig) {
    this.config = config;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const wsUrl = `ws://${this.config.host}:${this.config.port}${this.config.path || ''}`;
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          this.onStatus?.('Connected');
          resolve();
        };

        this.ws.onmessage = (event) => {
          this.handleMessage(event);
        };

        this.ws.onerror = (error) => {
          this.onError?.('Connection error');
          reject(error);
        };

        this.ws.onclose = () => {
          this.onStatus?.('Disconnected');
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private handleMessage(event: MessageEvent) {
    if (event.data instanceof Blob) {
      // Handle binary VNC data
      event.data.arrayBuffer().then((buffer) => {
        // Decode VNC protocol messages
        // This is simplified - full VNC protocol implementation would go here
      });
    } else if (typeof event.data === 'string') {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'frame') {
          // Handle frame data
        }
      } catch (e) {
        // Not JSON, handle as text
      }
    }
  }

  sendMouse(x: number, y: number, button: number, down: boolean) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      // Send mouse event to VNC server
      // In production, this would use proper VNC protocol
      this.ws.send(JSON.stringify({ type: 'mouse', x, y, button, down }));
    }
  }

  sendKey(key: string, code: string, keyCode: number, down: boolean) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      // Send keyboard event to VNC server
      // In production, this would use proper VNC protocol
      this.ws.send(JSON.stringify({ type: 'key', key, code, keyCode, down }));
    }
  }

  sendWheel(x: number, y: number, deltaX: number, deltaY: number) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'wheel', x, y, deltaX, deltaY }));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  setOnFrame(callback: (frame: ImageData) => void) {
    this.onFrame = callback;
  }

  setOnStatus(callback: (status: string) => void) {
    this.onStatus = callback;
  }

  setOnError(callback: (error: string) => void) {
    this.onError = callback;
  }
}

