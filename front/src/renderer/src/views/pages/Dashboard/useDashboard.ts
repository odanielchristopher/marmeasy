import {
  DashboardContext,
  OptionPeriodType,
} from '@renderer/app/contexts/DashboardContext';
import { useDashboarGraphQuery } from '@renderer/app/hooks/queries/useDashboarGraphQuery';
import { useCallback, useContext, useEffect } from 'react';
import { DateRange } from 'react-day-picker';

export default function useDashboard() {
  const {
    DEFAULT_OPTION,
    selectedDateRange,
    selectedOptionRange,
    setDashboardState,
    setSelectedDateRange,
    setSelectedOptionRange,
    setDashboardStateWithInvalidation,
  } = useContext(DashboardContext);

  function getBiweeklyRange(): DateRange {
    const today = new Date();
    const from = new Date(today);
    from.setDate(today.getDate() - 14); // Duas semanas atrás
    return { from, to: today };
  }

  function getMonthlyRange(): DateRange {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return { from: firstDay, to: lastDay };
  }

  function getDefaultRange(): DateRange {
    return DEFAULT_OPTION === 'BIWEEKLY'
      ? getBiweeklyRange()
      : getMonthlyRange();
  }

  const handleSelectedOptionRange = useCallback((value: OptionPeriodType) => {
    setSelectedOptionRange(value || DEFAULT_OPTION);

    let newRange: DateRange;
    if (value === 'BIWEEKLY') {
      newRange = getBiweeklyRange();
    } else if (value === 'MONTHLY') {
      newRange = getMonthlyRange();
    } else {
      newRange = getDefaultRange();
    }

    setSelectedDateRange({ from: undefined });
    setDashboardStateWithInvalidation(newRange);
  }, []);

  const handleSelectedDateRange = useCallback((value: DateRange) => {
    setSelectedDateRange(value);

    if (value.from && !value.to) {
      setDashboardStateWithInvalidation({ from: value.from, to: value.from });
      setSelectedOptionRange('');
      return;
    }

    if (!value.to) {
      setSelectedOptionRange(DEFAULT_OPTION);
      setDashboardStateWithInvalidation(getDefaultRange());
      return;
    }

    setDashboardStateWithInvalidation(value);
    setSelectedOptionRange('');
  }, []);

  useEffect(() => {
    setDashboardState(getDefaultRange());
  }, []);

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
