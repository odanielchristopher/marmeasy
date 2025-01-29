import { clientsService } from '@renderer/app/services/clientsService';
import { useQuery } from '@tanstack/react-query';

export function useClientsQuery(perPage = 10) {
  const { data, isLoading } = useQuery({
    queryKey: ['clients', 'getAll'],
    queryFn: async () => clientsService.getAll(1, perPage),
    staleTime: 60000 * 2,
  });

  return {
    clients: data?.data ?? [],
    isLoading,
  };
}
