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
      queryClient.resetQueries({
        queryKey: ['customers'],
      });
      queryClient.resetQueries({
        queryKey: ['customer'],
      });
    },
  });

  return {
    removePayment: mutateAsync,
    isLoading: isPending,
  };
}
