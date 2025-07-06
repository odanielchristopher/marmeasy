import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import toast from 'react-hot-toast';

import { IOrder } from '@app/entities/Order';
import { useOrders } from '@app/hooks/orders/useOrders';
import { useRemoveOrder } from '@app/hooks/orders/useRemoveOrder';

export function useOrdersSessionController(customerId: string) {
  const [renderOrder, setRenderOrder] = useState<'asc' | 'desc'>('desc');
  const [dateRange, setDateRange] = useState<
    { from?: string; to?: string } | undefined
  >();
  const [isRemoveOrderModalOpen, setIsRemoveOrderModalOpen] = useState(false);

  const { infiniteScroll, isLoading, orders } = useOrders({
    customerId,
    order: renderOrder,
    dateRange,
  });
  const [orderBeingRemoved, setOrderBeingRemoved] = useState<IOrder | null>(
    null,
  );
  const { removeOrder, isLoading: isRemoving } = useRemoveOrder();

  function handleRenderOrder(value: 'asc' | 'desc') {
    setRenderOrder(value);
  }

  function handleDateRange(value: DateRange | undefined) {
    if (!value?.from && !value?.to) {
      setDateRange(undefined);
      return;
    }

    if (value?.from && !value?.to) {
      return;
    }

    setDateRange({
      from: value?.from?.toISOString(),
      to: value?.to?.toISOString(),
    });
  }

  function handleOpenRemoveOrderModal(order: IOrder) {
    setOrderBeingRemoved(order);
    setIsRemoveOrderModalOpen(true);
  }

  function handleCloseRemoveOrderModal() {
    setIsRemoveOrderModalOpen(false);
    setOrderBeingRemoved(null);
  }

  async function handleConfirmRemoveOrder() {
    try {
      await removeOrder(orderBeingRemoved?.id!);

      toast.success('Pedido excluído com sucesso!');
      handleCloseRemoveOrderModal();
    } catch {
      toast.error('Ocorreu um erro ao excluir o pedido!');
    }
  }

  const hasOrders = orders.length > 0;

  return {
    infiniteScroll,
    isLoading,
    orders,
    renderOrder,
    hasOrders,
    isRemoving,
    isRemoveOrderModalOpen,
    handleRenderOrder,
    handleDateRange,
    handleOpenRemoveOrderModal,
    handleCloseRemoveOrderModal,
    handleConfirmRemoveOrder,
  };
}
