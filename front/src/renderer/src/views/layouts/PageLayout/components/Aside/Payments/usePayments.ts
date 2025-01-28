import { Client } from '@renderer/app/entities/Client';
import { useState } from 'react';

export default function usePayments(client: Client | null) {
  const [isOpenNewPaymentModal, setIsOpenNewPaymentModal] = useState(false);

  function handleOpenNewPaymentModal() {
    setIsOpenNewPaymentModal(true);
  }

  function handleCloseNewPaymentModal() {
    setIsOpenNewPaymentModal(false);
  }

  return {
    isOpenNewPaymentModal,
    handleOpenNewPaymentModal,
    handleCloseNewPaymentModal,
  };
}
