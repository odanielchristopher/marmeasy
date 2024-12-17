import { queryClient } from '@renderer/App';
import { Client } from '@renderer/app/entities/Client';
import { clientsService } from '@renderer/app/services/clientsService';
import { RemoveClientParams } from '@renderer/app/services/clientsService/remove';
import toast from '@renderer/app/utils/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

export default function useClient() {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [isDeleteClientModalVisible, setIsDeleteClientModalVisible] = useState(false);
  const [clientBeingDeleted, setClientBeingDeleted] = useState<Client | null>(null);

  function handleDeleteClient(client: Client) {
    setClientBeingDeleted(client);
    setIsDeleteClientModalVisible(true);
  }

  function handleCloseDeleteClientModal() {
    setIsDeleteClientModalVisible(false);
  }

  async function handleOnConfirmDeleteClient() {
    try {
      await deleteClient({id: clientBeingDeleted!.id});

      toast({
        type: 'success',
        text: 'Cliente removido.',
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
      queryClient.refetchQueries({
        queryKey: ['clients', 'getAll'],
        type: 'active',
        exact: true,
      });
    },
  });


  const { data, isFetching } = useQuery({
    queryKey: ['clients', 'getAll'],
    queryFn: async () => {
      return await clientsService.getAll();
    },
    staleTime: 10000,
  });

  function loadClient() {
    setClients(data ?? []);
  }

  // @ts-ignore
  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  const filteredClients = useMemo(
    () =>
      clients.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [clients, searchTerm],
  );

  const isSearchEmpty = filteredClients.length < 1;
  const hasClient = filteredClients.length > 0;

  useEffect(() => {
    loadClient();
  }, [data]);

  return {
    isDeleteClientModalVisible,
    isFetching,
    isSearchEmpty,
    hasClient,
    searchTerm,
    filteredClients,
    handleChangeSearchTerm,
    handleCloseDeleteClientModal,
    handleDeleteClient,
    handleOnConfirmDeleteClient,
  };
}
