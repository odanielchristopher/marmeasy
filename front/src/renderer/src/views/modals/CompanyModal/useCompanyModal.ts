import { queryClient } from '@renderer/App';
import { Client } from '@renderer/app/entities/Client';
import { clientsService } from '@renderer/app/services/clientsService';
import { CreateClientParams } from '@renderer/app/services/clientsService/create';
import toast from '@renderer/app/utils/toast';
import { ClientFormData } from '@renderer/views/pages/Clients/components/ClientForm/useClientForm';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function useCompanyModal(closeModal: () => void) {
  const { mutateAsync: createCompany, isPending: isLoading } = useMutation({
    mutationFn: async (data: CreateClientParams) =>
      clientsService.create({
        ...data,
      }),
    onSuccess: (newData) => {
      queryClient.setQueryData(['clients', 'getAll'], (oldData: Client[]) => [
        ...oldData,
        newData,
      ]);
    },
  });

  async function handleSubmit(data: ClientFormData) {
    const { name, address, balance, cnpj, phone } = data;

    try {
      await createCompany({
        name,
        type: 'JURIDICO',
        address: address || undefined,
        document: cnpj || undefined,
        phone: phone || undefined,
        initialBalance: balance || 0,
      });

      toast({
        type: 'success',
        text: 'Empresa cadastrada com sucesso',
      });
      closeModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          type: 'danger',
          text: error.response?.data.message,
        });

        return;
      }

      toast({
        type: 'danger',
        text: 'Ocorreu um erro cadastrar o cliente!',
      });
    }
  }

  return {
    isLoading,
    handleSubmit,
  };
}
