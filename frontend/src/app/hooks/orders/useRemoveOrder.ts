import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ordersService } from '@app/services/ordersService';

export function useRemoveOrder() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ordersService.remove,
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ['orders'],
      });
      queryClient.resetQueries({
        queryKey: ['customer'],
      });
      queryClient.resetQueries({
        queryKey: ['customers'],
      });
    },
  });

  return {
    removeOrder: mutateAsync,
    isLoading: isPending,
  };
}
