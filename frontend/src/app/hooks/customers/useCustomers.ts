import { useQuery } from '@tanstack/react-query';

import { customersService } from '@app/services/customersService';
import {
  CustomersLoaderParams,
  CustomersLoaderResponse,
} from '@app/types/CustomersLoaderFn';

import { useInfiniteScroll } from '../useInfiniteScroll';

export function useCustomers({
  perPage = 24,
  search,
}: CustomersLoaderParams): CustomersLoaderResponse {
  const {
    data: infiniteData,
    isLoading: isLoadingInfiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteScroll({
    perPage,
    queryKey: ['customers', { perPage }],
    infiniteLoader: customersService.getAll,
    enabled: !search,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['customers', { search }],
    queryFn: () => customersService.getAllBySearch(search),
    enabled: !!search,
    staleTime: 30000,
  });

  const customers = search
    ? data
    : infiniteData?.pages.flatMap((page) => page.data);

  return {
    customers: customers ?? [],
    isLoading: search ? isLoading : isLoadingInfiniteData,
    infiniteScroll: search
      ? undefined
      : {
          nextPage: fetchNextPage,
          hasNextPage,
          isFetchingNextPage,
        },
  };
}
