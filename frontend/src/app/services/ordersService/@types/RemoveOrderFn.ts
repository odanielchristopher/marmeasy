export type RemoveOrderResponse = Promise<void>;

export type RemoveOrderFn = (orderId: string) => RemoveOrderResponse;
