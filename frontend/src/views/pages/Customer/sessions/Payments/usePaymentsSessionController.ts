import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { IPayment } from '@app/entities/Payment';
import { usePayments } from '@app/hooks/payments/usePayments';

export function usePaymentsSessionController(customerId: string) {
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [dateRange, setDateRange] = useState<
    { from?: string; to?: string } | undefined
  >();
  const [paymentBeenEdited, setPaymentBeenEdited] = useState<IPayment | null>(
    null,
  );
  const [isOpenEditPaymentModal, setIsOpenEditPaymentModal] = useState(false);

  function handleOpenEditProductModal(payment: IPayment) {
    setPaymentBeenEdited(payment);
    setIsOpenEditPaymentModal(true);
  }

  function handleCloseEditProductModal() {
    setPaymentBeenEdited(null);
    setIsOpenEditPaymentModal(false);
  }

  const { infiniteScroll, isLoading, payments } = usePayments({
    customerId,
    params: {
      dateRange,
      order,
    },
  });

  function handleOrder(value: 'asc' | 'desc') {
    setOrder(value);
  }

  function handleDateRange(value: DateRange | undefined) {
    if (!value?.from && !value?.to) {
      setDateRange(undefined);
      return;
    }

    if (value?.from && !value?.to) {
      return;
    }

    setDateRange({
      from: value?.from?.toISOString(),
      to: value?.to?.toISOString(),
    });
  }

  const hasPayments = payments.length > 0;

  return {
    infiniteScroll,
    isLoading,
    payments,
    order,
    hasPayments,
    paymentBeenEdited,
    isOpenEditPaymentModal,
    handleOrder,
    handleDateRange,
    handleOpenEditProductModal,
    handleCloseEditProductModal,
  };
}
