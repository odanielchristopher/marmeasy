import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export function usePagination(perPage: number, initialPage = 1) {
  const [totalItems, setTotalItems] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get('page');

    return page !== null ? Number(page) : initialPage;
  });

  const totalPages = Math.ceil(totalItems / perPage);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage, setSearchParams]);

  const nextPage = useCallback(() => {
    setCurrentPage((prevState) => prevState + 1);
  }, []);

  const previousPage = useCallback(() => {
    setCurrentPage((prevState) => prevState - 1);
  }, []);

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    currentPage,
    nextPage,
    previousPage,
    setPage,
    setTotalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
}
