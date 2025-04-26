import { useState } from 'react';

import { ICustomer } from '@app/entities/Customer';

const customers: ICustomer[] = [
  {
    id: '1',
    name: 'daniel',
    type: 'INDIVIDUAL',
    color: '#BE4BDB',
    balance: 17.5,
  },
  {
    id: '12',
    name: 'oficina',
    type: 'BUSINESS',
    color: '#FAB005',
    balance: -123.5,
  },
  {
    id: '123',
    name: 'plataforma',
    type: 'BUSINESS',
    color: '#4C6EF5',
    balance: 236.5,
  },
  {
    id: '1234',
    name: 'lucas',
    type: 'INDIVIDUAL',
    color: '#82C91E',
    balance: 40,
  },
];

export function useCustomerController() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

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
    customers,
  };
}
