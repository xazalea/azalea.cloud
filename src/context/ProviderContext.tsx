import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProviderType, PROVIDERS } from '../types/providers';

interface ProviderContextType {
  currentProvider: ProviderType;
  setProvider: (provider: ProviderType) => void;
  providers: typeof PROVIDERS;
}

const ProviderContext = createContext<ProviderContextType | undefined>(undefined);

export const ProviderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentProvider, setCurrentProvider] = useState<ProviderType>(() => {
    const saved = localStorage.getItem('azalea-provider');
    return (saved as ProviderType) || 'azalea-cloud';
  });

  useEffect(() => {
    localStorage.setItem('azalea-provider', currentProvider);
  }, [currentProvider]);

  const setProvider = (provider: ProviderType) => {
    setCurrentProvider(provider);
  };

  return (
    <ProviderContext.Provider
      value={{
        currentProvider,
        setProvider,
        providers: PROVIDERS,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

export const useProvider = () => {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error('useProvider must be used within ProviderProvider');
  }
  return context;
};

