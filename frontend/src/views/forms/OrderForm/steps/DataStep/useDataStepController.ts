import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useDebounce } from '@app/hooks/useDebounce';
import { ILoadCustomers } from '@app/types/ILoadCustomers';

import { OrderFormData } from '../../useOrderFormController';

interface IUseDataStepControllerProps {
  loadCustomers: ILoadCustomers;
}

export function useDataStepController({
  loadCustomers: useCustomers,
}: IUseDataStepControllerProps) {
  const form = useFormContext<OrderFormData>();
  const [searchCustomerTerm, setSearchCustomerTerm] = useState('');
  const debouncedValue = useDebounce(searchCustomerTerm);
  const { customers, isLoading: isLoadingCustomers } = useCustomers(
    debouncedValue,
    6,
  );

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
