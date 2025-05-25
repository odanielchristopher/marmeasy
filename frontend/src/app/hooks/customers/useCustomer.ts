import { useQuery } from '@tanstack/react-query';

import { customersService } from '@app/services/customersService';

export function useCustomer(customerId: string) {
  const { data, isFetching } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => customersService.getOne(customerId),
  });

  return {
    customer: data,
    isLoading: isFetching,
  };
}
