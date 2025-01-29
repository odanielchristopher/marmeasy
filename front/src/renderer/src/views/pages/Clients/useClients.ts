import { useClientsQuery } from '@renderer/app/hooks/queries/useClientsQuery';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function useClient() {
  const [searchTerm, setSearchTerm] = useState('');

  const { clients, isLoading, nextPage, hasNextPage, isFetchingNextPage } = useClientsQuery(15);
  const finalPageLoaderRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!finalPageLoaderRef.current) {
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      const { isIntersecting } = entries[0];

      if (!hasNextPage) {
        obs.disconnect();
        return;
      }

      if (isIntersecting && hasNextPage) {
        nextPage();
      }
    });

    observer.observe(finalPageLoaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoading, nextPage]);

  function handleChangeSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  const filteredClients = useMemo(
    () =>
      clients
        .filter((client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
        // .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)),
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
    finalPageLoaderRef,
    handleChangeSearchTerm,
    isFetchingNextPage,
  };
}
