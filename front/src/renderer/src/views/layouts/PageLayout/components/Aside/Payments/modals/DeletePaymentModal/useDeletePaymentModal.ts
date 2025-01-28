import { queryClient } from '@renderer/App';
import { Payment } from '@renderer/app/entities/Payment';
import { paymentsService } from '@renderer/app/services/paymentsService';
import { RemovePaymentParams } from '@renderer/app/services/paymentsService/remove';
import toast from '@renderer/app/utils/toast';
import { useMutation } from '@tanstack/react-query';

interface DeletePaymentModalProps {
  paymentId: string;
  onSuccess(): void;
}

export default function useDeletePaymentModal({
  paymentId,
  onSuccess,
}: DeletePaymentModalProps) {
  const { mutateAsync: deletePayment, isPending: isLoading } = useMutation({
    mutationFn: async (data: RemovePaymentParams) =>
      paymentsService.remove(data),
    onSuccess: () => {
      queryClient.setQueryData(
        ['payments', 'getAll'],
        (payments: Payment[]) => {
          return payments.filter((payment) => payment.id !== paymentId);
        },
      );
    },
  });

  async function handleConfirmDelete() {
    try {
      await deletePayment({
        id: paymentId,
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
