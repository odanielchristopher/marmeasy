import { useQuery } from '@tanstack/react-query';

import { customersService } from '@app/services/customersService';

interface IUseCustomerControllerProps {
  customerId: string;
}

export function useCustomerController({
  customerId,
}: IUseCustomerControllerProps) {
  const { data, isFetching } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => customersService.getOne(customerId),
  });

  return {
    customer: data,
    isLoading: isFetching,
  };
}
