import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRespository } from 'src/shared/database/repositories/products.repository';

@Injectable()
export class ValidateProductOwnershipService {
  constructor(private readonly productsRepository: ProductsRespository) {}

  async validate(userId: string, productId: string) {
    const isOwner = await this.productsRepository.findFirst({
      where: { id: productId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return isOwner;
  }
}
