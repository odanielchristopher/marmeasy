import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';

export type IFetchNextPage<TData> = (
  options?: FetchNextPageOptions,
) => Promise<InfiniteQueryObserverResult<InfiniteData<TData, unknown>, Error>>;
