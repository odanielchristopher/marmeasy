import { useQuery } from '@tanstack/react-query';

import { paymentsService } from '@renderer/app/services/paymentsService';
import { GetAllPaymentsParams } from '@renderer/app/services/paymentsService/getAll';

export function usePaymentsQuery(params: GetAllPaymentsParams) {
  const { data, isLoading } = useQuery({
    queryKey: ['payments', 'getAll'],
    queryFn: async () => paymentsService.getAll(params),
  });

  return {
    payments: data ?? [],
    isLoading,
  };
}
