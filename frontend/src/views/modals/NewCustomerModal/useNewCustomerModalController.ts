import toast from 'react-hot-toast';

import { useCreateCustomer } from '@app/hooks/customers/useCreateCustomer';
import { CustomerFormData } from '@views/forms/CustomerForm/schema';

interface IUseNewCustomerModalController {
  onSuccess(): void;
}

export function useNewCustomerModalController({
  onSuccess,
}: IUseNewCustomerModalController) {
  const { createCustomer, isLoading } = useCreateCustomer();

  async function handleSubmit(formData: CustomerFormData) {
    try {
      await createCustomer({
        ...formData,
        phone: formData.phone || undefined,
        initialBalance: Number(formData.initialBalance),
      });
      onSuccess();
      toast.success('O cliente foi criado com sucesso!');
    } catch {
      toast.error('Ocorreu um erro ao cadastrar o novo cliente.');
    }
  }

  return {
    isLoading,
    handleSubmit,
  };
}
