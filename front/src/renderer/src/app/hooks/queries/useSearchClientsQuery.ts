// useSearchClientsQuery
import { clientsService } from '@renderer/app/services/clientsService';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useSearchClientsQuery(searchTerm: string, perPage = 20) {
  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['clients', 'search', searchTerm],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) =>
        clientsService.getBySearchTerm({
          searchTerm,
          page: pageParam,
          perPage,
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

  const clients = data?.pages.flatMap((page) => page.data);

  return {
    findedClients: clients ?? [],
    isLoading: isFetching,
    nextPage: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
