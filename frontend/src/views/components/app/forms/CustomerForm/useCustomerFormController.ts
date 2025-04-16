import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const customerSchema = z.object({
  name: z.string().nonempty('O nome do cliente é obrigatório'),
  type: z.enum(['INDIVIDUAL', 'BUSINESS'], {
    message: 'O tipo do cliente é obrigatório',
  }),
  color: z.string().nonempty('Escolha uma cor para o cliente'),
  phone: z.string().or(z.number()).optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;

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
