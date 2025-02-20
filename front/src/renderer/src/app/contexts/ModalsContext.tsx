import React, { createContext, useCallback, useState } from 'react';

export interface ModalsContextValue {
  isProfileModalOpen: boolean;
  handleOpenProfileModal(): void;
  handleCloseProfileModal(): void;
}

export const ModalsContext = createContext({} as ModalsContextValue);

export function ModalsProvider({ children }: { children: React.ReactNode }) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleOpenProfileModal = useCallback(() => {
    setIsProfileModalOpen(true);
  }, []);

  const handleCloseProfileModal = useCallback(() => {
    setIsProfileModalOpen(false);
  }, []);

  return (
    <ModalsContext.Provider
      value={{
        isProfileModalOpen,
        handleOpenProfileModal,
        handleCloseProfileModal,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
}
