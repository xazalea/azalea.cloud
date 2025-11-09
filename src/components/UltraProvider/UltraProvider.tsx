import React, { useState, useEffect } from 'react';
import { useTheme } from '../../theme/theme';
import { Terminal } from '../Terminal/Terminal';
import { WebVMLocal } from '../WebVM/WebVMLocal';

/**
 * AzaleaUltra - Triple-instance + WebVM combined power
 * Runs 3 instances of AzaleaCloud plus WebVM, all combined
 */
export const UltraProvider: React.FC = () => {
  const { theme } = useTheme();
  const [instancesReady, setInstancesReady] = useState([false, false, false, false]); // 3 cloud + 1 webvm
  const [combinedResources, setCombinedResources] = useState({
    totalCpu: 0,
    totalRam: 0,
    gpuEnabled: false,
  });

  useEffect(() => {
    // Simulate initialization delay for all instances
    setTimeout(() => {
      setInstancesReady([true, false, false, false]); // Instance 1 ready
    }, 200);

    setTimeout(() => {
      setInstancesReady([true, true, false, false]); // Instance 2 ready
    }, 400);

    setTimeout(() => {
      setInstancesReady([true, true, true, false]); // Instance 3 ready
    }, 600);

    setTimeout(() => {
      setInstancesReady([true, true, true, true]); // All instances ready including WebVM
      setCombinedResources({
        totalCpu: 14, // 3x4 cores + 2 from WebVM
        totalRam: 52, // 3x16 GB + 4 GB from WebVM
        gpuEnabled: true,
      });
    }, 800);
  }, []);

  const allReady = instancesReady.every(ready => ready);

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
      {/* Ultra Mode Header */}
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
            rocket_launch
          </span>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: theme.text }}>
              AzaleaUltra Mode
            </div>
            <div style={{ fontSize: '11px', color: theme.textSecondary }}>
              Triple-instance + WebVM: 14 vCPU • 52 GB RAM • Triple GPU + WebVM GPU
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
          {allReady ? 'All Instances Ready' : 'Initializing...'}
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
            flexWrap: 'wrap',
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
                <strong>Triple GPU + WebVM GPU</strong> enabled
              </span>
            </div>
          )}
        </div>
      )}

      {/* Combined Instances Layout */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '8px',
          padding: '8px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Instance 1 - Cloud */}
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
              <Terminal instanceId="1" compact={true} />
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

        {/* Instance 2 - Cloud */}
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
              <Terminal instanceId="2" compact={true} />
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

        {/* Instance 3 - Cloud */}
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
            Instance 3 - AzaleaCloud
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
            {instancesReady[2] ? (
              <Terminal instanceId="3" compact={true} />
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

        {/* WebVM Instance */}
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
              computer
            </span>
            WebVM - Browser VM
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
            {instancesReady[3] ? (
              <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
                <WebVMLocal />
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

