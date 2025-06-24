import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { useOrders } from '@app/hooks/orders/useOrders';

export function useOrdersSessionController(customerId: string) {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>(
    {},
  );

  const { infiniteScroll, isLoading, orders } = useOrders({
    customerId,
    order,
    dateRange,
  });

  function handleRenderOrder(value: 'asc' | 'desc') {
    setOrder(value);
  }

  function handleDateRange(value: DateRange) {
    setDateRange({
      from: value.from?.toISOString(),
      to: value.to?.toISOString(),
    });
  }

  const hasOrders = orders.length > 0;

  return {
    infiniteScroll,
    isLoading,
    orders,
    hasOrders,
    handleRenderOrder,
    handleDateRange,
  };
}
