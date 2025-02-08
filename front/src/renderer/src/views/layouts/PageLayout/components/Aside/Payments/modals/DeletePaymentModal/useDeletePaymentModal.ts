import { queryClient } from '@renderer/App';
import { Client } from '@renderer/app/entities/Client';
import { Payment } from '@renderer/app/entities/Payment';
import { paymentsService } from '@renderer/app/services/paymentsService';
import { RemovePaymentParams } from '@renderer/app/services/paymentsService/remove';
import { PaginatedResponse } from '@renderer/app/services/types';
import { calculateNewBalance } from '@renderer/app/utils/calculateNewBalance';
import toast from '@renderer/app/utils/toast';
import { InfiniteData, useMutation } from '@tanstack/react-query';

interface DeletePaymentModalProps {
  payment: Payment | null;
  client: Client | null;
  onSuccess(): void;
}

export default function useDeletePaymentModal({
  payment: paymentShouldDeleted,
  client,
  onSuccess,
}: DeletePaymentModalProps) {
  const { mutateAsync: deletePayment, isPending: isLoading } = useMutation({
    mutationFn: async (data: RemovePaymentParams) =>
      paymentsService.remove(data),
    onSuccess: () => {
      queryClient.setQueryData(
        ['payments', 'getAll', { id: client!.id }],
        (payments: Payment[]) => {
          return payments.filter(
            (payment) => payment.id !== paymentShouldDeleted?.id,
          );
        },
      );

      queryClient.setQueryData(
        ['clients', 'getAll'],
        (oldData: InfiniteData<PaginatedResponse<Client[]>> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((oldClient) =>
                oldClient.id === client?.id
                  ? {
                      ...oldClient,
                      balance: calculateNewBalance({
                        currentBalance: Number(oldClient.balance),
                        newValue: -paymentShouldDeleted!.value,
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

  async function handleConfirmDelete() {
    try {
      await deletePayment({
        id: paymentShouldDeleted!.id,
      });

      toast({
        type: 'success',
        text: 'Pagamento removido com sucesso.',
      });

      onSuccess();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao remover esse pagamento.',
      });
    }
  }

  return {
    isLoading,
    handleConfirmDelete,
  };
}
