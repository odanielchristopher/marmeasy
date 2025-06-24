import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { useOrders } from '@app/hooks/orders/useOrders';

export function useOrdersSessionController(customerId: string) {
  const [renderOrder, setRenderOrder] = useState<'asc' | 'desc'>('desc');
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>(
    {},
  );

  const { infiniteScroll, isLoading, orders } = useOrders({
    customerId,
    order: renderOrder,
    dateRange,
  });

  function handleRenderOrder(value: 'asc' | 'desc') {
    setRenderOrder(value);
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
    renderOrder,
    hasOrders,
    handleRenderOrder,
    handleDateRange,
  };
}
