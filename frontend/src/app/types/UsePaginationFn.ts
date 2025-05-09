import React from 'react';

export type UsePaginationResponse = {
  currentPage: number;
  nextPage: () => void;
  previousPage: () => void;
  setPage: (page: number) => void;
  setTotalItems: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type UsePaginationFn = (
  perPage: number,
  initalPage?: number,
) => UsePaginationResponse;
