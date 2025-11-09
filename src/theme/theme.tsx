import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { colors, ColorMode } from './colors';

interface ThemeContextType {
  mode: ColorMode;
  toggleMode: () => void;
  theme: typeof colors.light | typeof colors.dark;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ColorMode>(() => {
    const saved = localStorage.getItem('theme-mode');
    return (saved as ColorMode) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const theme = mode === 'light' ? colors.light : colors.dark;

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, theme }}>
      <div
        style={{
          backgroundColor: theme.background,
          color: theme.text,
          minHeight: '100vh',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

