import { ordersService } from '@renderer/app/services/ordersService';
import { GetAllParams } from '@renderer/app/services/ordersService/getAll';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useOrdersQuery({ perPage = 20, from, to }: GetAllParams) {
  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['orders', 'getAll', from, to],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) =>
        ordersService.getAll({ from, to, perPage, page: pageParam }),
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
