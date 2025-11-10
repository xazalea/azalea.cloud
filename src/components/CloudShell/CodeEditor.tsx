import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../theme/theme';

export const CodeEditor: React.FC = () => {
  const { theme } = useTheme();
  const [content, setContent] = useState('// Welcome to AzaleaCloud Code Editor\n// Start typing your code here...\n\n');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [fileName, setFileName] = useState('untitled.txt');

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      setContent(newValue);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

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
      {/* Editor header */}
      <div
        style={{
          padding: '16px 24px',
          backgroundColor: theme.surfaceVariant,
          borderBottom: `1px solid ${theme.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontSize: '16px',
        }}
      >
        <span className="material-icons" style={{ fontSize: '20px', color: theme.accent }}>
          code
        </span>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: theme.text,
            fontSize: '16px',
            fontWeight: 500,
            padding: '8px 12px',
            borderRadius: '6px',
            flex: 1,
            maxWidth: '300px',
          }}
          onFocus={(e) => {
            e.target.style.backgroundColor = theme.surface;
          }}
          onBlur={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        />
        <div style={{ flex: 1 }} />
        <button
          onClick={() => {
            // Save file functionality
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            URL.revokeObjectURL(url);
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: theme.accent,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Save
        </button>
      </div>

      {/* Editor content */}
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          flex: 1,
          width: '100%',
          padding: '24px',
          backgroundColor: theme.surface,
          color: theme.text,
          border: 'none',
          outline: 'none',
          fontFamily: '"Fira Code", "Courier New", monospace',
          fontSize: '16px',
          lineHeight: '1.8',
          resize: 'none',
          whiteSpace: 'pre',
          overflow: 'auto',
        }}
        spellCheck={false}
      />
    </div>
  );
};

