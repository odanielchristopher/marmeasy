import { DashboardContext } from '@renderer/app/contexts/DashboardContext';
import { useDashboarGraphQuery } from '@renderer/app/hooks/queries/useDashboarGraphQuery';
import { useContext } from 'react';

export default function useDashboard() {
  const {
    selectedDateRange,
    selectedOptionRange,
    handleSelectedDateRange,
    handleSelectedOptionRange,
  } = useContext(DashboardContext);

  const { labels, expenses, incomes, isLoading } = useDashboarGraphQuery();

  return {
    labels,
    expenses,
    incomes,
    isLoading,
    selectedDateRange,
    selectedOptionRange,
    handleSelectedDateRange,
    handleSelectedOptionRange,
  };
}
