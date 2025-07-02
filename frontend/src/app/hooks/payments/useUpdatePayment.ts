import { useMutation, useQueryClient } from '@tanstack/react-query';

import { paymentsService } from '@app/services/paymentsService';

export function useUpdatePayment() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: paymentsService.update,
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ['payments'],
      });
    },
  });

  return {
    updatePayment: mutateAsync,
    isLoading: isPending,
  };
}
