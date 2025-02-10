import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { expensesService } from '@renderer/app/services/dashboard/expensesService';
import { ExpenseFormSchema } from '../../ExpenseForm/useExpenseForm';

import { UpdateExpenseParams } from '@renderer/app/services/dashboard/expensesService/update';
import toast from '@renderer/app/utils/toast';

interface UseEditExpenseModalProps {
  onSuccess?(): void;
  expenseId: string;
}

export default function useEditExpenseModal({ onSuccess, expenseId }: UseEditExpenseModalProps) {
  const [isOpenDeleteExpenseModal, setIsOpenDeleteExpenseModal] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync: updateExpense, isPending: isLoading } = useMutation({
    mutationFn: async (data: UpdateExpenseParams) => expensesService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
        refetchType: 'active',
      });
    },
  });

  function handleOpenDeleteExpenseModal() {
    setIsOpenDeleteExpenseModal(true);
  }

  const handleCloseDeleteExpenseModal = useCallback(() => {
    setIsOpenDeleteExpenseModal(false);
  }, []);

  const handleSubmit = useCallback(async (data: ExpenseFormSchema) => {
    const { date, type, value } = data;

        try {
          await updateExpense({
            id: expenseId,
            type,
            date: date.toISOString(),
            value: Number(value),
          });

          toast({
            type: 'success',
            text: 'Gasto editado com sucesso.',
          });

          onSuccess?.();
        } catch (error) {
          toast({
            type: 'danger',
            text: 'Ocorreu um erro ao editar o gasto.',
          });
        }
  }, []);

  return {
    isLoading,
    isOpenDeleteExpenseModal,
    handleSubmit,
    handleOpenDeleteExpenseModal,
    handleCloseDeleteExpenseModal,
  };
}
