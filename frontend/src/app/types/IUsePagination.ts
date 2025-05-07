import React from 'react';

export type IUsePaginationResponse = {
  currentPage: number;
  nextPage: () => void;
  previousPage: () => void;
  setPage: (page: number) => void;
  setTotalItems: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type IUsePagination = (perPage: number) => IUsePaginationResponse;
