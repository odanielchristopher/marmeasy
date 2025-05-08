import { useMemo } from 'react';

import { IUsePaginationResponse } from '@app/types/IUsePagination';
import { generateElipsisPagination } from '@app/utils/generateElipsisPagination';

import * as Primitive from '../ui/Pagination';

interface IPaginationProps {
  control: IUsePaginationResponse;
}

export function Pagination({ control }: IPaginationProps) {
  const pages = useMemo(
    () => generateElipsisPagination(control.currentPage, control.totalPages),
    [control.currentPage, control.totalPages],
  );

  return (
    <Primitive.Pagination>
      <Primitive.PaginationContent>
        <Primitive.PaginationItem>
          <Primitive.PaginationPrevious
            type="button"
            onClick={control.previousPage}
            disabled={!control.hasPreviousPage}
          />
        </Primitive.PaginationItem>

        {pages.map(({ value: page, id }) => {
          const isElipisPosition = typeof page === 'string';

          if (isElipisPosition) {
            return (
              <Primitive.PaginationItem key={id}>
                <Primitive.PaginationButton type="button" disabled>
                  <Primitive.PaginationEllipsis />
                </Primitive.PaginationButton>
              </Primitive.PaginationItem>
            );
          }

          return (
            <Primitive.PaginationItem key={id}>
              <Primitive.PaginationButton
                type="button"
                isActive={control.currentPage === page}
                onClick={() => control.setPage(page)}
              >
                {page}
              </Primitive.PaginationButton>
            </Primitive.PaginationItem>
          );
        })}

        <Primitive.PaginationItem>
          <Primitive.PaginationNext
            type="button"
            onClick={control.nextPage}
            disabled={!control.hasNextPage}
          />
        </Primitive.PaginationItem>
      </Primitive.PaginationContent>
    </Primitive.Pagination>
  );
}
