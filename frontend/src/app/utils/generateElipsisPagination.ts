/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
export function generateElipsisPagination(
  currentPage: number,
  totalPages: number,
  surroundingPages = 1,
): {
  value: number | string;
  id: number;
}[] {
  const pages: {
    value: number | string;
    id: number;
  }[] = [];

  for (let i = 1; i <= totalPages; i++) {
    const isFirstPage = i === 1;
    const isLastPage = i === totalPages;
    const isWithinLowerBound = i >= currentPage - surroundingPages;
    const isWithinUpperBound = i <= currentPage + surroundingPages;
    const isElipsisPosition =
      i === currentPage - surroundingPages - 1 ||
      i === currentPage + surroundingPages + 1;

    if (isElipsisPosition && !isFirstPage && !isLastPage) {
      pages.push({
        id: i,
        value: '...',
      });
      continue;
    }

    if (
      isFirstPage ||
      isLastPage ||
      (isWithinLowerBound && isWithinUpperBound)
    ) {
      pages.push({
        id: i,
        value: i,
      });
    }
  }

  return pages;
}
