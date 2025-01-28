import { useQuery } from '@tanstack/react-query';

import { paymentsService } from '@renderer/app/services/paymentsService';
import { GetAllPaymentsParams } from '@renderer/app/services/paymentsService/getAll';

export function usePaymentsQuery(params: GetAllPaymentsParams) {
  const { data, isFetching: isLoading } = useQuery({
    queryKey: ['payments', 'getAll'],
    queryFn: async () => paymentsService.getAll(params),
    staleTime: 3 * 60 * 1000,
  });

  return {
    payments: data ?? [],
    isLoading,
  };
}
