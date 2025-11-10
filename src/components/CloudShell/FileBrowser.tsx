import React, { useState } from 'react';
import { useTheme } from '../../theme/theme';

interface FileNode {
  name: string;
  type: 'file' | 'directory';
  children?: FileNode[];
}

const mockFiles: FileNode[] = [
  {
    name: 'home',
    type: 'directory',
    children: [
      {
        name: 'user',
        type: 'directory',
        children: [
          { name: 'projects', type: 'directory' },
          { name: 'documents', type: 'directory' },
          { name: 'README.md', type: 'file' },
        ],
      },
    ],
  },
  {
    name: 'workspace',
    type: 'directory',
    children: [
      { name: 'app.js', type: 'file' },
      { name: 'package.json', type: 'file' },
      { name: 'src', type: 'directory' },
    ],
  },
];

export const FileBrowser: React.FC = () => {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['home', 'workspace']));
  const [selected, setSelected] = useState<string | null>(null);

  const toggleExpand = (path: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpanded(newExpanded);
  };

  const renderFile = (node: FileNode, path: string = '', depth: number = 0) => {
    const fullPath = path ? `${path}/${node.name}` : node.name;
    const isExpanded = expanded.has(fullPath);
    const isSelected = selected === fullPath;

    return (
      <div key={fullPath}>
        <div
          onClick={() => {
            if (node.type === 'directory') {
              toggleExpand(fullPath);
            } else {
              setSelected(fullPath);
            }
          }}
          style={{
            padding: '12px 16px',
            paddingLeft: `${16 + depth * 20}px`,
            backgroundColor: isSelected ? theme.accent + '20' : 'transparent',
            color: isSelected ? theme.accent : theme.text,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '15px',
            transition: 'background-color 0.1s',
          }}
          onMouseEnter={(e) => {
            if (!isSelected) {
              e.currentTarget.style.backgroundColor = theme.surfaceVariant;
            }
          }}
          onMouseLeave={(e) => {
            if (!isSelected) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <span className="material-icons" style={{ fontSize: '20px' }}>
            {node.type === 'directory'
              ? isExpanded
                ? 'folder_open'
                : 'folder'
              : 'description'}
          </span>
          <span style={{ flex: 1 }}>{node.name}</span>
        </div>
        {node.type === 'directory' && isExpanded && node.children && (
          <div>
            {node.children.map((child) => renderFile(child, fullPath, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.surfaceVariant,
      }}
    >
      <div
        style={{
          padding: '16px 24px',
          borderBottom: `1px solid ${theme.border}`,
          fontSize: '16px',
          fontWeight: 600,
          color: theme.text,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span className="material-icons" style={{ fontSize: '20px' }}>
          folder
        </span>
        Files
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 0' }}>
        {mockFiles.map((file) => renderFile(file))}
      </div>
    </div>
  );
};

