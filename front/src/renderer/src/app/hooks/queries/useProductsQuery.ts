import { productsService } from '@renderer/app/services/productsService';
import { GetAllParams } from '@renderer/app/services/productsService/getAll';
import { useQuery } from '@tanstack/react-query';

export function useProductsQuery(query?: GetAllParams) {
  const { data, isLoading } = useQuery({
    queryKey: ['products', 'getAll'],
    queryFn: async () => productsService.getAll(query),
    staleTime: 60000,
  });

  return {
    products: data ?? [],
    isLoading,
  };
}
