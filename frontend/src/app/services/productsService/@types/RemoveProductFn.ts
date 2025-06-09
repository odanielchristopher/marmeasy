export type RemoveProductResponse = Promise<void>;

export type RemoveProductFn = (id: string) => RemoveProductResponse;
