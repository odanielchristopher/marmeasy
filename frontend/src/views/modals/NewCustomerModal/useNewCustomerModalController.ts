import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ICustomer } from '@app/entities/Customer';
import { ICustomersService } from '@app/services/@types/ICustomersService';
import { CustomerFormData } from '@views/forms/CustomerForm/useCustomerFormController';

interface IUseNewCustomerModalControllerProps {
  customersService: ICustomersService;
  onSuccess(): void;
}

export function useNewCustomerModalController({
  customersService,
  onSuccess,
}: IUseNewCustomerModalControllerProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: createCustomer, isPending } = useMutation({
    mutationFn: customersService.create,
    onSuccess: (newCustomer) => {
      queryClient.setQueryData(
        ['customers'],
        (currentCustomers: ICustomer[]) => [...currentCustomers, newCustomer],
      );
    },
  });

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
    isLoading: isPending,
    handleSubmit,
  };
}
