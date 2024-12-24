import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from 'src/modules/product-category/dto/create-product-category.dto';
import { UpdateProductCategoryDto } from 'src/modules/product-category/dto/update-product-category.dto';
import { ValidateUserOwnershipService } from 'src/modules/users/services/validate-user-ownership.service';
import { IngredientsRespository } from 'src/shared/database/repositories/ingredients.repository';
import { ValidateIngredientOwnershipService } from './validate-ingredient-ownership.service';

@Injectable()
export class IngredientService {
  constructor(
    private readonly ingredientsRepository: IngredientsRespository,
    private readonly validateUserOwnershipService: ValidateUserOwnershipService,
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
        name,
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
        name,
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
