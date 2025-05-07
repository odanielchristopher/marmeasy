import { useState } from 'react';

import { ILoadCustomers } from '@app/types/ILoadCustomers';

interface IUseCustomersController {
  loadCustomers: ILoadCustomers;
}

export function useCustomersController({
  loadCustomers: useCustomers,
}: IUseCustomersController) {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const { customers, isLoading, pagination } = useCustomers();

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
    pagination,
  };
}
