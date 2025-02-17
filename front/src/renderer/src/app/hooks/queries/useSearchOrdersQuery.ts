// useSearchClientsQuery
import { ordersService } from '@renderer/app/services/ordersService';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useSearchOrdersQuery(
  searchTerm: string,
  perPage = 20,
  dateRange?: { from?: string; to?: string },
) {
  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['orders', 'search', searchTerm, dateRange],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) =>
        ordersService.getBySearchTerm({
          searchTerm,
          page: pageParam,
          perPage,
          dateRange,
        }),
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        const totalPages = Math.ceil(lastPage.items / perPage);

        const isLastPage = allPages.length >= totalPages;

        if (isLastPage) {
          return null;
        }

        return lastPageParam + 1;
      },
      enabled: searchTerm.length > 0 ? true : false,
      staleTime: 60000,
    });

  const orders = data?.pages.flatMap((page) => page.data);

  return {
    findedOrders: orders ?? [],
    isLoading: isFetching,
    nextPage: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
