/// <reference types="vite/client" />

declare module 'xterm' {
  export class Terminal {
    constructor(options?: any);
    open(element: HTMLElement): void;
    write(data: string): void;
    writeln(data: string): void;
    clear(): void;
    dispose(): void;
    loadAddon(addon: any): void;
    onData(callback: (data: string) => void): void;
  }
}

declare module 'xterm-addon-fit' {
  export class FitAddon {
    fit(): void;
  }
}

declare module 'xterm-addon-web-links' {
  export class WebLinksAddon {
    constructor();
  }
}

// Extend Window interface for requestIdleCallback
interface Window {
  requestIdleCallback?: (
    callback: (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void,
    options?: { timeout?: number }
  ) => number;
}

