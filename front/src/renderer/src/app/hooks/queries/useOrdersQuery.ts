import { useQuery } from '@tanstack/react-query';

import { ordersService } from '@renderer/app/services/ordersService';
import { GetAllOrdersParams } from '@renderer/app/services/ordersService/getAllByClientId';

export function useOrdersQuery(params: GetAllOrdersParams) {
  const { data, isLoading } = useQuery({
    queryKey: ['orders', 'getAll'],
    queryFn: async () => ordersService.getAllByClientId(params),
  });

  return {
    orders: data ?? [],
    isLoading,
  };
}
