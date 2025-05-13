import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { IPaginatedResponse } from '@app/types/IPaginatedResponse';

interface IUseInfiniteScrollParams<TResponse> {
  queryKey: QueryKey;
  infiniteLoader: (params: {
    page: number;
    perPage: number;
  }) => Promise<IPaginatedResponse<TResponse>>;
  perPage: number;
  enabled?: boolean;
}

export function useInfiniteScroll<TResponse>({
  queryKey,
  perPage,
  enabled,
  infiniteLoader,
}: IUseInfiniteScrollParams<TResponse>) {
  return useInfiniteQuery({
    queryKey,
    staleTime: Infinity,
    initialPageParam: 1,
    enabled,
    queryFn: ({ pageParam }) => infiniteLoader({ page: pageParam, perPage }),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalPages = Math.ceil(lastPage.items / perPage);
      const isLastPage = allPages.length >= totalPages;

      if (isLastPage) return null;

      return lastPageParam + 1;
    },
  });
}
