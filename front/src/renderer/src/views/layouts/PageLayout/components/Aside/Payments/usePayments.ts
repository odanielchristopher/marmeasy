import { Client } from '@renderer/app/entities/Client';
import { Payment } from '@renderer/app/entities/Payment';
import { usePaymentsQuery } from '@renderer/app/hooks/queries/usePaymetsQuery';
import { useCallback, useMemo, useState } from 'react';

export default function usePayments(client: Client | null) {
  const [isOpenNewPaymentModal, setIsOpenNewPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isOpenEditPaymentModal, setIsOpenEditPaymentModal] = useState(false);

  const handleSelectedPayment = useCallback((payment: Payment) => {
    setSelectedPayment(payment);
    handleOpenEditPaymentModal();
  }, []);

  const handleOpenEditPaymentModal = useCallback(() => {
    setIsOpenEditPaymentModal(true);
  }, []);

  const handleCloseEditPaymentModal = useCallback(() => {
    setIsOpenEditPaymentModal(false);
  }, []);

  const handleOpenNewPaymentModal = useCallback(() => {
    setIsOpenNewPaymentModal(true);
  }, []);

  const handleCloseNewPaymentModal = useCallback(() => {
    setIsOpenNewPaymentModal(false);
  }, []);

  const { isLoading, payments } = usePaymentsQuery({ clientId: client!.id });

  const hasPayments = payments.length > 0;

  const sortedPayments = useMemo(() => {
    return payments.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [payments]);

  return {
    payments: sortedPayments,
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
