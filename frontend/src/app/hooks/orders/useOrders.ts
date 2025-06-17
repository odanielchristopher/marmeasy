import { ordersService } from '@app/services/ordersService';
import { GetAllOrdersParams } from '@app/services/ordersService/@types/GetAllOrdersFn';

import { useInfiniteScroll } from '../useInfiniteScroll';

export function useOrders({
  perPage = 24,
  search,
  ...params
}: GetAllOrdersParams) {
  const {
    data: infiniteData,
    isLoading: isLoadingInfiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteScroll({
    perPage,
    queryKey: ['orders', { perPage, search }],
    infiniteLoader: () => ordersService.getAll({ perPage, search, ...params }),
  });

  return {
    orders: infiniteData?.pages.flatMap((page) => page.data) ?? [],
    isLoading: isLoadingInfiniteData,
    infiniteScroll: {
      nextPage: fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    },
  };
}
