import { Product } from 'src/modules/products/entities/product.entity';

export const IValidateOrdersService = Symbol('IValidateOrdersService');

export interface IValidateOrdersService {
  validate(
    items: {
      productId: string;
      quantity: number;
      unitPrice: number;
    }[],
    products: Product[],
    amount: number,
  ): Promise<void>;
}
