import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customersService } from '@app/services/customersService';

export function useRemoveCustomer() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: customersService.remove,
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ['customers'],
      });
    },
  });

  return {
    removeCustomer: mutateAsync,
    isLoading: isPending,
  };
}
