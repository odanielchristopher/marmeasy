import { useClientsQuery } from '@renderer/app/hooks/queries/useClientsQuery';
import { useMemo, useState } from 'react';

export default function useClient() {
  const [searchTerm, setSearchTerm] = useState('');

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

  const isSearchEmpty = filteredClients.length < 1;
  const hasClient = filteredClients.length > 0;

  return {
    isLoading,
    isSearchEmpty,
    hasClient,
    searchTerm,
    filteredClients,
    handleChangeSearchTerm,
  };
}
