import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useDebounce } from '@app/hooks/useDebounce';
import { CustomersLoaderFn } from '@app/types/CustomersLoaderFn';

import { OrderFormData } from '../../useOrderFormController';

interface IUseDataStepControllerProps {
  loadCustomers: CustomersLoaderFn;
}

export function useDataStepController({
  loadCustomers: useCustomers,
}: IUseDataStepControllerProps) {
  const form = useFormContext<OrderFormData>();
  const [searchCustomerTerm, setSearchCustomerTerm] = useState('');
  const debouncedValue = useDebounce(searchCustomerTerm);
  const { customers, isLoading: isLoadingCustomers } = useCustomers({
    perPage: 10,
    search: debouncedValue,
  });

  function handleSearchCustomerTerm(search: string) {
    setSearchCustomerTerm(search);
  }

  return {
    form,
    customers,
    isLoadingCustomers,
    handleSearchCustomerTerm,
  };
}
