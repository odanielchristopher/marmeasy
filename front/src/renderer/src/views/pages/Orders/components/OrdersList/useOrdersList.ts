import { Client } from '@renderer/app/entities/Client';
import { clientsService } from '@renderer/app/services/clientsService';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function useOrdersList() {
  const [clientsList, setClientsList] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await clientsService.getAll();
        setClientsList(response.data);
      } catch (error) {
        throw new Error('Failed to fetch clients');
      }
    };

    fetchClients();
  }, []);

  const clientNameById = useCallback((clientId: string) => {
    const client = clientsList.find((client) => client.id === clientId);
    return client ? client.name : undefined;
  }, [clientsList]);

  return useMemo(() => ({
    clientNameById,
  }), [clientNameById]);
}
