import { expensesService } from '@renderer/app/services/dashboard/expensesService';

import { useQuery } from '@tanstack/react-query';

export function useExpensesQuery() {
  const { data, isLoading } = useQuery({
    queryKey: ['expenses', 'getAll'],
    queryFn: async () => expensesService.getAll(),
    staleTime: 30000,
  });

  return {
    expenses: data ?? { total: 0, history: {} },
    isLoading,
  };
}
