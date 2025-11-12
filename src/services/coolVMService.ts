/**
 * CoolVM Service
 * Modernized CoolVM - A clean, lazily evaluated, side-effect-free virtual machine
 * Based on https://github.com/MikeHaskel/CoolVM
 * Running on Vercel via vercel-hs (https://github.com/ghiliweld/vercel-hs)
 */

export interface VMInstruction {
  type: 'push' | 'pop' | 'add' | 'sub' | 'mul' | 'div' | 'load' | 'store' | 'jump' | 'jumpIf' | 'call' | 'ret' | 'halt';
  value?: any;
  name?: string;
  address?: number;
}

export interface VMState {
  stack: any[];
  memory: Record<string, any>;
  program: VMInstruction[];
  pc: number;
}

export interface VMResult {
  success: boolean;
  result?: VMState;
  error?: string;
  vmId?: string;
  status?: string;
}

export class CoolVMService {
  private static instance: CoolVMService;
  private activeVMs: Map<string, VMState> = new Map();

  private constructor() {}

  static getInstance(): CoolVMService {
    if (!CoolVMService.instance) {
      CoolVMService.instance = new CoolVMService();
    }
    return CoolVMService.instance;
  }

  /**
   * Create a new VM instance
   */
  async createVM(): Promise<VMResult> {
    try {
      const response = await fetch('/api/coolvm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
        }),
      });

      if (!response.ok) {
        throw new Error(`VM creation failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Execute a program on the VM
   */
  async executeProgram(program: VMInstruction[], vmId?: string): Promise<VMResult> {
    try {
      const response = await fetch('/api/coolvm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'execute',
          program,
          vmId,
        }),
      });

      if (!response.ok) {
        throw new Error(`VM execution failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success && data.result && vmId) {
        this.activeVMs.set(vmId, data.result);
      }
      
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get VM status
   */
  async getVMStatus(): Promise<VMResult> {
    try {
      const response = await fetch('/api/coolvm');
      if (!response.ok) {
        throw new Error(`Status check failed: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get active VM state
   */
  getVMState(vmId: string): VMState | undefined {
    return this.activeVMs.get(vmId);
  }

  /**
   * List all active VMs
   */
  getActiveVMs(): string[] {
    return Array.from(this.activeVMs.keys());
  }
}

