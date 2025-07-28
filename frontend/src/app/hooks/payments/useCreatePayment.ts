import { useMutation, useQueryClient } from '@tanstack/react-query';

import { paymentsService } from '@app/services/paymentsService';

export function useCreatePayment() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: paymentsService.create,
    onSuccess: (payment) => {
      queryClient.resetQueries({
        queryKey: ['payments'],
      });
      queryClient.resetQueries({
        queryKey: ['customers'],
      });
      queryClient.resetQueries({
        queryKey: ['customer', payment.customerId],
      });
    },
  });

  return {
    createPayment: mutateAsync,
    isLoading: isPending,
  };
}
