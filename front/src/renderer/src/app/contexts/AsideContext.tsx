import React, { createContext, useCallback, useState } from 'react';
import { Client } from '../entities/Client';
import { Order } from '../entities/Order';

export interface AsideContextValue {
  handleShowClientData(client: Client): void;
  handleShowOrderData(order: Order): void;
  handleHiddenClientData(): void;
  handleHiddenOrderData(): void;
  showClientData: boolean;
  showOrderData: boolean;
  seletedClient: Client | null;
  selectedOrder: Order | null;
}

export const AsideContext = createContext({} as AsideContextValue);

export function AsideProvider({ children }: { children: React.ReactNode }) {
  const [showClientData, setShowClientData] = useState(false);
  const [showOrderData, setShowOrderData] = useState(false);
  const [seletedClient, setSeletedClient] = useState<Client | null>(null);
  const [selectedOrder, setSeletectedOrder] = useState<Order | null>(null);

  const handleShowClientData = useCallback((client: Client) => {
    setSeletedClient(client);
    setShowClientData(true);
  }, []);

  const handleHiddenClientData = useCallback(() => {
    setSeletedClient(null);
    setShowClientData(false);
  }, []);

  const handleShowOrderData = useCallback((order: Order) => {
    setSeletectedOrder(order);
    setShowOrderData(true);
  }, []);

  const handleHiddenOrderData = useCallback(() => {
    setSeletectedOrder(null);
    setShowOrderData(false);
  }, []);

  return (
    <AsideContext.Provider
      value={{
        handleShowClientData,
        handleHiddenClientData,
        handleShowOrderData,
        handleHiddenOrderData,
        showClientData,
        showOrderData,
        seletedClient,
        selectedOrder,
      }}
    >
      {children}
    </AsideContext.Provider>
  );
}
