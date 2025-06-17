export interface IOrderItem {
  product: {
    id: string;
    name: string;
    imageUrl?: string;
    description?: string;
  };
  quantity: number;
  unitPrice: string;
}
