import { Injectable } from '@nestjs/common';
import { ProductCategory } from 'src/modules/product-categories/entities/product-category.entity';
import {
  CreateProductCategoryDto,
  DeleteProductCategoryDto,
  FindFirstProductCategoryByNameDto,
  FindFirstProductCategoryDto,
  FindManyProductCategoriesDto,
  IProductCategoriesRepository,
  UpdateProductCategoryDto,
} from '../interfaces/product-categories-repository.interface copy';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductCategoriesRepository
  implements IProductCategoriesRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByUserId(
    findManyDto: FindManyProductCategoriesDto,
  ): Promise<ProductCategory[] | null> {
    const { userId, order } = findManyDto;

    const productCategories = await this.prismaService.productCategory.findMany(
      {
        where: { userId },
        orderBy: {
          name: order,
        },
        select: {
          id: true,
          name: true,
          icon: true,
        },
      },
    );

    return productCategories;
  }

  async findFirstByUserId(
    findUniqueDto: FindFirstProductCategoryDto,
  ): Promise<ProductCategory | null> {
    const { userId, id } = findUniqueDto;

    const findedProductCategory =
      await this.prismaService.productCategory.findFirst({
        where: { userId, id },
        select: {
          id: true,
          name: true,
          icon: true,
        },
      });

    return findedProductCategory;
  }

  async findFirstByName(
    findFirstByNameDto: FindFirstProductCategoryByNameDto,
  ): Promise<ProductCategory | null> {
    const { userId, name } = findFirstByNameDto;

    const findedProductCategory =
      await this.prismaService.productCategory.findFirst({
        where: { userId, name },
        select: {
          id: true,
          name: true,
          icon: true,
        },
      });

    return findedProductCategory;
  }

  async create(
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ProductCategory | null> {
    const { data, userId } = createProductCategoryDto;

    const createdProductCategory =
      await this.prismaService.productCategory.create({
        data: {
          ...data,
          userId,
        },
        select: {
          id: true,
          name: true,
          icon: true,
        },
      });

    return createdProductCategory;
  }

  async update(
    updateProductCategoryDto: UpdateProductCategoryDto,
  ): Promise<ProductCategory | null> {
    const { data, userId } = updateProductCategoryDto;

    const updatedProductCategory =
      await this.prismaService.productCategory.update({
        where: { userId, id: data.id },
        data,
        select: {
          id: true,
          name: true,
          icon: true,
        },
      });

    return updatedProductCategory;
  }

  async delete(
    deleteProductCategoryDto: DeleteProductCategoryDto,
  ): Promise<void> {
    const { id, userId } = deleteProductCategoryDto;

    await this.prismaService.productCategory.delete({
      where: { userId, id },
    });
  }
}
