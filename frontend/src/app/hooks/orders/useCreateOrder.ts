import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ordersService } from '@app/services/ordersService';

export function useCreateOrder() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ordersService.create,
    onSuccess: (order) => {
      queryClient.resetQueries({
        queryKey: ['orders'],
      });

      queryClient.resetQueries({
        queryKey: ['customer', order.customer.id],
      });
      queryClient.resetQueries({
        queryKey: ['customers'],
      });
    },
  });

  return {
    createOrder: mutateAsync,
    isLoading: isPending,
  };
}
