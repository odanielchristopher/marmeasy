import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductCategoriesRespository } from 'src/shared/database/repositories/product-categories.repository';

@Injectable()
export class ValidateProductCategoryOwnershipService {
  constructor(
    private readonly productCategoriesRepository: ProductCategoriesRespository,
  ) {}

  async validate(userId: string, productCategoryId: string) {
    const isOwner = await this.productCategoriesRepository.findFirst({
      where: { id: productCategoryId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Categoria não encontrada.');
    }
  }
}
