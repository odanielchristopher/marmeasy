import { useQuery } from '@tanstack/react-query';

import { dashboardGraphService } from '@renderer/app/services/dashboard/graphService';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function useDashboarGraphQuery() {
  const { data, isFetching } = useQuery({
    queryKey: ['dashboard', 'dashboardGraph', 'getAll'],
    queryFn: async () => dashboardGraphService.getAll(),
  });

  const dataMap = new Map<string, { date: Date; income: number; expense: number }>();

  data?.incomes.forEach((income) => {
    const date = parseISO(income.date);
    const dateKey = format(date, 'yyyy-MM-dd');
    const current = dataMap.get(dateKey) || { date, income: 0, expense: 0 };

    dataMap.set(dateKey, { ...current, income: current.income + income.value });
  });

  data?.expenses.forEach((expense) => {
    const date = parseISO(expense.date);
    const dateKey = format(date, 'yyyy-MM-dd');
    const current = dataMap.get(dateKey) || { date, income: 0, expense: 0 };

    dataMap.set(dateKey, { ...current, expense: current.expense + expense.value });
  });

  const sortedEntries = Array.from(dataMap.values()).sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );

  const labels = sortedEntries.map(({ date }) => format(date, 'd MMM', { locale: ptBR }));
  const incomes = sortedEntries.map(({ income }) => income);
  const expenses = sortedEntries.map(({ expense }) => expense);

  return {
    isLoading: isFetching,
    labels: labels || [],
    incomes: incomes || [],
    expenses: expenses || [],
  };
}
