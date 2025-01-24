import React, { createContext, useCallback, useState } from 'react';
import { Client } from '../entities/Client';

export interface AsideContextValue {
  handleShowClientData(client: Client): void;
  showClientData: boolean;
  seletedClient: Client | null;
  handleHiddenClientData(): void;
}

export const AsideContext = createContext({} as AsideContextValue);

export function AsideProvider({ children }: { children: React.ReactNode }) {
  const [showClientData, setShowClientData] = useState(false);
  const [seletedClient, setSeletedClient] = useState<Client | null>(null);

  const handleShowClientData = useCallback((client: Client) => {
    setSeletedClient(client);
    setShowClientData(true);
  }, []);

  const handleHiddenClientData = useCallback(() => {
    setSeletedClient(null);
    setShowClientData(false);
  }, []);

  return (
    <AsideContext.Provider
      value={{
        handleShowClientData,
        handleHiddenClientData,
        showClientData,
        seletedClient,
      }}
    >
      {children}
    </AsideContext.Provider>
  );
}
