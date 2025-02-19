export interface IPaginatedResponse<TData> {
  data: TData;
  items: number;
}

export type Constructor<T> = new (...args: any[]) => T;
