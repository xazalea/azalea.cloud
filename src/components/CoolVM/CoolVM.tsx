import React, { useState, useEffect } from 'react';
import { useTheme } from '../../theme/theme';
import { CoolVMService, VMInstruction } from '../../services/coolVMService';

export const CoolVM: React.FC = () => {
  const { theme } = useTheme();
  const [vmId, setVmId] = useState<string | null>(null);
  const [program, setProgram] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [status, setStatus] = useState<string>('Ready');
  const [loading, setLoading] = useState(false);
  const [vmStatus, setVmStatus] = useState<any>(null);

  const vmService = CoolVMService.getInstance();

  useEffect(() => {
    // Initialize VM
    initializeVM();
    // Check VM status
    checkStatus();
  }, []);

  const initializeVM = async () => {
    setLoading(true);
    setStatus('Creating VM instance...');
    const result = await vmService.createVM();
    if (result.success && result.vmId) {
      setVmId(result.vmId);
      setStatus('VM Ready');
    } else {
      setStatus(`Error: ${result.error || 'Failed to create VM'}`);
    }
    setLoading(false);
  };

  const checkStatus = async () => {
    const status = await vmService.getVMStatus();
    if (status.success) {
      setVmStatus(status);
    }
  };

  const parseProgram = (code: string): VMInstruction[] => {
    // Simple parser for VM instructions
    // Format: instruction [value]
    const lines = code.split('\n').filter(line => line.trim());
    return lines.map(line => {
      const parts = line.trim().split(/\s+/);
      const instruction = parts[0].toLowerCase();
      
      switch (instruction) {
        case 'push':
          return { type: 'push', value: parseFloat(parts[1]) || parts[1] };
        case 'pop':
          return { type: 'pop' };
        case 'add':
          return { type: 'add' };
        case 'sub':
          return { type: 'sub' };
        case 'mul':
          return { type: 'mul' };
        case 'div':
          return { type: 'div' };
        case 'load':
          return { type: 'load', name: parts[1] };
        case 'store':
          return { type: 'store', name: parts[1] };
        case 'jump':
          return { type: 'jump', address: parseInt(parts[1]) || 0 };
        case 'jumpif':
          return { type: 'jumpIf', address: parseInt(parts[1]) || 0 };
        case 'halt':
          return { type: 'halt' };
        default:
          return { type: 'halt' };
      }
    });
  };

  const executeProgram = async () => {
    if (!vmId) {
      setOutput('Error: VM not initialized');
      return;
    }

    setLoading(true);
    setStatus('Executing program...');
    
    try {
      const instructions = parseProgram(program);
      const result = await vmService.executeProgram(instructions, vmId);
      
      if (result.success && result.result) {
        setOutput(JSON.stringify(result.result, null, 2));
        setStatus('Program executed successfully');
      } else {
        setOutput(`Error: ${result.error || 'Execution failed'}`);
        setStatus('Execution failed');
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setStatus('Execution failed');
    }
    
    setLoading(false);
  };

  const exampleProgram = `push 10
push 20
add
push 5
mul
store result
load result
halt`;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: theme.surface,
        padding: '24px',
        gap: '24px',
      }}
    >
      {/* Header */}
      <div>
        <h1 style={{ color: theme.text, fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>
          CoolVM
        </h1>
        <p style={{ color: theme.textSecondary, fontSize: '14px' }}>
          A clean, lazily evaluated, side-effect-free virtual machine
        </p>
        <div style={{ marginTop: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span
            style={{
              padding: '6px 12px',
              backgroundColor: vmId ? theme.success + '20' : theme.error + '20',
              color: vmId ? theme.success : theme.error,
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            {status}
          </span>
          {vmStatus && (
            <span style={{ color: theme.textSecondary, fontSize: '12px' }}>
              Version {vmStatus.version || '2.0.0'}
            </span>
          )}
        </div>
      </div>

      {/* Features */}
      {vmStatus && vmStatus.features && (
        <div
          style={{
            padding: '16px',
            backgroundColor: theme.background,
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
          }}
        >
          <div style={{ color: theme.text, fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
            Features:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {vmStatus.features.map((feature: string, idx: number) => (
              <span
                key={idx}
                style={{
                  padding: '4px 8px',
                  backgroundColor: theme.surfaceVariant,
                  borderRadius: '6px',
                  fontSize: '12px',
                  color: theme.text,
                }}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Code Editor and Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', flex: 1 }}>
        {/* Code Editor */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <label style={{ color: theme.text, fontWeight: 600, fontSize: '14px' }}>
              Program
            </label>
            <button
              onClick={() => setProgram(exampleProgram)}
              style={{
                padding: '6px 12px',
                backgroundColor: theme.surfaceVariant,
                border: `1px solid ${theme.border}`,
                borderRadius: '6px',
                color: theme.text,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Load Example
            </button>
          </div>
          <textarea
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            placeholder="Enter VM instructions...&#10;Example:&#10;push 10&#10;push 20&#10;add&#10;halt"
            style={{
              flex: 1,
              padding: '16px',
              backgroundColor: theme.background,
              border: `1px solid ${theme.border}`,
              borderRadius: '12px',
              color: theme.text,
              fontFamily: 'monospace',
              fontSize: '14px',
              resize: 'none',
            }}
          />
          <button
            onClick={executeProgram}
            disabled={loading || !vmId || !program.trim()}
            style={{
              marginTop: '12px',
              padding: '12px 24px',
              backgroundColor: loading || !vmId ? theme.border : theme.accent,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading || !vmId ? 'not-allowed' : 'pointer',
              opacity: loading || !vmId ? 0.6 : 1,
            }}
          >
            {loading ? 'Executing...' : 'Execute Program'}
          </button>
        </div>

        {/* Output */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ color: theme.text, fontWeight: 600, fontSize: '14px', marginBottom: '12px' }}>
            Output
          </label>
          <pre
            style={{
              flex: 1,
              padding: '16px',
              backgroundColor: theme.background,
              border: `1px solid ${theme.border}`,
              borderRadius: '12px',
              color: theme.text,
              fontFamily: 'monospace',
              fontSize: '14px',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
            }}
          >
            {output || 'No output yet. Execute a program to see results.'}
          </pre>
        </div>
      </div>

      {/* Instructions Help */}
      <div
        style={{
          padding: '16px',
          backgroundColor: theme.background,
          borderRadius: '12px',
          border: `1px solid ${theme.border}`,
        }}
      >
        <div style={{ color: theme.text, fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
          Available Instructions:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '12px', color: theme.textSecondary }}>
          <div><code>push &lt;value&gt;</code> - Push value onto stack</div>
          <div><code>pop</code> - Pop value from stack</div>
          <div><code>add</code> - Add top two stack values</div>
          <div><code>sub</code> - Subtract top two stack values</div>
          <div><code>mul</code> - Multiply top two stack values</div>
          <div><code>div</code> - Divide top two stack values</div>
          <div><code>load &lt;name&gt;</code> - Load variable from memory</div>
          <div><code>store &lt;name&gt;</code> - Store value to memory</div>
          <div><code>jump &lt;addr&gt;</code> - Jump to address</div>
          <div><code>jumpif &lt;addr&gt;</code> - Conditional jump</div>
          <div><code>halt</code> - Stop execution</div>
        </div>
      </div>
    </div>
  );
};

