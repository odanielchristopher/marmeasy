import { useQueryClient } from '@tanstack/react-query';
import { createContext, useCallback, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { localStorageKeys } from '../config/localStorageKeys';

export interface DashboardContextType {
  DEFAULT_OPTION: OptionPeriodType;
  selectedDateRange: DateRange;
  selectedOptionRange: string;
  setSelectedOptionRange: React.Dispatch<
    React.SetStateAction<OptionPeriodType>
  >;
  setSelectedDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
  setDashboardStateWithInvalidation(newState: DateRange): void;
  setDashboardState(newState: DateRange): void;
}

export const DashboardContext = createContext<DashboardContextType>(
  {} as DashboardContextType,
);

export type OptionPeriodType = 'BIWEEKLY' | 'MONTHLY' | '';

const DEFAULT_OPTION: OptionPeriodType = 'BIWEEKLY';

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    from: undefined,
  });

  const [selectedOptionRange, setSelectedOptionRange] =
    useState<OptionPeriodType>(DEFAULT_OPTION);

  const queryClient = useQueryClient();

  const setDashboardState = useCallback((newState: DateRange) => {
    localStorage.setItem(
      localStorageKeys.DASHBOARD_DATE_RANGE,
      JSON.stringify(newState),
    );
  }, []);

  const setDashboardStateWithInvalidation = useCallback(
    (newState: DateRange) => {
      setDashboardState(newState);

      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
        refetchType: 'active',
      });
    },
    [setDashboardState],
  );

  return (
    <DashboardContext.Provider
      value={{
        DEFAULT_OPTION,
        selectedDateRange,
        selectedOptionRange,
        setSelectedDateRange,
        setSelectedOptionRange,
        setDashboardStateWithInvalidation,
        setDashboardState,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function getDashboardState(): DateRange | null {
  const storageDateRange = localStorage.getItem(
    localStorageKeys.DASHBOARD_DATE_RANGE,
  );

  return storageDateRange && JSON.parse(storageDateRange);
}
