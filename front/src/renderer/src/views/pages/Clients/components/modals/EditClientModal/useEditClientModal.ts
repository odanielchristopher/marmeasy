import { queryClient } from '@renderer/App';
import { Client } from '@renderer/app/entities/Client';
import { clientsService } from '@renderer/app/services/clientsService';
import { UpdateClientParams } from '@renderer/app/services/clientsService/update';
import toast from '@renderer/app/utils/toast';
import { ClientFormData } from '@renderer/views/pages/Clients/components/ClientForm/useClientForm';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseEditClientModalProps {
  onSuccess(): void;
  client: Client | null;
}

export default function useEditClientModal({
  onSuccess,
  client,
}: UseEditClientModalProps) {
  const { mutateAsync: updateClient, isPending: isLoading } = useMutation({
    mutationFn: async (data: UpdateClientParams) => clientsService.update(data),
    onSuccess: (updatedClient) => {
      queryClient.setQueryData(['clients', 'getAll'], (clients: Client[]) =>
        clients.map((client) =>
          client.id === updatedClient.id ? updatedClient : client,
        ),
      );
    },
  });

  async function handleSubmit(data: ClientFormData) {
    const { name, address, phone, cnpj, cpf, balance } = data;

    try {
      await updateClient({
        id: client!.id,
        type: client!.type,
        name,
        address: address || undefined,
        phone: phone || undefined,
        document:
          client!.type === 'FISICO' ? cpf || undefined : cnpj || undefined,
        balance,
      });

      toast({
        type: 'success',
        text: 'Cliente editado com sucesso.',
      });
      onSuccess();
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
