import { usersService } from '@renderer/app/services/usersService';
import { useQuery } from '@tanstack/react-query';

export default function useFindMeQuery(active: boolean) {
  return useQuery({
    queryKey: ['users', 'find-me'],
    queryFn: () => usersService.findMe(),
    staleTime: Infinity,
    enabled: active,
  });
}