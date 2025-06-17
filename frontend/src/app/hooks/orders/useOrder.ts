import { useQuery } from '@tanstack/react-query';

import { ordersService } from '@app/services/ordersService';

export function useOrder(orderId: string) {
  const { data, isFetching } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => ordersService.getOne(orderId),
  });

  return {
    order: data,
    isLoading: isFetching,
  };
}
