import { useMemo } from 'react';

import { IUsePaginationResponse } from '@app/types/IUsePagination';
import { generateElipsisPagination } from '@app/utils/generateElipsisPagination';

import * as Comp from '../ui/Pagination';

interface IPaginationProps {
  pagination: IUsePaginationResponse;
}

export function Pagination({ pagination }: IPaginationProps) {
  const pages = useMemo(
    () =>
      generateElipsisPagination(pagination.currentPage, pagination.totalPages),
    [pagination.currentPage, pagination.totalPages],
  );

  return (
    <Comp.Pagination>
      <Comp.PaginationContent>
        <Comp.PaginationItem>
          <Comp.PaginationPrevious
            type="button"
            onClick={pagination.previousPage}
            disabled={!pagination.hasPreviousPage}
          />
        </Comp.PaginationItem>

        {pages.map(({ value: page, id }) => {
          const isElipisPosition = typeof page === 'string';

          if (isElipisPosition) {
            return (
              <Comp.PaginationItem key={id}>
                <Comp.PaginationButton type="button" disabled>
                  <Comp.PaginationEllipsis />
                </Comp.PaginationButton>
              </Comp.PaginationItem>
            );
          }

          return (
            <Comp.PaginationItem key={id}>
              <Comp.PaginationButton
                type="button"
                isActive={pagination.currentPage === page}
                onClick={() => pagination.setPage(page)}
              >
                {page}
              </Comp.PaginationButton>
            </Comp.PaginationItem>
          );
        })}

        <Comp.PaginationItem>
          <Comp.PaginationNext
            type="button"
            onClick={pagination.nextPage}
            disabled={!pagination.hasNextPage}
          />
        </Comp.PaginationItem>
      </Comp.PaginationContent>
    </Comp.Pagination>
  );
}
