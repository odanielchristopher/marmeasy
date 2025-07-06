import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customersService } from '@app/services/customersService';

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: customersService.create,
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ['customers'],
      });
    },
  });

  return {
    createCustomer: mutateAsync,
    isLoading: isPending,
  };
}
