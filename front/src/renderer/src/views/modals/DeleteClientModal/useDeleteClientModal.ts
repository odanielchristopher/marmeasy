import { queryClient } from '@renderer/App';
import { Client } from '@renderer/app/entities/Client';
import { clientsService } from '@renderer/app/services/clientsService';
import { RemoveClientParams } from '@renderer/app/services/clientsService/remove';
import toast from '@renderer/app/utils/toast';
import { useMutation } from '@tanstack/react-query';

interface UseDeleteClientModal {
  onSuccess(): void;
  client: Client | null;
}

export default function useDeleteClientModal({
  onSuccess,
  client: clientBeingDeleted,
}: UseDeleteClientModal) {
  const { mutateAsync: deleteClient, isPending: isLoading } = useMutation({
    mutationFn: async (data: RemoveClientParams) => {
      return clientsService.remove(data);
    },
    onSuccess: () => {
      queryClient.setQueryData(
        ['clients', 'getAll'],
        (oldClients: Client[]) => {
          return oldClients.filter((client) => client.id !== clientBeingDeleted!.id);
        },
      );
    },
  });

  async function handleDeleteClient() {
    try {
      await deleteClient({ id: clientBeingDeleted!.id });

      toast({
        type: 'success',
        text:
          clientBeingDeleted?.type === 'FISICO'
            ? 'Cliente removido'
            : 'Empresa removida',
      });
      onSuccess();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao tentar remover o cliente.',
      });
    }
  }

  return {
    isLoading,
    handleDeleteClient,
  };
}
