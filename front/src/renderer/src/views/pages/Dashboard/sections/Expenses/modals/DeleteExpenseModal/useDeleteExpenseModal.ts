import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Expense } from '@renderer/app/entities/Expense';
import { expensesService } from '@renderer/app/services/dashboard/expensesService';
import { RemoveExpenseParams } from '@renderer/app/services/dashboard/expensesService/remove';

import toast from '@renderer/app/utils/toast';

interface UseDeleteExpenseModalProps {
  expense: Expense | null;
  onSuccess(): void;
}

export default function useDeleteExpenseModal({
  expense,
  onSuccess,
}: UseDeleteExpenseModalProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteExpense, isPending: isLoading } = useMutation({
    mutationFn: async (data: RemoveExpenseParams) =>
      expensesService.remove(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
        refetchType: 'active',
      });
    },
  });

  async function handleConfirmDelete() {
    try {
      await deleteExpense({
        id: expense!.id,
      });

      toast({
        type: 'success',
        text: 'Gasto removido com sucesso.',
      });

      onSuccess();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao remover esse gasto.',
      });
    }
  }

  return {
    isLoading,
    handleConfirmDelete,
  };
}
