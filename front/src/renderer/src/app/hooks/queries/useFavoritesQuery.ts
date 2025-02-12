import { favoritesService } from '@renderer/app/services/dashboard/favoritesService';

import { useQuery } from '@tanstack/react-query';

export function useFavoritesQuery() {
  const { data, isFetching } = useQuery({
    queryKey: ['dashboard', 'favorites', 'getAll'],
    queryFn: async () => favoritesService.getAll(),
  });

  return {
    favorites: data ?? [],
    isLoading: isFetching,
  };
}
