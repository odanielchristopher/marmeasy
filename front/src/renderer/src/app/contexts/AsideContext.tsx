import React, { createContext, useCallback, useState } from 'react';

export interface AsideContextValue {
  handleShowClientData(id: string): void;
  showClientData: boolean;
  seletedClient: string;
}

export const AsideContext = createContext({} as AsideContextValue);

export function AsideProvider({ children }: { children: React.ReactNode }) {
  const [showClientData, setShowClientData] = useState(false);
  const [seletedClient, setSeletedClient] = useState('');

  const handleShowClientData = useCallback((id: string) => {

    console.log(id);
    setSeletedClient(id);
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
