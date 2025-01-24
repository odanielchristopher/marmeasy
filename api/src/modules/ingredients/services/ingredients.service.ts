import { Inject, Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from 'src/modules/product-categories/dto/create-product-category.dto';
import { UpdateProductCategoryDto } from 'src/modules/product-categories/dto/update-product-category.dto';
import { IValidateUserOwnershipService } from 'src/modules/users/interfaces/validate-user-ownership-service.interface';
import { IngredientsRespository } from 'src/shared/database/repositories/ingredients.repository';
import { ValidateIngredientOwnershipService } from './validate-ingredient-ownership.service';

@Injectable()
export class IngredientsService {
  constructor(
    private readonly ingredientsRepository: IngredientsRespository,
    @Inject(IValidateUserOwnershipService)
    private readonly validateUserOwnershipService: IValidateUserOwnershipService,
    private readonly validateIngredientOwnershipService: ValidateIngredientOwnershipService,
  ) {}

  async findAllByUserId(userId: string) {
    return this.ingredientsRepository.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        icon: true,
      },
    });
  }

  async findOneByUserId(userId: string, productCategoryId: string) {
    return this.ingredientsRepository.findFirst({
      where: {
        userId,
        id: productCategoryId,
      },
      select: {
        id: true,
        name: true,
        icon: true,
      },
    });
  }

  async create(
    userId: string,
    createProductCategoryDto: CreateProductCategoryDto,
  ) {
    await this.validateUserOwnershipService.validate(userId);

    const { name, icon } = createProductCategoryDto;

    return this.ingredientsRepository.create({
      data: {
        userId,
        name: name.toLowerCase(),
        icon,
      },
      select: {
        id: true,
        name: true,
        icon: true,
      },
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
      where: { userId, id: productCategoryId },
      data: {
        name: name.toLowerCase(),
        icon,
      },
      select: {
        id: true,
        name: true,
        icon: true,
      },
    });
  }

  async remove(userId: string, productCategoryId: string) {
    await this.validateIngredientOwnershipService.validate(
      userId,
      productCategoryId,
    );

    await this.ingredientsRepository.delete({
      where: { userId, id: productCategoryId },
    });

    return null;
  }
}
