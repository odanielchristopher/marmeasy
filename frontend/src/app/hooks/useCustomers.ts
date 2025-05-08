import { useInfiniteQuery } from '@tanstack/react-query';

import { customersService } from '@app/services/customersService';

export function useCustomers(perPage = 24) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['customers'],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => customersService.getAll(pageParam, perPage),
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        const totalPages = Math.ceil(lastPage.items / perPage);
        const isLastPage = allPages.length >= totalPages;

        if (isLastPage) return null;

        return lastPageParam + 1;
      },
    });

  const customers = data?.pages.flatMap((page) => page.data);

  return {
    customers: customers ?? [],
    isLoading,
    nextPage: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
