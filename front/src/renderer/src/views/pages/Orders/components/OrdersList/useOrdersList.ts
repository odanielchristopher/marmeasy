import { useClientsQuery } from '@renderer/app/hooks/queries/useClientsQuery';
import useAside from '@renderer/app/hooks/useAside';
import { useState } from 'react';

export default function useOrdersList() {
  const { handleShowOrderData, handleHiddenOrderData } = useAside();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { clients } = useClientsQuery();

  const handleOrderClick = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  const findClient = (clientId: string) => {
    const client =  clients.find((client) => client.id === clientId);
    return client;
  };

  return  {
    findClient,
    handleOrderClick,
    selectedOrderId,
    handleShowOrderData,
    handleHiddenOrderData,
  };
}
