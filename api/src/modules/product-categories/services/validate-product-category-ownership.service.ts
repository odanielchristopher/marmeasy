import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProductCategoriesRepository } from 'src/shared/database/interfaces/product-categories-repository.interface';
import { IValidateProductCategoryOwnershipService } from '../interfaces/validate-product-category-ownership-service.interface';

@Injectable()
export class ValidateProductCategoryOwnershipService
  implements IValidateProductCategoryOwnershipService
{
  constructor(
    @Inject(IProductCategoriesRepository)
    private readonly productCategoriesRepository: IProductCategoriesRepository,
  ) {}

  async validate(userId: string, productCategoryId: string) {
    const isOwner = await this.productCategoriesRepository.findFirstByUserId({
      id: productCategoryId,
      userId,
    });

    if (!isOwner) {
      throw new NotFoundException('Categoria não encontrada.');
    }
  }
}
