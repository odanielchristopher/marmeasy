import { useQuery } from '@tanstack/react-query';

import { ordersService } from '@app/services/ordersService';

export function useOrder(orderId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => ordersService.getOne(orderId),
    staleTime: 60000,
  });

  return {
    order: data,
    isLoading,
  };
}
