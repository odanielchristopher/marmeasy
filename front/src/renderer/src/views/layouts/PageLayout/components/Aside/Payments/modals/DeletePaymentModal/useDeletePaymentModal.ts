import { queryClient } from '@renderer/App';
import { Client } from '@renderer/app/entities/Client';
import { Payment } from '@renderer/app/entities/Payment';
import { paymentsService } from '@renderer/app/services/paymentsService';
import { RemovePaymentParams } from '@renderer/app/services/paymentsService/remove';
import { calculateNewBalance } from '@renderer/app/utils/calculateNewBalance';
import toast from '@renderer/app/utils/toast';
import { useMutation } from '@tanstack/react-query';

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
        ['payments', 'getAll'],
        (payments: Payment[]) => {
          return payments.filter((payment) => payment.id !== paymentShouldDeleted?.id);
        },
      );

      queryClient.setQueryData(['clients', 'getAll'], (clients: Client[]) => {
        const updatedClients = clients.map((oldClient) => {
          if (oldClient.id === client?.id) {
            return {
              ...oldClient,
              balance: calculateNewBalance({
                currentBalance: Number(oldClient.balance),
                newValue: -paymentShouldDeleted!.value,
              }),
            };
          }

          return oldClient;
        });

        return updatedClients;
      });
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
