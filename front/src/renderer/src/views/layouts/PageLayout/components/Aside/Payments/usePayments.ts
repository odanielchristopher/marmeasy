import { Client } from '@renderer/app/entities/Client';
import { usePaymentsQuery } from '@renderer/app/hooks/queries/usePaymetsQuery';
import { useState } from 'react';

export default function usePayments(client: Client | null) {
  const [isOpenNewPaymentModal, setIsOpenNewPaymentModal] = useState(false);

  function handleOpenNewPaymentModal() {
    setIsOpenNewPaymentModal(true);
  }

  function handleCloseNewPaymentModal() {
    setIsOpenNewPaymentModal(false);
  }

  const { isLoading, payments } = usePaymentsQuery({ clientId: client!.id });

  const hasPayments = payments.length > 0;

  return {
    isLoading,
    payments,
    hasPayments,
    isOpenNewPaymentModal,
    handleOpenNewPaymentModal,
    handleCloseNewPaymentModal,
  };
}
