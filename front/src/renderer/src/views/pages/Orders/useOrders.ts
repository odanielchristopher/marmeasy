import { useOrdersQuery } from '@renderer/app/hooks/queries/useOrdersQuery';
import { useSearchOrdersQuery } from '@renderer/app/hooks/queries/useSearchOrdersQuery';
import { useDebounce } from '@renderer/app/hooks/useDebounce';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';

export default function useOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm, 400);

  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    from: undefined,
  });

  const [selectedPeriod, setSelectedPeriod] = useState<{
    from?: string;
    to?: string;
  }>();

  const {
    orders: normalOrders,
    isLoading: isOrdersLoading,
    nextPage: nextNormalPage,
    hasNextPage: hasNextNormalPage,
    isFetchingNextPage: isFetchingNextNormalPage,
  } = useOrdersQuery({
    from: selectedPeriod?.from,
    to: selectedPeriod?.to,
  });

  const {
    findedOrders: searchedOrders,
    isLoading: isSearchLoading,
    nextPage: nextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
  } = useSearchOrdersQuery(debouncedValue, 20, selectedPeriod);

  const ordersToRender = debouncedValue ? searchedOrders : normalOrders;

  const hasNextPage = debouncedValue ? hasNextSearchPage : hasNextNormalPage;
  const nextPage = debouncedValue ? nextSearchPage : nextNormalPage;
  const isFetchingNextPage = debouncedValue
    ? isFetchingNextSearchPage
    : isFetchingNextNormalPage;

  const finalPageLoaderRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!finalPageLoaderRef.current) return;

    const observer = new IntersectionObserver((entries, obs) => {
      const { isIntersecting } = entries[0];

      if (!hasNextPage) {
        obs.disconnect();
        return;
      }

      if (isIntersecting && hasNextPage) {
        nextPage();
      }
    });

    observer.observe(finalPageLoaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, nextPage]);

  function handleChangeSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  const isLoading = isSearchLoading || isOrdersLoading;
  const isSearchEmpty = ordersToRender.length < 1 && isLoading;
  const hasOrders = ordersToRender.length > 0;

  const handleSelectedDateRange = useCallback((date: DateRange) => {
    setSelectedDateRange(date);

    if (date.from && !date.to) {
      setSelectedPeriod({
        from: date.from?.toISOString(),
        to: date.from?.toISOString(),
      });
      return;
    }

    setSelectedPeriod({
      from: date.from?.toISOString(),
      to: date.to?.toISOString(),
    });
  }, []);

  return {
    isLoading,
    isSearchEmpty,
    hasOrders,
    searchTerm,
    ordersToRender,
    finalPageLoaderRef,
    handleChangeSearchTerm,
    isFetchingNextPage,
    selectedDateRange,
    handleSelectedDateRange,
  };
}
