import React, { createContext, useCallback, useState } from 'react';
import { Client } from '../entities/Client';

export interface AsideContextValue {
  handleShowClientData(client: Client): void;
  showClientData: boolean;
  seletedClient: Client | null;
}

export const AsideContext = createContext({} as AsideContextValue);

export function AsideProvider({ children }: { children: React.ReactNode }) {
  const [showClientData, setShowClientData] = useState(false);
  const [seletedClient, setSeletedClient] = useState<Client | null>(null);

  const handleShowClientData = useCallback((client: Client) => {
    setSeletedClient(client);
    setShowClientData(true);
  }, []);



  return (
    <AsideContext.Provider value={{
      handleShowClientData,
      showClientData,
      seletedClient,
    }}>
      {children}
    </AsideContext.Provider>
  );
}
