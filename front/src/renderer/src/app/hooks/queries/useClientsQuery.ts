import { clientsService } from '@renderer/app/services/clientsService';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useClientsQuery(perPage = 20) {
  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['clients', 'getAll'],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) =>
        clientsService.getAll(pageParam, perPage),
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

  const clients = data?.pages.flatMap((page) => page.data);

  return {
    clients: clients ?? [],
    isLoading: isFetching,
    nextPage: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
