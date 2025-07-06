/* eslint-disable consistent-return */
import { useState } from 'react';

import { useCustomers } from '@app/hooks/customers/useCustomers';

import { CustomerFilters } from './components/FiltersModal';

export function useCustomersController() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const [searchCustomerTerm, setSearchCustomerTerm] = useState('');
  const [filters, setFilters] = useState<CustomerFilters>({
    customerType: 'ALL',
    order: 'asc',
  });

  const { customers, isLoading, infiniteScroll } = useCustomers({
    search: searchCustomerTerm,
    filters,
  });

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleSearchCustomerTerm({ searchTerm }: { searchTerm: string }) {
    setSearchCustomerTerm(searchTerm);
  }

  const hasCustomers = customers.length > 0;

  function handleApplyFilters(value: CustomerFilters) {
    setFilters(value);
  }

  return {
    customers,
    isLoading,
    hasCustomers,
    infiniteScroll,
    isFiltersModalOpen,
    searchCustomerTerm,
    handleApplyFilters,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleSearchCustomerTerm,
  };
}
