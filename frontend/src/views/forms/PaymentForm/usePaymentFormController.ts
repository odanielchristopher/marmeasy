import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useCustomers } from '@app/hooks/customers/useCustomers';
import { useDebounce } from '@app/hooks/useDebounce';

import { PaymentFormData, paymentSchema } from './schema';

interface IUseCustomerFormController {
  defaultValues?: PaymentFormData;
  onSubmit(formData: PaymentFormData): Promise<void> | void;
}

export function usePaymentFormController({
  defaultValues,
  onSubmit,
}: IUseCustomerFormController) {
  const form = useForm<PaymentFormData>({
    defaultValues: {
      customerId: defaultValues?.customerId ?? '',
      description: defaultValues?.description ?? '',
      type: defaultValues?.type,
      date: defaultValues?.date ?? new Date(),
    },
    resolver: zodResolver(paymentSchema),
  });
  const [searchCustomerTerm, setSearchCustomerTerm] = useState('');
  const debouncedValue = useDebounce(searchCustomerTerm);
  const { customers, isLoading: isLoadingCustomers } = useCustomers({
    perPage: 10,
    search: debouncedValue,
  });

  function handleSearchCustomerTerm(search: string) {
    setSearchCustomerTerm(search);
  }

  const handleSubmit = form.handleSubmit(async (formData) => {
    await onSubmit(formData);
  });

  return {
    form,
    customers,
    isLoadingCustomers,
    handleSearchCustomerTerm,
    handleSubmit,
  };
}
