import { queryClient } from '@renderer/App';
import { Client } from '@renderer/app/entities/Client';
import { useClientsQuery } from '@renderer/app/hooks/queries/useClientsQuery';
import { clientsService } from '@renderer/app/services/clientsService';
import { RemoveClientParams } from '@renderer/app/services/clientsService/remove';
import toast from '@renderer/app/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';

export default function useClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    from: undefined,
  });

  const [isDeleteClientModalVisible, setIsDeleteClientModalVisible] =
    useState(false);
  const [clientBeingDeleted, setClientBeingDeleted] = useState<Client | null>(
    null,
  );

  function handleDeleteClient(client: Client) {
    setClientBeingDeleted(client);
    setIsDeleteClientModalVisible(true);
  }

  function handleCloseDeleteClientModal() {
    setIsDeleteClientModalVisible(false);
  }

  async function handleOnConfirmDeleteClient() {
    try {
      await deleteClient({ id: clientBeingDeleted!.id });

      toast({
        type: 'success',
        text:
          clientBeingDeleted?.type === 'FISICO'
            ? 'Cliente removido'
            : 'Empresa removida',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao tentar remover o cliente.',
      });
    }
  }

  const { mutateAsync: deleteClient } = useMutation({
    mutationFn: async (data: RemoveClientParams) => {
      return clientsService.remove(data);
    },
    onSuccess: () => {
      queryClient.setQueryData(
        ['clients', 'getAll'],
        (oldClients: Client[]) => {
          return oldClients.filter(
            (client) => client.id !== clientBeingDeleted!.id,
          );
        },
      );
    },
  });

  const { clients, isLoading } = useClientsQuery();

  function handleChangeSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  const filteredClients = useMemo(
    () =>
      clients
        .filter((contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)),
    [clients, searchTerm],
  );

  const handleSelectedDateRange = useCallback((date: DateRange) => {
    setSelectedDateRange(date);
  }, []);

  const isSearchEmpty = filteredClients.length < 1;
  const hasClient = filteredClients.length > 0;

  return {
    isDeleteClientModalVisible,
    isLoading,
    selectedDateRange,
    isSearchEmpty,
    hasClient,
    searchTerm,
    filteredClients,
    clientBeingDeleted,
    handleSelectedDateRange,
    handleChangeSearchTerm,
    handleCloseDeleteClientModal,
    handleDeleteClient,
    handleOnConfirmDeleteClient,
  };
}
