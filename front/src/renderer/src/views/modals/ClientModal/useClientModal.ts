import { queryClient } from '@renderer/App';
import { Client } from '@renderer/app/entities/Client';
import { clientsService } from '@renderer/app/services/clientsService';
import { CreateClientParams } from '@renderer/app/services/clientsService/create';
import toast from '@renderer/app/utils/toast';
import { ClientFormData } from '@renderer/views/pages/Clients/components/ClientForm/useClientForm';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export default function useClientModal(
  isOpen: boolean,
  closeModal: () => void,
) {
  const { mutateAsync: createClient, isPending: isLoading } = useMutation({
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

  useEffect(() => {
  }, [isOpen]);

  async function handleSubmit(data: ClientFormData) {
    const { name, balance, address, cpf, phone } = data;

    try {
      await createClient({
        name,
        address: address || undefined,
        phone: phone || undefined,
        type: 'FISICO',
        document: cpf || undefined,
        initalBalance: Number(balance),
      });

      toast({
        type: 'success',
        text: 'Cliente cadastrado com sucesso.',
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
