/* eslint-disable consistent-return */
import { useState } from 'react';

import { useOrders } from '@app/hooks/orders/useOrders';

type CustomerType = {
  value: 'ALL' | 'INDIVIDUAL' | 'BUSINESS';
  label: 'Todos os clientes' | 'Clientes físicos' | 'Clientes jurídicos';
};

export function useOrdersController() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const [customerType, setCustomerType] = useState<CustomerType>({
    value: 'ALL',
    label: 'Todos os clientes',
  });

  const [searchOrderTerm, setSearchOrderTerm] = useState('');

  const { orders, isLoading, infiniteScroll } = useOrders({
    search: searchOrderTerm,
    customerType: customerType.value !== 'ALL' ? customerType.value : undefined,
  });

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleSearchTerm(searchTerm: string) {
    setSearchOrderTerm(searchTerm);
  }

  function handleCustomerType(value: CustomerType) {
    setCustomerType(value);
  }

  const hasOrders = orders.length > 0;

  return {
    isFiltersModalOpen,
    hasOrders,
    customerType,
    infiniteScroll,
    handleCustomerType,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleSearchTerm,
    searchOrderTerm,
    isLoading,
    orders,
  };
}
