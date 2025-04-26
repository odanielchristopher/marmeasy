import { useQuery } from '@tanstack/react-query';

import { customersService } from '@app/services/customersService';

export function useCustomers() {
  const { data, isFetching } = useQuery({
    queryKey: ['customers'],
    queryFn: customersService.getAll,
    staleTime: Infinity,
  });

  return {
    customers: data ?? [],
    isLoading: isFetching,
  };
}
