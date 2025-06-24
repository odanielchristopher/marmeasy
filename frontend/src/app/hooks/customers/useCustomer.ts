import { useQuery } from '@tanstack/react-query';

import { customersService } from '@app/services/customersService';

export function useCustomer(customerId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => customersService.getOne(customerId),
    staleTime: 60000,
  });

  return {
    customer: data,
    isLoading,
  };
}
