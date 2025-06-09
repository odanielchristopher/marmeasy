import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customersService } from '@app/services/customersService';

export function useUpdateCustomer(customerId: string) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: customersService.update,
    onSuccess: (newCustomer) => {
      queryClient.setQueryData(['customer', customerId], () => newCustomer);

      queryClient.resetQueries({
        queryKey: ['customers'],
      });
    },
  });

  return {
    updateCustomer: mutateAsync,
    isLoading: isPending,
  };
}
