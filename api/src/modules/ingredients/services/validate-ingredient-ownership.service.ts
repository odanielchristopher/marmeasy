import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IIngredientsRepository } from 'src/shared/database/interfaces/ingredients-repository.interface';

@Injectable()
export class ValidateIngredientOwnershipService {
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
