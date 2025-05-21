import { useQuery } from '@tanstack/react-query';

import { customersService } from '@app/services/customersService';

interface IUseCustomerController {
  customerId: string;
}

export function useCustomerController({ customerId }: IUseCustomerController) {
  const { data, isFetching } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => customersService.getOne(customerId),
  });

  return {
    customer: data,
    isLoading: isFetching,
  };
}
