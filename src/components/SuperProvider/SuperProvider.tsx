import React, { useState, useEffect } from 'react';
import { useTheme } from '../../theme/theme';
import { Terminal } from '../Terminal/Terminal';

/**
 * AzaleaSuper - Dual-instance combined power
 * Runs 2 instances of AzaleaCloud and combines GPU and resources
 */
export const SuperProvider: React.FC = () => {
  const { theme } = useTheme();
  const [instancesReady, setInstancesReady] = useState([false, false]);
  const [combinedResources, setCombinedResources] = useState({
    totalCpu: 0,
    totalRam: 0,
    gpuEnabled: false,
  });

  useEffect(() => {
    // Simulate initialization delay
    setTimeout(() => {
      setInstancesReady([true, false]);
    }, 300);

    setTimeout(() => {
      setInstancesReady([true, true]);
      setCombinedResources({
        totalCpu: 8, // 2x4 cores
        totalRam: 32, // 2x16 GB
        gpuEnabled: true,
      });
    }, 600);
  }, []);

  const allReady = instancesReady[0] && instancesReady[1];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.surface,
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {/* Super Mode Header */}
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: theme.surfaceVariant,
          borderBottom: `1px solid ${theme.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <span className="material-icons" style={{ fontSize: '20px', color: theme.accent }}>
            bolt
          </span>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: theme.text }}>
              AzaleaSuper Mode
            </div>
            <div style={{ fontSize: '11px', color: theme.textSecondary }}>
              Dual-instance combined: 8 vCPU • 32 GB RAM • Dual GPU
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: '12px',
            color: allReady ? theme.success : theme.textSecondary,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: allReady ? theme.success : theme.textSecondary,
            }}
          />
          {allReady ? 'Both Instances Ready' : 'Initializing...'}
        </div>
      </div>

      {/* Resource Status */}
      {allReady && (
        <div
          style={{
            padding: '8px 16px',
            backgroundColor: theme.accent + '15',
            borderBottom: `1px solid ${theme.border}`,
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="material-icons" style={{ fontSize: '16px', color: theme.accent }}>
              memory
            </span>
            <span style={{ color: theme.text }}>
              <strong>{combinedResources.totalCpu} vCPU</strong> combined
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="material-icons" style={{ fontSize: '16px', color: theme.accent }}>
              storage
            </span>
            <span style={{ color: theme.text }}>
              <strong>{combinedResources.totalRam} GB RAM</strong> combined
            </span>
          </div>
          {combinedResources.gpuEnabled && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="material-icons" style={{ fontSize: '16px', color: theme.accent }}>
                videogame_asset
              </span>
              <span style={{ color: theme.text }}>
                <strong>Dual GPU</strong> enabled
              </span>
            </div>
          )}
        </div>
      )}

      {/* Dual Terminal Instances */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          padding: '8px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Instance 1 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.surfaceVariant,
            borderRadius: '6px',
            overflow: 'hidden',
            border: `1px solid ${theme.border}`,
          }}
        >
          <div
            style={{
              padding: '6px 12px',
              backgroundColor: theme.surface,
              borderBottom: `1px solid ${theme.border}`,
              fontSize: '11px',
              fontWeight: 600,
              color: theme.textSecondary,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span className="material-icons" style={{ fontSize: '14px' }}>
              cloud
            </span>
            Instance 1 - AzaleaCloud
          </div>
          <div
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              minHeight: 0,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {instancesReady[0] ? (
              <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
                <Terminal />
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.textSecondary,
                  fontSize: '12px',
                }}
              >
                Initializing...
              </div>
            )}
          </div>
        </div>

        {/* Instance 2 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.surfaceVariant,
            borderRadius: '6px',
            overflow: 'hidden',
            border: `1px solid ${theme.border}`,
          }}
        >
          <div
            style={{
              padding: '6px 12px',
              backgroundColor: theme.surface,
              borderBottom: `1px solid ${theme.border}`,
              fontSize: '11px',
              fontWeight: 600,
              color: theme.textSecondary,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span className="material-icons" style={{ fontSize: '14px' }}>
              cloud
            </span>
            Instance 2 - AzaleaCloud
          </div>
          <div
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              minHeight: 0,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {instancesReady[1] ? (
              <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
                <Terminal />
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.textSecondary,
                  fontSize: '12px',
                }}
              >
                Initializing...
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

