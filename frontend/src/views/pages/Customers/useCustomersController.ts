/* eslint-disable consistent-return */
import { useState } from 'react';

import { CustomersLoaderFn } from '@app/types/CustomersLoaderFn';

interface IUseCustomersController {
  loadCustomers: CustomersLoaderFn;
}

export function useCustomersController({
  loadCustomers: useCustomers,
}: IUseCustomersController) {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const [searchCustomerTerm, setSearchCustomerTerm] = useState('');

  const { customers, isLoading, infiniteScroll } = useCustomers({
    search: searchCustomerTerm,
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

  return {
    customers,
    isLoading,
    hasCustomers,
    infiniteScroll,
    isFiltersModalOpen,
    searchCustomerTerm,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleSearchCustomerTerm,
  };
}
