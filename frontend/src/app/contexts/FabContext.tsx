/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useCallback, useState } from 'react';

interface IFabContext {
  isOpenNewCustomerModal: boolean;
  isOpenNewOrderModal: boolean;
  isOpenNewPaymentModal: boolean;
  openNewCustomerModal(): void;
  closeNewCustomerModal(): void;
  openNewOrderModal(): void;
  closeNewOrderModal(): void;
  openNewPaymentModal(): void;
  closeNewPaymentModal(): void;
}

export const FabContext = createContext({} as IFabContext);

export function FabProvider({ children }: { children: React.ReactNode }) {
  const [isOpenNewCustomerModal, setIsOpenNewCustomerModal] = useState(false);
  const [isOpenNewOrderModal, setIsOpenNewOrderModal] = useState(false);
  const [isOpenNewPaymentModal, setIsOpenNewPaymentModal] = useState(false);

  const openNewCustomerModal = useCallback(() => {
    setIsOpenNewCustomerModal(true);
  }, []);

  const closeNewCustomerModal = useCallback(() => {
    setIsOpenNewCustomerModal(false);
  }, []);

  const openNewOrderModal = useCallback(() => {
    setIsOpenNewOrderModal(true);
  }, []);

  const closeNewOrderModal = useCallback(() => {
    setIsOpenNewOrderModal(false);
  }, []);

  const openNewPaymentModal = useCallback(() => {
    setIsOpenNewPaymentModal(true);
  }, []);

  const closeNewPaymentModal = useCallback(() => {
    setIsOpenNewPaymentModal(false);
  }, []);

  return (
    <FabContext.Provider
      value={{
        isOpenNewCustomerModal,
        isOpenNewOrderModal,
        isOpenNewPaymentModal,
        openNewOrderModal,
        closeNewOrderModal,
        openNewCustomerModal,
        closeNewCustomerModal,
        closeNewPaymentModal,
        openNewPaymentModal,
      }}
    >
      {children}
    </FabContext.Provider>
  );
}
