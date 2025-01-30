import { useClientsQuery } from '@renderer/app/hooks/queries/useClientsQuery';
import { useSearchClientsQuery } from '@renderer/app/hooks/queries/useSearchClientsQuery';
import { useDebounce } from '@renderer/app/hooks/useDebounce';
import { useEffect, useRef, useState } from 'react';

export default function useClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm, 400);

  // Se searchTerm estiver vazio, usamos useClientsQuery, senão usamos useSearchClientsQuery
  const {
    clients: normalClients,
    isLoading: isClientsLoading,
    nextPage: nextNormalPage,
    hasNextPage: hasNextNormalPage,
    isFetchingNextPage: isFetchingNextNormalPage,
  } = useClientsQuery(20);

  const {
    findedClients: searchedClients,
    isLoading: isSearchLoading,
    nextPage: nextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
  } = useSearchClientsQuery(debouncedValue, 20);

  // Escolher qual lista de clientes usar
  const clientsToRender = debouncedValue ? searchedClients : normalClients;

  // Controle de páginação
  const hasNextPage = debouncedValue ? hasNextSearchPage : hasNextNormalPage;
  const nextPage = debouncedValue ? nextSearchPage : nextNormalPage;
  const isFetchingNextPage = debouncedValue
    ? isFetchingNextSearchPage
    : isFetchingNextNormalPage;

  const finalPageLoaderRef = useRef<null | HTMLDivElement>(null);

  // Configurar o IntersectionObserver para carregar mais páginas quando o usuário rolar
  useEffect(() => {
    if (!finalPageLoaderRef.current) return;

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
  }, [hasNextPage, nextPage]);

  function handleChangeSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  const isLoading = isSearchLoading || isClientsLoading;
  const isSearchEmpty = clientsToRender.length < 1 && isLoading;
  const hasClient = clientsToRender.length > 0;

  return {
    isLoading,
    isSearchEmpty,
    hasClient,
    searchTerm,
    clientsToRender,
    finalPageLoaderRef,
    handleChangeSearchTerm,
    isFetchingNextPage,
  };
}
