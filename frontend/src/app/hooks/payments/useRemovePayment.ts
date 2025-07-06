import { useMutation, useQueryClient } from '@tanstack/react-query';

import { paymentsService } from '@app/services/paymentsService';

export function useRemovePayment() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: paymentsService.remove,
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ['payments'],
      });
    },
  });

  return {
    removePayment: mutateAsync,
    isLoading: isPending,
  };
}
