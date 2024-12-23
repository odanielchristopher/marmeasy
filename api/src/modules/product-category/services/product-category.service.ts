import { Injectable } from '@nestjs/common';
import { ProductCategoryRespository } from 'src/shared/database/repositories/product-category.repository';
import { ValidateUserOwnershipService } from '../../users/services/validate-user-ownership.service';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';
import { UpdateProductCategoryDto } from '../dto/update-product-category.dto';
import { ValidateProductCategoryOwnershipService } from './validate-product-category-ownership.service';

@Injectable()
export class ProductCategoryService {
  constructor(
    private readonly productCategoryRepository: ProductCategoryRespository,
    private readonly validateUserOwnershipService: ValidateUserOwnershipService,
    private readonly validateProductCategoryOwnershipService: ValidateProductCategoryOwnershipService,
  ) {}

  async findAllByUserId(userId: string) {
    return this.productCategoryRepository.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        icon: true,
      },
    });
  }

  async findOneByUserId(userId: string, productCategoryId: string) {
    return this.productCategoryRepository.findFirst({
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

    return this.productCategoryRepository.create({
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
    await this.validateProductCategoryOwnershipService.validate(
      userId,
      productCategoryId,
    );

    const { name, icon } = updateProductCategoryDto;

    return this.productCategoryRepository.update({
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
    await this.validateProductCategoryOwnershipService.validate(
      userId,
      productCategoryId,
    );

    await this.productCategoryRepository.delete({
      where: { userId, id: productCategoryId },
    });

    return null;
  }
}
