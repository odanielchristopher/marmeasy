import { Inject, Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from 'src/modules/product-categories/dto/create-product-category.dto';
import { UpdateProductCategoryDto } from 'src/modules/product-categories/dto/update-product-category.dto';
import { IValidateUserOwnershipService } from 'src/modules/users/interfaces/validate-user-ownership-service.interface';
import { IIngredientsRepository } from 'src/shared/database/interfaces/ingredients-repository.interface';
import { ValidateIngredientOwnershipService } from './validate-ingredient-ownership.service';

@Injectable()
export class IngredientsService {
  constructor(
    @Inject(IIngredientsRepository)
    private readonly ingredientsRepository: IIngredientsRepository,
    @Inject(IValidateUserOwnershipService)
    private readonly validateUserOwnershipService: IValidateUserOwnershipService,
    private readonly validateIngredientOwnershipService: ValidateIngredientOwnershipService,
  ) {}

  async findAllByUserId(userId: string) {
    return this.ingredientsRepository.findManyByUserId({
      userId,
      order: 'asc',
    });
  }

  async findOneByUserId(userId: string, ingredientId: string) {
    return this.ingredientsRepository.findFirstByUserId({
      userId,
      id: ingredientId,
    });
  }

  async create(
    userId: string,
    createProductCategoryDto: CreateProductCategoryDto,
  ) {
    await this.validateUserOwnershipService.validate(userId);

    const { name, icon } = createProductCategoryDto;

    return this.ingredientsRepository.create({
      data: { name, icon },
      userId,
    });
  }

  async update(
    userId: string,
    productCategoryId: string,
    updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    await this.validateIngredientOwnershipService.validate(
      userId,
      productCategoryId,
    );

    const { name, icon } = updateProductCategoryDto;

    return this.ingredientsRepository.update({
      data: { name, icon },
      userId,
    });
  }

  async remove(userId: string, ingredientId: string) {
    await this.validateIngredientOwnershipService.validate(
      userId,
      ingredientId,
    );

    await this.ingredientsRepository.delete({ userId, id: ingredientId });

    return null;
  }
}
