import { productsService } from '@renderer/app/services/productsService';
import { useQuery } from '@tanstack/react-query';

export function useProductsQuery() {
  const { data, isLoading } = useQuery({
    queryKey: ['products', 'getAll'],
    queryFn: async () => productsService.getAll(),
    staleTime: 60000,
  });

  return {
    products: data ?? [],
    isLoading,
  };
}
