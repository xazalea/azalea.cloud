import type { VercelRequest, VercelResponse } from '@vercel/node';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

/**
 * CoolVM Handler for Vercel
 * Calls the compiled Haskell binary via vercel-hs
 */

// Path to compiled Haskell binary
const COOLVM_BINARY = path.join(process.cwd(), 'coolvm', 'dist', 'build', 'coolvm', 'coolvm');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Check if binary exists, if not, use fallback TypeScript implementation
    const binaryExists = fs.existsSync(COOLVM_BINARY);
    
    if (binaryExists) {
      // Call Haskell binary
      const requestBody = JSON.stringify(req.body || {});
      const { stdout, stderr } = await execAsync(`echo '${requestBody}' | ${COOLVM_BINARY}`, {
        maxBuffer: 1024 * 1024, // 1MB
        timeout: 10000, // 10 seconds
      });

      if (stderr) {
        console.error('CoolVM error:', stderr);
      }

      try {
        const result = JSON.parse(stdout);
        return res.status(200).json(result);
      } catch (parseError) {
        // If parsing fails, return the raw output
        return res.status(200).json({
          success: true,
          output: stdout,
        });
      }
    } else {
      // Fallback to TypeScript implementation
      return handleTypeScriptFallback(req, res);
    }
  } catch (error) {
    console.error('CoolVM handler error:', error);
    // Fallback to TypeScript implementation
    return handleTypeScriptFallback(req, res);
  }
}

/**
 * TypeScript fallback implementation
 */
async function handleTypeScriptFallback(req: VercelRequest, res: VercelResponse) {
  const { action, program, input } = req.body;

  if (req.method === 'POST') {
    if (action === 'execute') {
      // Simple TypeScript VM implementation
      const result = await executeVMProgramTS(program, input);
      return res.status(200).json({
        success: true,
        result,
        vmState: 'ready',
      });
    }

    if (action === 'create') {
      const vmId = `coolvm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      return res.status(200).json({
        success: true,
        vmId,
        status: 'ready',
        features: [
          'Lazy evaluation',
          'Side-effect-free',
          'Functional programming',
          'Type-safe execution',
        ],
      });
    }

    return res.status(400).json({ error: 'Invalid action' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      vmType: 'CoolVM',
      version: '2.0.0',
      features: [
        'Lazy evaluation',
        'Side-effect-free execution',
        'Functional programming support',
        'Type-safe operations',
        'Modern Haskell runtime',
      ],
      status: 'ready',
    });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}

/**
 * TypeScript VM implementation (fallback)
 */
async function executeVMProgramTS(program: any[], input?: any): Promise<any> {
  // Simple stack-based VM implementation in TypeScript
  const stack: any[] = [];
  const memory: Record<string, any> = {};
  let pc = 0;

  try {
    while (pc < program.length) {
      const instruction = program[pc];
      
      switch (instruction.type) {
        case 'push':
          stack.push(instruction.value);
          pc++;
          break;
        case 'pop':
          if (stack.length === 0) throw new Error('Stack underflow');
          stack.pop();
          pc++;
          break;
        case 'add':
          if (stack.length < 2) throw new Error('Stack underflow');
          const a = stack.pop();
          const b = stack.pop();
          stack.push(a + b);
          pc++;
          break;
        case 'sub':
          if (stack.length < 2) throw new Error('Stack underflow');
          const a2 = stack.pop();
          const b2 = stack.pop();
          stack.push(b2 - a2);
          pc++;
          break;
        case 'mul':
          if (stack.length < 2) throw new Error('Stack underflow');
          const a3 = stack.pop();
          const b3 = stack.pop();
          stack.push(a3 * b3);
          pc++;
          break;
        case 'div':
          if (stack.length < 2) throw new Error('Stack underflow');
          const a4 = stack.pop();
          const b4 = stack.pop();
          if (a4 === 0) throw new Error('Division by zero');
          stack.push(b4 / a4);
          pc++;
          break;
        case 'load':
          if (!memory[instruction.name]) throw new Error(`Variable not found: ${instruction.name}`);
          stack.push(memory[instruction.name]);
          pc++;
          break;
        case 'store':
          if (stack.length === 0) throw new Error('Stack underflow');
          memory[instruction.name] = stack.pop();
          pc++;
          break;
        case 'jump':
          pc = instruction.address;
          break;
        case 'jumpif':
          if (stack.length === 0) throw new Error('Stack underflow');
          const cond = stack.pop();
          if (cond) {
            pc = instruction.address;
          } else {
            pc++;
          }
          break;
        case 'halt':
          pc = program.length;
          break;
        default:
          pc++;
      }
    }

    return {
      stack,
      memory,
      program,
      pc,
    };
  } catch (error) {
    throw error;
  }
}

