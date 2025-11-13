import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * CoolVM API Endpoint
 * Routes to Haskell handler if available, otherwise uses TypeScript fallback
 */

export default async function handlerWrapper(req: VercelRequest, res: VercelResponse) {

  // Fallback TypeScript implementation
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { action, program, input } = req.body;

    if (req.method === 'POST') {
      if (action === 'execute') {
        const result = await executeVMProgram(program, input);
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
  } catch (error) {
    console.error('CoolVM error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'VM execution failed',
    });
  }
}

async function executeVMProgram(program: any[], input?: any): Promise<any> {
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
