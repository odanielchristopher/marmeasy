import { FetchNextPageFn } from './FetchNextPageFn';
import { IPaginatedResponse } from './IPaginatedResponse';

export type InfiniteQueryResponse<TResponse> = {
  nextPage: FetchNextPageFn<IPaginatedResponse<TResponse>>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};
