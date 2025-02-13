import { Client } from '@renderer/app/entities/Client';
import { useClientsQuery } from '@renderer/app/hooks/queries/useClientsQuery';
import { useState } from 'react';

export default function useOrdersList() {
  const [clientsList, setClientsList] = useState<Client[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { clients } = useClientsQuery();

  const handleOrderClick = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  // useEffect(() => {
  //   const fetchClients = async () => {
  //     try {
  //       const response = await clientsService.getAll();
  //       setClientsList(response.data);
  //     } catch (error) {
  //       throw new Error('Failed to fetch clients');
  //     }
  //   };

  //   fetchClients();
  // }, []);

  const findClient = (clientId: string) => {
    const client =  clients.find((client) => client.id === clientId);
    return client;
  };

  // const clientNameById = useCallback((clientId: string) => {
  //   const client = clientsList.find((client) => client.id === clientId);
  //   return client ? client.name : undefined;
  // }, [clientsList]);

  return  {
    findClient,
    handleOrderClick,
    selectedOrderId,
  };
}
