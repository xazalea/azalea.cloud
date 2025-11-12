import React, { useState, useEffect } from 'react';
import { useTheme } from '../../theme/theme';
import { VMProvisioningService, LinuxDistribution, VMProvisionRequest } from '../../services/vmProvisioningService';

interface VMProvisionerProps {
  onVMReady?: (vmId: string, vncUrl: string) => void;
}

export const VMProvisioner: React.FC<VMProvisionerProps> = ({ onVMReady }) => {
  const { theme } = useTheme();
  const [distributions, setDistributions] = useState<LinuxDistribution[]>([]);
  const [selectedDistribution, setSelectedDistribution] = useState<string>('');
  const [memory, setMemory] = useState<number>(1024);
  const [diskSize, setDiskSize] = useState<number>(10);
  const [cpuCores, setCpuCores] = useState<number>(2);
  const [provisioning, setProvisioning] = useState(false);
  const [provisionStatus, setProvisionStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [provisionedVM, setProvisionedVM] = useState<{ vmId: string; vncUrl: string } | null>(null);

  const vmService = VMProvisioningService.getInstance();

  useEffect(() => {
    // Load available distributions
    const dists = vmService.getDistributions();
    setDistributions(dists);
    if (dists.length > 0) {
      setSelectedDistribution(dists[0].id);
    }
  }, []);

  const handleProvision = async () => {
    if (!selectedDistribution) {
      setError('Please select a Linux distribution');
      return;
    }

    setProvisioning(true);
    setError(null);
    setProvisionStatus('Initializing VM provisioning...');

    try {
      const request: VMProvisionRequest = {
        distribution: selectedDistribution,
        memory,
        diskSize,
        cpuCores,
      };

      setProvisionStatus('Downloading Linux distribution...');
      const result = await vmService.provisionVM(request);

      if (result.success && result.vmId) {
        setProvisionStatus('Provisioning VM...');
        
        // Poll for VM status
        const checkStatus = async () => {
          const status = await vmService.getVMStatus(result.vmId!);
          if (status) {
            setProvisionStatus(status.status === 'ready' ? 'VM is ready!' : `Status: ${status.status}`);
            
            if (status.status === 'ready' && status.vncUrl) {
              setProvisionedVM({
                vmId: result.vmId!,
                vncUrl: status.vncUrl,
              });
              setProvisioning(false);
              onVMReady?.(result.vmId!, status.vncUrl);
              return;
            }
            
            if (status.status === 'error') {
              setError(status.error || 'VM provisioning failed');
              setProvisioning(false);
              return;
            }
          }
          
          // Continue polling if still provisioning
          if (provisioning) {
            setTimeout(checkStatus, 3000);
          }
        };
        
        setTimeout(checkStatus, 2000);
      } else {
        setError(result.error || 'Failed to provision VM');
        setProvisioning(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setProvisioning(false);
    }
  };

  const selectedDist = distributions.find(d => d.id === selectedDistribution);

  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: theme.surface,
        borderRadius: '12px',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <h2 style={{ color: theme.text, marginBottom: '24px', fontSize: '24px', fontWeight: 600 }}>
        Provision New VM
      </h2>

      {error && (
        <div
          style={{
            padding: '12px',
            backgroundColor: theme.error + '20',
            border: `1px solid ${theme.error}`,
            borderRadius: '8px',
            marginBottom: '16px',
            color: theme.error,
          }}
        >
          {error}
        </div>
      )}

      {provisionStatus && (
        <div
          style={{
            padding: '12px',
            backgroundColor: theme.accent + '20',
            border: `1px solid ${theme.accent}`,
            borderRadius: '8px',
            marginBottom: '16px',
            color: theme.text,
          }}
        >
          {provisionStatus}
        </div>
      )}

      {provisionedVM && (
        <div
          style={{
            padding: '16px',
            backgroundColor: theme.success + '20',
            border: `1px solid ${theme.success}`,
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        >
          <div style={{ color: theme.success, fontWeight: 600, marginBottom: '8px' }}>
            ✓ VM Ready!
          </div>
          <div style={{ color: theme.text, fontSize: '14px' }}>
            VM ID: {provisionedVM.vmId}
          </div>
          <a
            href={provisionedVM.vncUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: theme.accent,
              textDecoration: 'none',
              marginTop: '8px',
              display: 'inline-block',
            }}
          >
            Open VNC Console →
          </a>
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <label
          style={{
            display: 'block',
            color: theme.text,
            marginBottom: '8px',
            fontWeight: 500,
          }}
        >
          Linux Distribution
        </label>
        <select
          value={selectedDistribution}
          onChange={(e) => setSelectedDistribution(e.target.value)}
          disabled={provisioning}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: theme.background,
            border: `1px solid ${theme.border}`,
            borderRadius: '8px',
            color: theme.text,
            fontSize: '14px',
          }}
        >
          {distributions.map((dist) => (
            <option key={dist.id} value={dist.id}>
              {dist.name} {dist.version} ({dist.size} MB)
            </option>
          ))}
        </select>
        {selectedDist && (
          <div style={{ marginTop: '8px', color: theme.textSecondary, fontSize: '12px' }}>
            {selectedDist.description}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <div>
          <label
            style={{
              display: 'block',
              color: theme.text,
              marginBottom: '8px',
              fontWeight: 500,
              fontSize: '14px',
            }}
          >
            Memory (MB)
          </label>
          <input
            type="number"
            value={memory}
            onChange={(e) => setMemory(parseInt(e.target.value) || 1024)}
            disabled={provisioning}
            min={512}
            max={4096}
            step={256}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: theme.background,
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              color: theme.text,
              fontSize: '14px',
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              color: theme.text,
              marginBottom: '8px',
              fontWeight: 500,
              fontSize: '14px',
            }}
          >
            Disk Size (GB)
          </label>
          <input
            type="number"
            value={diskSize}
            onChange={(e) => setDiskSize(parseInt(e.target.value) || 10)}
            disabled={provisioning}
            min={5}
            max={100}
            step={5}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: theme.background,
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              color: theme.text,
              fontSize: '14px',
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              color: theme.text,
              marginBottom: '8px',
              fontWeight: 500,
              fontSize: '14px',
            }}
          >
            CPU Cores
          </label>
          <input
            type="number"
            value={cpuCores}
            onChange={(e) => setCpuCores(parseInt(e.target.value) || 2)}
            disabled={provisioning}
            min={1}
            max={8}
            step={1}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: theme.background,
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              color: theme.text,
              fontSize: '14px',
            }}
          />
        </div>
      </div>

      <button
        onClick={handleProvision}
        disabled={provisioning || !selectedDistribution}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: provisioning ? theme.border : theme.accent,
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 600,
          cursor: provisioning ? 'not-allowed' : 'pointer',
          opacity: provisioning ? 0.6 : 1,
        }}
      >
        {provisioning ? 'Provisioning VM...' : 'Provision VM'}
      </button>

      <div style={{ marginTop: '16px', padding: '12px', backgroundColor: theme.background, borderRadius: '8px' }}>
        <div style={{ color: theme.textSecondary, fontSize: '12px', lineHeight: '1.6' }}>
          <strong>Privacy Note:</strong> VM provisioning uses privacy-focused methods to download Linux distributions
          while maintaining anonymity and data privacy. Your VM data is isolated and secure.
        </div>
      </div>
    </div>
  );
};

