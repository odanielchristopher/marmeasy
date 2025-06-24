import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ordersService } from '@app/services/ordersService';

export function useCreateOrder() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ordersService.create,
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ['orders'],
      });
    },
  });

  return {
    createOrder: mutateAsync,
    isLoading: isPending,
  };
}
