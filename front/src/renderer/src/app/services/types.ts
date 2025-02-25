export interface PaginatedResponse<TData> {
  data: TData;
  items: number;
}

export interface History<TEntity> {
  [monthYear: string]: {
    [day: string]: TEntity[];
  };
}
