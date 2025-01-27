import { useQuery } from '@tanstack/react-query';

import { ordersService } from '@renderer/app/services/ordersService';
import { GetAllOrdersParams } from '@renderer/app/services/ordersService/getAll';

export function useOrdersQuery(params: GetAllOrdersParams) {
  const { data, isLoading } = useQuery({
    queryKey: ['orders', 'getAll'],
    queryFn: async () => ordersService.getAll(params),
  });

  return {
    orders: data ?? [],
    isLoading,
  };
}
