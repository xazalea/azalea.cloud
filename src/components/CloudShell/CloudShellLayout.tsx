import React, { useState } from 'react';
import { useTheme } from '../../theme/theme';
import { Terminal } from '../Terminal/Terminal';
import { CodeEditor } from './CodeEditor';
import { FileBrowser } from './FileBrowser';

interface CloudShellLayoutProps {
  onDesktopClick?: () => void;
  desktopLoading?: boolean;
}

export const CloudShellLayout: React.FC<CloudShellLayoutProps> = ({ 
  onDesktopClick, 
  desktopLoading 
}) => {
  const { theme } = useTheme();
  const [showFiles, setShowFiles] = useState(true);
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.surface,
      }}
    >
      {/* Clean toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 24px',
          backgroundColor: theme.surfaceVariant,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <button
          onClick={() => setShowFiles(!showFiles)}
          style={{
            padding: '12px 20px',
            backgroundColor: showFiles ? theme.accent : 'transparent',
            color: showFiles ? '#FFFFFF' : theme.text,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          <span className="material-icons" style={{ fontSize: '20px' }}>
            folder
          </span>
          Files
        </button>
        <button
          onClick={() => setShowEditor(!showEditor)}
          style={{
            padding: '12px 20px',
            backgroundColor: showEditor ? theme.accent : 'transparent',
            color: showEditor ? '#FFFFFF' : theme.text,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          <span className="material-icons" style={{ fontSize: '20px' }}>
            code
          </span>
          Editor
        </button>
        <div style={{ flex: 1 }} />
        {onDesktopClick && (
          <button
            onClick={onDesktopClick}
            disabled={desktopLoading}
            style={{
              padding: '12px 24px',
              backgroundColor: desktopLoading ? theme.textSecondary : theme.accent,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              cursor: desktopLoading ? 'wait' : 'pointer',
              fontSize: '16px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
            }}
          >
            <span className="material-icons" style={{ fontSize: '20px' }}>
              {desktopLoading ? 'refresh' : 'desktop_windows'}
            </span>
            {desktopLoading ? 'Starting...' : 'Desktop'}
          </button>
        )}
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* File browser */}
        {showFiles && (
          <div
            style={{
              width: '300px',
              backgroundColor: theme.surfaceVariant,
              borderRight: `1px solid ${theme.border}`,
              overflow: 'auto',
            }}
          >
            <FileBrowser />
          </div>
        )}

        {/* Editor/Terminal area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {showEditor && (
            <div
              style={{
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                borderBottom: `1px solid ${theme.border}`,
              }}
            >
              <CodeEditor />
            </div>
          )}

          {/* Terminal - always visible */}
          <div
            style={{
              flex: 1,
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Terminal
              onCommand={undefined}
              onDesktopClick={onDesktopClick}
              showDesktopButton={false}
              desktopLoading={desktopLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
