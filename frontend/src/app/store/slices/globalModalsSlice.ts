/* eslint-disable no-param-reassign */
import { CreateSlice } from '../Store';

type GlobalModalsStore = {
  newCustomerModal: { isOpen: boolean };
  newOrderModal: { isOpen: boolean };
  newPaymentModal: { isOpen: boolean };
};

type GlobalModalsActions = {
  openNewCustomerModal(): void;
  openNewOrderModal(): void;
  openNewPaymentModal(): void;
  closeNewCustomerModal(): void;
  closeNewOrderModal(): void;
  closeNewPaymentModal(): void;
};

export type GlobalModalsSlice = GlobalModalsStore & GlobalModalsActions;

export const createGlobalModalsSlice: CreateSlice<GlobalModalsSlice> = (
  set,
) => ({
  newCustomerModal: { isOpen: false },
  newOrderModal: { isOpen: false },
  newPaymentModal: { isOpen: false },
  openNewCustomerModal: () =>
    set((prevStore) => {
      prevStore.globalModals.newCustomerModal.isOpen = true;
    }),
  openNewOrderModal: () =>
    set((prevStore) => {
      prevStore.globalModals.newOrderModal.isOpen = true;
    }),
  openNewPaymentModal: () =>
    set((prevStore) => {
      prevStore.globalModals.newPaymentModal.isOpen = true;
    }),

  closeNewCustomerModal: () =>
    set((prevStore) => {
      prevStore.globalModals.newCustomerModal.isOpen = false;
    }),
  closeNewOrderModal: () =>
    set((prevStore) => {
      prevStore.globalModals.newOrderModal.isOpen = false;
    }),
  closeNewPaymentModal: () =>
    set((prevStore) => {
      prevStore.globalModals.newPaymentModal.isOpen = false;
    }),
});
