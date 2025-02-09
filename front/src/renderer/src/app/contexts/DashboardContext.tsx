import { createContext, useCallback, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { localStorageKeys } from '../config/localStorageKeys';

export interface DashboardContextType {
  selectedDateRange: DateRange;
  selectedOptionRange: string;
  handleSelectedOptionRange(value: string): void;
  handleSelectedDateRange(value: DateRange): void;
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

  const getBiweeklyRange = (): DateRange => {
    const today = new Date();
    const from = new Date(today);
    from.setDate(today.getDate() - 14); // Duas semanas atrás
    return { from, to: today };
  };

  const getMonthlyRange = (): DateRange => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return { from: firstDay, to: lastDay };
  };

  const getDefaultRange = (): DateRange => {
    return DEFAULT_OPTION === 'BIWEEKLY'
      ? getBiweeklyRange()
      : getMonthlyRange();
  };

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

    setDashboardState(newRange);
  }, []);

  const handleSelectedDateRange = useCallback(
    (value: DateRange) => {
      setSelectedDateRange(value);


      if (value.to) {
        setDashboardState(value);
      } else {
        setDashboardState(getDefaultRange());
        setSelectedOptionRange(!value.to ? DEFAULT_OPTION : '');
      }
    },
    [selectedOptionRange],
  );

  useEffect(() => {
    const storageDateRange = getDashboardState();

    if (!storageDateRange || !storageDateRange.to) {
      setDashboardState(getDefaultRange());
    }
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        selectedDateRange,
        selectedOptionRange,
        handleSelectedDateRange,
        handleSelectedOptionRange,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function setDashboardState(newState: DateRange) {
  localStorage.setItem(
    localStorageKeys.DASHBOARD_DATE_RANGE,
    JSON.stringify(newState),
  );
}

export function getDashboardState(): DateRange | null {
  const storageDateRange = localStorage.getItem(
    localStorageKeys.DASHBOARD_DATE_RANGE,
  );

  return storageDateRange && JSON.parse(storageDateRange);
}
