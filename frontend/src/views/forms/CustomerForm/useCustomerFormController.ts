import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { CustomerFormData, customerSchema } from './schema';

interface IUseCustomerFormControllerProps {
  defaultValues?: CustomerFormData;
  onSubmit(formData: CustomerFormData): Promise<void> | void;
}

export function useCustomerFormController({
  defaultValues,
  onSubmit,
}: IUseCustomerFormControllerProps) {
  const form = useForm<CustomerFormData>({
    defaultValues: {
      name: defaultValues?.name ?? '',
      color: defaultValues?.color ?? '',
      type: defaultValues?.type ?? undefined,
      phone: defaultValues?.phone ?? '',
    },
    resolver: zodResolver(customerSchema),
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    await onSubmit(formData);
  });

  return {
    form,
    handleSubmit,
  };
}
