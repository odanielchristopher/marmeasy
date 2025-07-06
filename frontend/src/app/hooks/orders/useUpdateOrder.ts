import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ordersService } from '@app/services/ordersService';

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ordersService.update,
    onSuccess: (order) => {
      queryClient.resetQueries({
        queryKey: ['orders'],
      });

      queryClient.setQueryData(['order', order.id], () => order);
    },
  });

  return {
    updateOrder: mutateAsync,
    isLoading: isPending,
  };
}
