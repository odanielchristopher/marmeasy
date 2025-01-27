import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IIngredientsRepository } from 'src/shared/database/interfaces/ingredients-repository.interface';
import { IValidateIngredientOwnershipService } from '../interfaces/validate-ingredient-ownership-service.interface';

@Injectable()
export class ValidateIngredientOwnershipService
  implements IValidateIngredientOwnershipService
{
  constructor(
    @Inject(IIngredientsRepository)
    private readonly ingredientsRepository: IIngredientsRepository,
  ) {}

  async validate(userId: string, ingredientId: string) {
    const isOwner = await this.ingredientsRepository.findFirstByUserId({
      userId,
      id: ingredientId,
    });

    if (!isOwner) {
      throw new NotFoundException('Ingrediente não encontrado.');
    }
  }
}
