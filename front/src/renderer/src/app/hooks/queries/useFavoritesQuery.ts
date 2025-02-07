import { favoritesService } from '@renderer/app/services/dashboard/favoritesService';

import { useQuery } from '@tanstack/react-query';

export function useFavoritesQuery() {
  const { data, isLoading } = useQuery({
    queryKey: ['favorites', 'getAll'],
    queryFn: async () => favoritesService.getAll(),
    staleTime: 30000,
  });

  return {
    favorites: data ?? [],
    isLoading,
  };
}
