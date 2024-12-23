import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductCategoryRespository } from 'src/shared/database/repositories/product-category.repository';

@Injectable()
export class ValidateProductCategoryOwnershipService {
  constructor(
    private readonly productCategoryRepository: ProductCategoryRespository,
  ) {}

  async validate(userId: string, productCategoryId: string) {
    const isOwner = await this.productCategoryRepository.findFirst({
      where: { id: productCategoryId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Categoria não encontrada.');
    }
  }
}
