import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientsRespository } from 'src/shared/database/repositories/ingredients.repository';

@Injectable()
export class ValidateIngredientOwnershipService {
  constructor(private readonly ingredientsRepository: IngredientsRespository) {}

  async validate(userId: string, productCategoryId: string) {
    const isOwner = await this.ingredientsRepository.findFirst({
      where: { id: productCategoryId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Ingrediente não encontrado.');
    }
  }
}
