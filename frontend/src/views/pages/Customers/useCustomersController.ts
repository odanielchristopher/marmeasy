/* eslint-disable consistent-return */
import { useEffect, useRef, useState } from 'react';

import { useDebounce } from '@app/hooks/useDebounce';
import { ILoadCustomers } from '@app/types/ILoadCustomers';

interface IUseCustomersController {
  loadCustomers: ILoadCustomers;
}

export function useCustomersController({
  loadCustomers: useCustomers,
}: IUseCustomersController) {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const [searchCustomerTerm, setSearchCustomerTerm] = useState('');
  const deboundedTerm = useDebounce(searchCustomerTerm);

  const { customers, isLoading, nextPage, hasNextPage, isFetchingNextPage } =
    useCustomers(deboundedTerm);

  const spinnerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!spinnerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        const { isIntersecting } = entries[0];

        if (!hasNextPage) {
          obs.disconnect();
          return;
        }

        if (isIntersecting && !isFetchingNextPage) {
          nextPage();
        }
      },
      {
        rootMargin: '20%',
      },
    );

    observer.observe(spinnerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoading, hasNextPage, isFetchingNextPage, nextPage]);

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleSearchCustomerTerm(searchTerm: string) {
    setSearchCustomerTerm(searchTerm);
  }

  return {
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleSearchCustomerTerm,
    searchCustomerTerm,
    hasNextPage,
    spinnerRef,
    isLoading,
    isFetchingNextPage,
    customers,
  };
}
