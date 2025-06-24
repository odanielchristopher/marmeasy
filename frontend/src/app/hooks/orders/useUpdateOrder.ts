import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ordersService } from '@app/services/ordersService';

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ordersService.update,
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ['orders'],
      });
    },
  });

  return {
    updateOrder: mutateAsync,
    isLoading: isPending,
  };
}
