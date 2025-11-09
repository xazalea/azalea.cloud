import { NextRequest, NextResponse } from 'next/server';

/**
 * Command Execution API
 * 
 * WARNING: This is a dangerous endpoint that executes commands.
 * In production, this should be heavily restricted and authenticated.
 * 
 * For the Google proxy use case, this allows executing commands
 * on the server that hosts AzaleaCloud, which may help access
 * the Windows device if the server is on the same network.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { command, type } = body;

    if (!command || typeof command !== 'string') {
      return NextResponse.json(
        { error: 'Command is required' },
        { status: 400 }
      );
    }

    // Security: Whitelist allowed commands
    const allowedCommands = [
      'whoami',
      'hostname',
      'pwd',
      'ls',
      'dir',
      'echo',
      'ping',
      'curl',
      'wget',
    ];

    const commandBase = command.split(' ')[0].toLowerCase();
    
    // For security, only allow whitelisted commands in production
    if (process.env.NODE_ENV === 'production' && !allowedCommands.includes(commandBase)) {
      return NextResponse.json(
        { error: 'Command not allowed in production' },
        { status: 403 }
      );
    }

    // Execute command (Node.js environment)
    // Note: This executes on the AzaleaCloud server, not the Windows device
    const { exec } = require('child_process');
    
    return new Promise<NextResponse>((resolve) => {
      exec(command, { timeout: 10000 }, (error: any, stdout: string, stderr: string) => {
        if (error) {
          resolve(NextResponse.json({
            success: false,
            error: error.message,
            stderr: stderr,
          }));
        } else {
          resolve(NextResponse.json({
            success: true,
            output: stdout,
            stderr: stderr,
          }));
        }
      });
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for testing connectivity
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Command execution API is available',
    note: 'Use POST to execute commands. This executes on the AzaleaCloud server, not the Windows device.',
  });
}

