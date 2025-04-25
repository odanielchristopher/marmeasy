import { Product } from '../entities/product.entity';

export const IValidateProductOwnershipService = Symbol(
  'IValidateProductOwnershipService',
);

export interface IValidateProductOwnershipService {
  validate(userId: string, productId: string): Promise<Product>;
}
