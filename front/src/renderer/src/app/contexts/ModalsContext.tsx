import React, { createContext, useState } from 'react';

export interface ModalsContextValue {
  isProfileModalOpen: boolean;
  handleIsProfileModalOpen(): void;
}

export const ModalsContext = createContext({} as ModalsContextValue);

export function ModalsProvider({ children }: { children: React.ReactNode }) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  function handleIsProfileModalOpen() {
    setIsProfileModalOpen((prevState) => !prevState);
  }

  return (
    <ModalsContext.Provider value={{
      isProfileModalOpen,
      handleIsProfileModalOpen,
    }}>
      {children}
    </ModalsContext.Provider>
  );
}
