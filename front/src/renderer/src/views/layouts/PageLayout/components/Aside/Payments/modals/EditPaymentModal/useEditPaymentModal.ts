import { queryClient } from '@renderer/App';
import { Client } from '@renderer/app/entities/Client';
import { Payment } from '@renderer/app/entities/Payment';
import { paymentsService } from '@renderer/app/services/paymentsService';
import { UpdatePaymentParams } from '@renderer/app/services/paymentsService/update';
import { PaginatedResponse } from '@renderer/app/services/types';
import { calculateNewBalance } from '@renderer/app/utils/calculateNewBalance';
import toast from '@renderer/app/utils/toast';
import { InfiniteData, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { PaymentFormSchema } from '../../PaymentForm/usePaymentFormModal';

interface UseEditPaymentModalProps {
  payment: Payment | null;
  client: Client | null;
  onSuccess(): void;
}

export default function useEditPaymentModal({
  client,
  payment,
  onSuccess,
}: UseEditPaymentModalProps) {
  const [isOpenDeletePaymentModal, setIsOpenDeletePaymentModal] =
    useState(false);

  function handleOpenDeletePaymentModal() {
    setIsOpenDeletePaymentModal(true);
  }

  function handleCloseDeletePaymentModal() {
    setIsOpenDeletePaymentModal(false);
  }

  const { mutateAsync: updatePayment, isPending: isLoading } = useMutation({
    mutationFn: async (data: UpdatePaymentParams) =>
      paymentsService.update(data),
    onSuccess: (updatedPayment: Payment) => {
      queryClient.setQueryData(
        ['payments', 'getAll', { id: updatedPayment.clientId }],
        (payments: Payment[]) =>
          payments.map((payment) =>
            payment.id === updatedPayment.id ? updatedPayment : payment,
          ),
      );

      queryClient.setQueryData(
        ['clients', 'getAll'],
        (oldData: InfiniteData<PaginatedResponse<Client[]>>) => {
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((oldClient) =>
                oldClient.id === updatedPayment.clientId
                  ? {
                      ...oldClient,
                      balance: calculateNewBalance({
                        currentBalance: Number(oldClient.balance),
                        newValue: updatedPayment.value,
                        previousValue: payment?.value,
                      }),
                    }
                  : oldClient,
              ),
            })),
          };
        },
      );
    },
  });

  async function handleSubmit(data: PaymentFormSchema) {
    const { date, type, value } = data;

    try {
      await updatePayment({
        type,
        id: payment!.id,
        clientId: client!.id,
        date: date.toISOString(),
        value: Number(value),
      });

      toast({
        type: 'success',
        text: 'Pagamento editado com sucesso.',
      });

      onSuccess();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar pagamento.',
      });
    }
  }

  return {
    isLoading,
    isOpenDeletePaymentModal,
    handleSubmit,
    handleOpenDeletePaymentModal,
    handleCloseDeletePaymentModal,
  };
}
