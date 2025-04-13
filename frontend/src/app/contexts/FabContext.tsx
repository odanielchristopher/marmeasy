/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useCallback, useState } from 'react';

interface IFabContext {
  isOpenNewCustomerModal: boolean;
  openNewCustomerModal(): void;
  closeNewCustomerModal(): void;
}

export const FabContext = createContext({} as IFabContext);

export function FabProvider({ children }: { children: React.ReactNode }) {
  const [isOpenNewCustomerModal, setIsOpenNewCustomerModal] = useState(false);

  const openNewCustomerModal = useCallback(() => {
    setIsOpenNewCustomerModal(true);
  }, []);

  const closeNewCustomerModal = useCallback(() => {
    setIsOpenNewCustomerModal(false);
  }, []);

  return (
    <FabContext.Provider
      value={{
        isOpenNewCustomerModal,
        openNewCustomerModal,
        closeNewCustomerModal,
      }}
    >
      {children}
    </FabContext.Provider>
  );
}
