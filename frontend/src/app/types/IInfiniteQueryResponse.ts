import { IFetchNextPage } from './IFetchNextPage';
import { IPaginatedResponse } from './IPaginatedResponse';

export type IInfiniteQueryResponse<TResponse> = {
  nextPage: IFetchNextPage<IPaginatedResponse<TResponse>>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};
