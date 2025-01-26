import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

import { IValidateIngredientOwnershipService } from 'src/modules/ingredients/interfaces/validate-ingredient-ownership-service.interface';
import { IValidateProductCategoryOwnershipService } from 'src/modules/product-categories/interfaces/validate-product-category-ownership-service.interface';
import { IProductsRepository } from 'src/shared/database/interfaces/products-repository.interface';
import { IProducImagesService } from '../interfaces/product-images-service.interface';
import { IProductsService } from '../interfaces/products-service.interface';
import { IValidateProductOwnershipService } from '../interfaces/validate-products-ownership-service.interface';

@Injectable()
export class ProductsService implements IProductsService {
  constructor(
    @Inject(IProductsRepository)
    private readonly productsRepository: IProductsRepository,
    @Inject(IProducImagesService)
    private readonly productImagesService: IProducImagesService,
    @Inject(IValidateProductOwnershipService)
    private readonly validateProductOwnershipService: IValidateProductOwnershipService,
    @Inject(IValidateProductCategoryOwnershipService)
    private readonly validateProductCategorieOwnershipService: IValidateProductCategoryOwnershipService,
    @Inject(IValidateIngredientOwnershipService)
    private readonly validadeIngredientsOwnershipService: IValidateIngredientOwnershipService,
  ) {}

  findAllByUserId(userId: string, categoryName: string) {
    return this.productsRepository.findManyByFilters({
      filters: { userId, categoryName },
      order: 'asc',
    });
  }

  async create(
    userId: string,
    createProductDto: CreateProductDto,
    image?: Express.Multer.File,
  ) {
    const { name, description, price, categoryId, ingredientsIds } =
      createProductDto;

    await this.validateEntitiesOwnership({
      userId,
      productCategoryId: categoryId,
      ingredientIds: ingredientsIds ? ingredientsIds : undefined,
    });

    let imagePath: string;

    if (image) {
      const path = await this.productImagesService.upload(image);

      imagePath = path.imagePath;
    }

    return this.productsRepository.create({
      userId,
      data: {
        name,
        description,
        categoryId,
        ingredientsIds,
        imagePath,
        price,
      },
    });
  }

  async update(
    userId: string,
    productId: string,
    removeImage: boolean,
    updateProductDto: UpdateProductDto,
    image?: Express.Multer.File,
  ) {
    const { name, categoryId, description, ingredientsIds, price } =
      updateProductDto;

    const currentProduct = await this.validateEntitiesOwnership({
      userId,
      productId,
      productCategoryId: categoryId,
      ingredientIds: ingredientsIds ? ingredientsIds : undefined,
    });

    let updatedImagePath = removeImage ? null : currentProduct.imagePath;

    if (removeImage) {
      await this.productImagesService.remove(currentProduct.imagePath);
    }

    if (image) {
      const { imagePath } = await this.productImagesService.update(
        currentProduct.imagePath,
        image,
      );

      updatedImagePath = imagePath;
    }

    return this.productsRepository.update({
      userId,
      data: {
        id: productId,
        name,
        description,
        price,
        imagePath: updatedImagePath,
        categoryId,
        ingredientsIds,
      },
    });
  }

  async remove(userId: string, productId: string) {
    const product = await this.validateEntitiesOwnership({
      userId,
      productId,
    });

    if (product.imagePath) {
      await this.productImagesService.remove(product.imagePath);
    }

    await this.productsRepository.delete({ userId, id: productId });

    return null;
  }

  private async validateEntitiesOwnership({
    userId,
    productId,
    productCategoryId,
    ingredientIds,
  }: {
    userId: string;
    productId?: string;
    productCategoryId?: string;
    ingredientIds?: string[];
  }) {
    const [product] = await Promise.all([
      productId &&
        this.validateProductOwnershipService.validate(userId, productId),
      productCategoryId &&
        this.validateProductCategorieOwnershipService.validate(
          userId,
          productCategoryId,
        ),
      ingredientIds &&
        ingredientIds.forEach((ingredientId) =>
          this.validadeIngredientsOwnershipService.validate(
            userId,
            ingredientId,
          ),
        ),
    ]);

    return product;
  }
}
