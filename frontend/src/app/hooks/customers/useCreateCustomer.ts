import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@app/lib/queryClient';
import { customersService } from '@app/services/customersService';

export function useCreateCustomer() {
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
