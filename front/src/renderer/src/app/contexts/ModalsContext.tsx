import React, { createContext, useCallback, useState } from 'react';

export interface ModalsContextValue {
  isProfileModalOpen: boolean;
  isDeleteUserModalOpen: boolean;
  handleOpenProfileModal(): void;
  handleCloseProfileModal(): void;
  handleOpenDeleteUserModal(): void;
  handleCloseDeleteUserModal(): void;
}

export const ModalsContext = createContext({} as ModalsContextValue);

export function ModalsProvider({ children }: { children: React.ReactNode }) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setDeleteUserModalOpen] = useState(false);

  const handleCloseDeleteUserModal = useCallback(() => {
    setDeleteUserModalOpen(false);
  }, []);

  const handleOpenDeleteUserModal = useCallback(() => {
    setDeleteUserModalOpen(true);
  }, []);

  const handleOpenProfileModal = useCallback(() => {
    setIsProfileModalOpen(true);
  }, []);

  const handleCloseProfileModal = useCallback(() => {
    setIsProfileModalOpen(false);
  }, []);

  return (
    <ModalsContext.Provider value={{
      isProfileModalOpen,
      isDeleteUserModalOpen,
      handleCloseDeleteUserModal,
      handleOpenDeleteUserModal,
      handleOpenProfileModal,
      handleCloseProfileModal,
    }}>
      {children}
    </ModalsContext.Provider>
  );
}
