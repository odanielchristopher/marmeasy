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
    },
  });

  return {
    removeOrder: mutateAsync,
    isLoading: isPending,
  };
}
