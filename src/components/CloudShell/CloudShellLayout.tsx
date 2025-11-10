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
  const [activePane, setActivePane] = useState<'terminal' | 'editor' | 'files'>('terminal');
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
      {/* Top toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          backgroundColor: theme.surfaceVariant,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <button
          onClick={() => {
            setShowFiles(!showFiles);
            if (!showFiles) setActivePane('files');
          }}
          style={{
            padding: '6px 12px',
            backgroundColor: showFiles ? theme.accent : 'transparent',
            color: showFiles ? '#FFFFFF' : theme.text,
            border: `1px solid ${showFiles ? theme.accent : theme.border}`,
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 500,
          }}
        >
          <span className="material-icons" style={{ fontSize: '16px', verticalAlign: 'middle', marginRight: '4px' }}>
            folder
          </span>
          Files
        </button>
        <button
          onClick={() => {
            setShowEditor(!showEditor);
            if (!showEditor) setActivePane('editor');
          }}
          style={{
            padding: '6px 12px',
            backgroundColor: showEditor ? theme.accent : 'transparent',
            color: showEditor ? '#FFFFFF' : theme.text,
            border: `1px solid ${showEditor ? theme.accent : theme.border}`,
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 500,
          }}
        >
          <span className="material-icons" style={{ fontSize: '16px', verticalAlign: 'middle', marginRight: '4px' }}>
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
              padding: '6px 12px',
              backgroundColor: desktopLoading ? theme.textSecondary : theme.accent,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              cursor: desktopLoading ? 'wait' : 'pointer',
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            <span className="material-icons" style={{ fontSize: '16px', verticalAlign: 'middle', marginRight: '4px' }}>
              desktop_windows
            </span>
            Desktop
          </button>
        )}
      </div>

      {/* Main content area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* File browser sidebar */}
        {showFiles && (
          <div
            style={{
              width: '250px',
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
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                borderBottom: `1px solid ${theme.border}`,
              }}
            >
              <CodeEditor />
            </div>
          )}

          {/* Terminal - always visible and prominent */}
          <div
            style={{
              flex: 1,
              minHeight: '300px',
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

