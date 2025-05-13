import toast from 'react-hot-toast';

import { ICreateCustomerParams } from '@app/services/customersService/create';
import { CustomerFormData } from '@views/forms/CustomerForm/useCustomerFormController';

interface IUseNewCustomerModalControllerProps<TResponse> {
  createCustomerHook: () => {
    createCustomer: (params: ICreateCustomerParams) => Promise<TResponse>;
    isLoading: boolean;
  };
  onSuccess(): void;
}

export function useNewCustomerModalController<T>({
  createCustomerHook: useCreateCustomer,
  onSuccess,
}: IUseNewCustomerModalControllerProps<T>) {
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
