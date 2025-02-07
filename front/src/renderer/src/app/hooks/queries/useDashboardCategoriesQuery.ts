import { useQuery } from '@tanstack/react-query';

import { dashboardCategoriesService } from '@renderer/app/services/dashboard/dashboardCategoriesService';

export function useDashboardCategoriesQuery() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboardCategories', 'getAll'],
    queryFn: async () => dashboardCategoriesService.getAll(),
    staleTime: 30000,
  });

  return {
    categories: data ?? { expenses: [], incomes: [] },
    isLoading,
  };
}
