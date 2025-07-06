import { ordersService } from '@app/services/ordersService';
import { GetAllOrdersParams } from '@app/services/ordersService/@types/GetAllOrdersFn';

import { useInfiniteScroll } from '../useInfiniteScroll';

export function useOrders({ perPage = 24, ...params }: GetAllOrdersParams) {
  const {
    data: infiniteData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteScroll({
    perPage,
    queryKey: ['orders', { perPage, ...params }],
    infiniteLoader: () => ordersService.getAll({ perPage, ...params }),
  });

  return {
    orders: infiniteData?.pages.flatMap((page) => page.data) ?? [],
    isLoading,
    infiniteScroll: {
      nextPage: fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    },
  };
}
