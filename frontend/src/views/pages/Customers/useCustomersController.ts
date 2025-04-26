import { useState } from 'react';

import { ICustomer } from '@app/entities/Customer';

type LoadCustomersResponse = { customers: ICustomer[]; isLoading: boolean };

interface IUseCustomersController {
  loadCustomers(): LoadCustomersResponse;
}

export function useCustomersController({
  loadCustomers: useCustomers,
}: IUseCustomersController) {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const { customers, isLoading } = useCustomers();

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isLoading,
    customers,
  };
}
