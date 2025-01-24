import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IValidateUserOwnershipService } from 'src/modules/users/interfaces/validate-user-ownership-service.interface';
import { IProductCategoriesRepository } from 'src/shared/database/interfaces/product-categories-repository.interface copy';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';
import { UpdateProductCategoryDto } from '../dto/update-product-category.dto';
import { IProductCategoriesService } from '../interfaces/product-categories-service.interface';
import { IValidateProductCategoryOwnershipService } from '../interfaces/validate-product-category-ownership-service.interface';

@Injectable()
export class ProductCategoriesService implements IProductCategoriesService {
  constructor(
    @Inject('IProductCategoriesRepository')
    private readonly productCategoriesRepository: IProductCategoriesRepository,
    @Inject(IValidateUserOwnershipService)
    private readonly validateUserOwnershipService: IValidateUserOwnershipService,
    @Inject(IValidateProductCategoryOwnershipService)
    private readonly validateProductCategoryOwnershipService: IValidateProductCategoryOwnershipService,
  ) {}

  async findAllByUserId(userId: string) {
    const productsCategories =
      await this.productCategoriesRepository.findManyByUserId({
        userId,
        order: 'asc',
      });

    return productsCategories;
  }

  async findOneByUserId(userId: string, productCategoryId: string) {
    const findedProductCategory =
      await this.productCategoriesRepository.findFirstByUserId({
        userId,
        id: productCategoryId,
      });

    return findedProductCategory;
  }

  async create(
    userId: string,
    createProductCategoryDto: CreateProductCategoryDto,
  ) {
    await this.validateUserOwnershipService.validate(userId);

    const { name, icon } = createProductCategoryDto;

    const nameAlreadyExists =
      await this.productCategoriesRepository.findFirstByName({ userId, name });

    if (nameAlreadyExists) {
      throw new BadRequestException('Esse nome já está sendo usado.');
    }

    const data = { name, icon };

    const createdProductCategory =
      await this.productCategoriesRepository.create({ data, userId });

    return createdProductCategory;
  }

  async update(
    userId: string,
    productCategoryId: string,
    updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    await this.validateProductCategoryOwnershipService.validate(
      userId,
      productCategoryId,
    );

    const { name, icon } = updateProductCategoryDto;

    const nameAlreadyExists =
      await this.productCategoriesRepository.findFirstByName({ userId, name });

    if (nameAlreadyExists && productCategoryId !== nameAlreadyExists.id) {
      throw new BadRequestException('Esse nome já está sendo usado.');
    }

    const data = {
      id: productCategoryId,
      name,
      icon,
    };

    return this.productCategoriesRepository.update({ userId, data });
  }

  async remove(userId: string, productCategoryId: string) {
    await this.validateProductCategoryOwnershipService.validate(
      userId,
      productCategoryId,
    );

    await this.productCategoriesRepository.delete({
      userId,
      id: productCategoryId,
    });

    return null;
  }
}
