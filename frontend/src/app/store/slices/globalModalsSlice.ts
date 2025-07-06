/* eslint-disable no-param-reassign */
import { CreateSlice } from '../Store';

type GlobalModalsStore = {
  newCustomerModal: { isOpen: boolean };
  newPaymentModal: { isOpen: boolean };
};

type GlobalModalsActions = {
  openNewCustomerModal(): void;
  openNewPaymentModal(): void;
  closeNewCustomerModal(): void;
  closeNewPaymentModal(): void;
};

export type GlobalModalsSlice = GlobalModalsStore & GlobalModalsActions;

export const createGlobalModalsSlice: CreateSlice<GlobalModalsSlice> = (
  set,
) => ({
  newCustomerModal: { isOpen: false },
  newPaymentModal: { isOpen: false },
  openNewCustomerModal: () =>
    set((prevStore) => {
      prevStore.globalModals.newCustomerModal.isOpen = true;
    }),

  openNewPaymentModal: () =>
    set((prevStore) => {
      prevStore.globalModals.newPaymentModal.isOpen = true;
    }),

  closeNewCustomerModal: () =>
    set((prevStore) => {
      prevStore.globalModals.newCustomerModal.isOpen = false;
    }),
  closeNewPaymentModal: () =>
    set((prevStore) => {
      prevStore.globalModals.newPaymentModal.isOpen = false;
    }),
});
