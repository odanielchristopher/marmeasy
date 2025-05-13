/* eslint-disable consistent-return */
import { useEffect, useRef, useState } from 'react';

import { useDebounce } from '@app/hooks/useDebounce';
import { CustomersLoaderFn } from '@app/types/CustomersLoaderFn';

interface IUseCustomersController {
  loadCustomers: CustomersLoaderFn;
}

export function useCustomersController({
  loadCustomers: useCustomers,
}: IUseCustomersController) {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const [searchCustomerTerm, setSearchCustomerTerm] = useState('');
  const deboundedTerm = useDebounce(searchCustomerTerm);

  const { customers, isLoading, infiniteScroll } = useCustomers({
    search: deboundedTerm,
  });

  const spinnerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!spinnerRef.current || !infiniteScroll) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        const { isIntersecting } = entries[0];

        if (!infiniteScroll.hasNextPage) {
          obs.disconnect();
          return;
        }

        if (isIntersecting && !infiniteScroll.isFetchingNextPage) {
          infiniteScroll.nextPage();
        }
      },
      {
        root: null,
        rootMargin: '40%',
      },
    );

    observer.observe(spinnerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoading, infiniteScroll]);

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleSearchCustomerTerm(searchTerm: string) {
    setSearchCustomerTerm(searchTerm);
  }

  const hasCustomers = customers.length > 0;

  return {
    isFiltersModalOpen,
    hasCustomers,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleSearchCustomerTerm,
    searchCustomerTerm,
    hasNextPage: infiniteScroll?.hasNextPage,
    spinnerRef,
    isLoading,
    isFetchingNextPage: infiniteScroll?.isFetchingNextPage,
    customers,
  };
}
