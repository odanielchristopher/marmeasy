import { Client } from '@renderer/app/entities/Client';
import { Payment } from '@renderer/app/entities/Payment';
import { usePaymentsQuery } from '@renderer/app/hooks/queries/usePaymetsQuery';
import { useState } from 'react';

export default function usePayments(client: Client | null) {
  const [isOpenNewPaymentModal, setIsOpenNewPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isOpenEditPaymentModal, setIsOpenEditPaymentModal] = useState(false);

  function handleSelectedPayment(payment: Payment) {
    setSelectedPayment(payment);
    handleOpenEditPaymentModal();
  }

  function handleOpenEditPaymentModal() {
    setIsOpenEditPaymentModal(true);
  }

  function handleCloseEditPaymentModal() {
    setIsOpenEditPaymentModal(false);
  }

  function handleOpenNewPaymentModal() {
    setIsOpenNewPaymentModal(true);
  }

  function handleCloseNewPaymentModal() {
    setIsOpenNewPaymentModal(false);
  }

  const { isLoading, payments } = usePaymentsQuery({ clientId: client!.id });

  const hasPayments = payments.length > 0;

  return {
    payments,
    isLoading,
    hasPayments,
    selectedPayment,
    isOpenNewPaymentModal,
    isOpenEditPaymentModal,
    handleSelectedPayment,
    handleOpenNewPaymentModal,
    handleCloseNewPaymentModal,
    handleOpenEditPaymentModal,
    handleCloseEditPaymentModal,
  };
}
