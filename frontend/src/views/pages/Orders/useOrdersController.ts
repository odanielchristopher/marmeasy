/* eslint-disable consistent-return */
import { useState } from 'react';
import toast from 'react-hot-toast';

import { IOrder } from '@app/entities/Order';
import { useOrders } from '@app/hooks/orders/useOrders';
import { useRemoveOrder } from '@app/hooks/orders/useRemoveOrder';

import { OrderFilters } from './components/FiltersModal';

type CustomerType = {
  value: 'ALL' | 'INDIVIDUAL' | 'BUSINESS';
  label: 'Todos os clientes' | 'Clientes físicos' | 'Clientes jurídicos';
};

export function useOrdersController() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isRemoveOrderModalOpen, setIsRemoveOrderModalOpen] = useState(false);
  const [filters, serFilters] = useState<{
    order: 'asc' | 'desc';
    dateRange?: { from?: string; to?: string };
  }>();

  const [customerType, setCustomerType] = useState<CustomerType>({
    value: 'ALL',
    label: 'Todos os clientes',
  });

  const [searchOrderTerm, setSearchOrderTerm] = useState('');

  const { orders, isLoading, infiniteScroll } = useOrders({
    search: searchOrderTerm,
    customerType: customerType.value !== 'ALL' ? customerType.value : undefined,
    order: filters?.order,
    dateRange: filters?.dateRange,
  });
  const [orderBeingRemoved, setOrderBeingRemoved] = useState<IOrder | null>(
    null,
  );
  const { removeOrder, isLoading: isRemoving } = useRemoveOrder();

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleOpenRemoveOrderModal(order: IOrder) {
    setOrderBeingRemoved(order);
    setIsRemoveOrderModalOpen(true);
  }

  function handleCloseRemoveOrderModal() {
    setIsRemoveOrderModalOpen(false);
    setOrderBeingRemoved(null);
  }

  function handleSearchTerm(searchTerm: string) {
    setSearchOrderTerm(searchTerm);
  }

  function handleCustomerType(value: CustomerType) {
    setCustomerType(value);
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

  function handleApplyFilters(value: OrderFilters) {
    const { order, dateRange } = value;

    serFilters({
      order,
      dateRange: {
        from: dateRange?.from?.toISOString(),
        to: dateRange?.to?.toISOString(),
      },
    });
  }

  const hasOrders = orders.length > 0;

  return {
    isFiltersModalOpen,
    searchOrderTerm,
    isLoading,
    orders,
    hasOrders,
    customerType,
    infiniteScroll,
    isRemoving,
    isRemoveOrderModalOpen,
    handleApplyFilters,
    handleCustomerType,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleSearchTerm,
    handleOpenRemoveOrderModal,
    handleCloseRemoveOrderModal,
    handleConfirmRemoveOrder,
  };
}
