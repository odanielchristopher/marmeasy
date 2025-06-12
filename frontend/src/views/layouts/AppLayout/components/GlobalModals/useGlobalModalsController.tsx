import { useShallow } from 'zustand/shallow';

import { useGlobalStore } from '@app/store';

export function useGlobalModalsController() {
  const globalModals = useGlobalStore(
    useShallow((store) => store.globalModals),
  );

  return {
    isOpenNewCustomerModal: globalModals.newCustomerModal.isOpen,
    isOpenNewPaymentModal: globalModals.newPaymentModal.isOpen,
    handleCloseNewCustomerModal: globalModals.closeNewCustomerModal,
    handleCloseNewPaymentModal: globalModals.closeNewPaymentModal,
  };
}
