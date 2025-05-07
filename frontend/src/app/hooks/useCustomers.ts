import { useQuery } from '@tanstack/react-query';

import { customersService } from '@app/services/customersService';

import { usePagination } from './usePagination';

export function useCustomers(perPage = 1) {
  const pagination = usePagination(perPage);

  const { data, isFetching } = useQuery({
    queryKey: ['customers', { currentPage: pagination.currentPage, perPage }],
    staleTime: Infinity,
    queryFn: async () => {
      const response = await customersService.getAll(
        pagination.currentPage,
        perPage,
      );

      pagination.setTotalItems(response.items);

      return response;
    },
  });

  return {
    customers: data ?? { data: [], items: 0 },
    isLoading: isFetching,
    pagination,
  };
}
