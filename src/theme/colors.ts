// Lavender Sapphire Mist color palette
export const colors = {
  // Primary palette
  lavender: '#D9A69F',
  sapphire: '#6C739C',
  mist: '#F0DAD5',
  stone: '#BABBB1',
  rose: '#C56B62',
  midnight: '#424658',
  peach: '#DEA785',
  
  // Light mode
  light: {
    background: '#F0DAD5',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F0ED',
    text: '#424658',
    textSecondary: '#6C739C',
    border: '#BABBB1',
    accent: '#6C739C',
    accentLight: '#D9A69F',
    error: '#C56B62',
    success: '#6C739C',
  },
  
  // Dark mode
  dark: {
    background: '#1A1B24',
    surface: '#2A2B35',
    surfaceVariant: '#353642',
    text: '#F0DAD5',
    textSecondary: '#BABBB1',
    border: '#424658',
    accent: '#6C739C',
    accentLight: '#D9A69F',
    error: '#C56B62',
    success: '#6C739C',
  },
} as const;

export type ColorMode = 'light' | 'dark';

