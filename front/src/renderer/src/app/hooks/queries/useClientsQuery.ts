import { clientsService } from '@renderer/app/services/clientsService';
import { useQuery } from '@tanstack/react-query';

export function useClientsQuery() {
  const { data, isLoading } = useQuery({
    queryKey: ['clients', 'getAll'],
    queryFn: async () => {
      return await clientsService.getAll();
    },
    staleTime: 60000 * 2,
  });

  return {
    clients: data ?? [],
    isLoading,
  };
}
