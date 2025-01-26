import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProductsRepository } from 'src/shared/database/interfaces/products-repository.interface';

@Injectable()
export class ValidateProductOwnershipService {
  constructor(
    @Inject(IProductsRepository)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async validate(userId: string, productId: string) {
    const isOwner = await this.productsRepository.findFirstByUserId({
      userId,
      id: productId,
    });

    if (!isOwner) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return isOwner;
  }
}
