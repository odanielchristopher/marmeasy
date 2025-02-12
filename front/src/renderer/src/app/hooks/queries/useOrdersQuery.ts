
import { ordersService } from '@renderer/app/services/ordersService';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useOrdersQuery(perPage = 20) {
  const clientId = '1ce6a03e-001e-4a77-8f9f-52a91d163ef4';
  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['orders', 'getAll'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) =>
      ordersService.getAll(clientId, pageParam, perPage),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalPages = Math.ceil(lastPage.items / perPage);

      const isLastPage = allPages.length >= totalPages;

      if (isLastPage) {
        return null;
      }

      return lastPageParam + 1;
    },
    staleTime: 60000 * 2,
  });

  const orders = data?.pages.flatMap((page) => page.data);

  return {
    orders: orders ?? [],
    isLoading: isFetching,
    nextPage: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
