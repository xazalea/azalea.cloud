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
        padding: '32px',
        backgroundColor: theme.surface,
        borderRadius: '16px',
        maxWidth: '800px',
        margin: '24px auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        minHeight: 'calc(100vh - 200px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <span className="material-icons" style={{ fontSize: '32px', color: theme.accent }}>
          dns
        </span>
        <h2 style={{ color: theme.text, fontSize: '28px', fontWeight: 700, margin: 0 }}>
          VM Provisioner
        </h2>
      </div>
      
      <div style={{ 
        padding: '16px', 
        backgroundColor: theme.background, 
        borderRadius: '12px', 
        marginBottom: '24px',
        border: `1px solid ${theme.border}`,
      }}>
        <div style={{ color: theme.textSecondary, fontSize: '14px', lineHeight: '1.6' }}>
          <strong style={{ color: theme.text }}>Quick Start:</strong> Select a Linux distribution, configure resources, and provision a new VM. 
          Your VM will be ready in minutes with full VNC console access.
        </div>
      </div>

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
            padding: '20px',
            backgroundColor: theme.success + '15',
            border: `2px solid ${theme.success}`,
            borderRadius: '12px',
            marginBottom: '24px',
            boxShadow: `0 4px 12px ${theme.success}30`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span className="material-icons" style={{ fontSize: '24px', color: theme.success }}>
              check_circle
            </span>
            <div style={{ color: theme.success, fontWeight: 700, fontSize: '18px' }}>
              VM Ready!
            </div>
          </div>
          <div style={{ 
            color: theme.text, 
            fontSize: '14px', 
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: theme.background,
            borderRadius: '8px',
            fontFamily: 'monospace',
          }}>
            <strong>VM ID:</strong> {provisionedVM.vmId}
          </div>
          <a
            href={provisionedVM.vncUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#FFFFFF',
              backgroundColor: theme.accent,
              textDecoration: 'none',
              padding: '12px 20px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${theme.accent}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span className="material-icons" style={{ fontSize: '20px' }}>
              open_in_new
            </span>
            Open VNC Console
          </a>
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: theme.text,
            marginBottom: '12px',
            fontWeight: 600,
            fontSize: '16px',
          }}
        >
          <span className="material-icons" style={{ fontSize: '20px', color: theme.accent }}>
            storage
          </span>
          Linux Distribution
        </label>
        <select
          value={selectedDistribution}
          onChange={(e) => setSelectedDistribution(e.target.value)}
          disabled={provisioning}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: theme.background,
            border: `2px solid ${theme.border}`,
            borderRadius: '10px',
            color: theme.text,
            fontSize: '15px',
            cursor: provisioning ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
          }}
          onFocus={(e) => {
            if (!provisioning) {
              e.currentTarget.style.borderColor = theme.accent;
              e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.accent}20`;
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = theme.border;
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {distributions.map((dist) => (
            <option key={dist.id} value={dist.id}>
              {dist.name} {dist.version} ({dist.size} MB)
            </option>
          ))}
        </select>
        {selectedDist && (
          <div style={{ 
            marginTop: '12px', 
            padding: '12px',
            backgroundColor: theme.surfaceVariant,
            borderRadius: '8px',
            color: theme.textSecondary, 
            fontSize: '13px',
            lineHeight: '1.5',
          }}>
            <strong style={{ color: theme.text }}>{selectedDist.name}:</strong> {selectedDist.description}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: theme.text,
            marginBottom: '16px',
            fontWeight: 600,
            fontSize: '16px',
          }}
        >
          <span className="material-icons" style={{ fontSize: '20px', color: theme.accent }}>
            settings
          </span>
          Resource Configuration
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          <div style={{
            padding: '16px',
            backgroundColor: theme.surfaceVariant,
            borderRadius: '12px',
            border: `2px solid ${theme.border}`,
          }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: theme.text,
                marginBottom: '10px',
                fontWeight: 500,
                fontSize: '14px',
              }}
            >
              <span className="material-icons" style={{ fontSize: '18px' }}>
                memory
              </span>
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
                border: `2px solid ${theme.border}`,
                borderRadius: '8px',
                color: theme.text,
                fontSize: '15px',
                fontWeight: 600,
              }}
            />
            <div style={{ marginTop: '6px', color: theme.textSecondary, fontSize: '11px' }}>
              Recommended: 1024-2048 MB
            </div>
          </div>

          <div style={{
            padding: '16px',
            backgroundColor: theme.surfaceVariant,
            borderRadius: '12px',
            border: `2px solid ${theme.border}`,
          }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: theme.text,
                marginBottom: '10px',
                fontWeight: 500,
                fontSize: '14px',
              }}
            >
              <span className="material-icons" style={{ fontSize: '18px' }}>
                hard_drive
              </span>
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
                border: `2px solid ${theme.border}`,
                borderRadius: '8px',
                color: theme.text,
                fontSize: '15px',
                fontWeight: 600,
              }}
            />
            <div style={{ marginTop: '6px', color: theme.textSecondary, fontSize: '11px' }}>
              Recommended: 10-20 GB
            </div>
          </div>

          <div style={{
            padding: '16px',
            backgroundColor: theme.surfaceVariant,
            borderRadius: '12px',
            border: `2px solid ${theme.border}`,
          }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: theme.text,
                marginBottom: '10px',
                fontWeight: 500,
                fontSize: '14px',
              }}
            >
              <span className="material-icons" style={{ fontSize: '18px' }}>
                speed
              </span>
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
                border: `2px solid ${theme.border}`,
                borderRadius: '8px',
                color: theme.text,
                fontSize: '15px',
                fontWeight: 600,
              }}
            />
            <div style={{ marginTop: '6px', color: theme.textSecondary, fontSize: '11px' }}>
              Recommended: 2-4 cores
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleProvision}
        disabled={provisioning || !selectedDistribution}
        style={{
          width: '100%',
          padding: '16px',
          backgroundColor: provisioning ? theme.border : theme.accent,
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '12px',
          fontSize: '17px',
          fontWeight: 700,
          cursor: provisioning ? 'not-allowed' : 'pointer',
          opacity: provisioning ? 0.6 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          transition: 'all 0.2s ease',
          boxShadow: provisioning ? 'none' : `0 4px 12px ${theme.accent}40`,
        }}
        onMouseEnter={(e) => {
          if (!provisioning && selectedDistribution) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 6px 16px ${theme.accent}50`;
          }
        }}
        onMouseLeave={(e) => {
          if (!provisioning) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = provisioning ? 'none' : `0 4px 12px ${theme.accent}40`;
          }
        }}
      >
        {provisioning ? (
          <>
            <span className="material-icons" style={{ fontSize: '20px', animation: 'spin 1s linear infinite' }}>
              refresh
            </span>
            Provisioning VM...
          </>
        ) : (
          <>
            <span className="material-icons" style={{ fontSize: '20px' }}>
              play_arrow
            </span>
            Provision VM
          </>
        )}
      </button>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{ marginTop: '16px', padding: '12px', backgroundColor: theme.background, borderRadius: '8px' }}>
        <div style={{ color: theme.textSecondary, fontSize: '12px', lineHeight: '1.6' }}>
          <strong>Privacy Note:</strong> VM provisioning uses privacy-focused methods to download Linux distributions
          while maintaining anonymity and data privacy. Your VM data is isolated and secure.
        </div>
      </div>
    </div>
  );
};

