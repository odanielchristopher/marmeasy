import { useMutation, useQueryClient } from '@tanstack/react-query';

import { paymentsService } from '@app/services/paymentsService';

export function useCreatePayment() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: paymentsService.create,
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ['payments'],
      });
    },
  });

  return {
    createPayment: mutateAsync,
    isLoading: isPending,
  };
}
