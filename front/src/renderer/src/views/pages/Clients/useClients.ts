import { useClientsQuery } from '@renderer/app/hooks/queries/useClientsQuery';
import { useMemo, useRef, useState } from 'react';

export default function useClient() {
  const [searchTerm, setSearchTerm] = useState('');

  const { clients, isLoading } = useClientsQuery();
  useRef();

  // useEffect(() => {
  //   const observer = new IntersectionObserver();

  //   observer.observe
  // }, []);

  function handleChangeSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  const filteredClients = useMemo(
    () =>
      clients
        .filter((client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase()),
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
