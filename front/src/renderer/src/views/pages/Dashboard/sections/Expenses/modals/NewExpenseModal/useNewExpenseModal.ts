import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { expensesService } from '@renderer/app/services/dashboard/expensesService';
import { CreateExpenseParams } from '@renderer/app/services/dashboard/expensesService/create';
import { ExpenseFormSchema } from '../../ExpenseForm/useExpenseForm';

import toast from '@renderer/app/utils/toast';

interface UseNewExpenseModalProps {
  onSuccess?(): void;
}

export default function useNewExpenseModal({
  onSuccess,
}: UseNewExpenseModalProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: createExpense, isPending: isLoading } = useMutation({
    mutationFn: async (data: CreateExpenseParams) =>
      expensesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
        refetchType: 'active',
      });
    },
  });

  const handleSubmit = useCallback(async (data: ExpenseFormSchema) => {
    const { date, type, value } = data;

    try {
      await createExpense({
        type,
        date: date.toISOString(),
        value: Number(value),
      });

      toast({
        type: 'success',
        text: 'Gasto registrado com sucesso.',
      });

      onSuccess?.();
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao criar gasto.',
      });
    }
  }, []);

  return {
    handleSubmit,
    isLoading,
  };
}
