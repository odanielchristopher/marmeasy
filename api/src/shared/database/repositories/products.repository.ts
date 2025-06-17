import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Product } from 'src/modules/products/entities/product.entity';
import {
  CreateProductOnDBDto,
  DeleteProductDto,
  FindFirstProductByUserIdDto,
  FindManyProductsByFiltersDto,
  IProductsRepository,
  UpdateProductOnDBDto,
} from '../interfaces/products-repository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findManyByFilters(
    findManyByUserIdDto: FindManyProductsByFiltersDto,
  ): Promise<Product[]> {
    const {
      order,
      filters: { userId, categoryName, searchTerm },
    } = findManyByUserIdDto;

    const products = await this.prismaService.product.findMany({
      where: {
        userId,
        category: { name: categoryName },
        isActive: true,
        name: { contains: searchTerm, mode: 'insensitive' },
      },
      select: this.prismaResponse(),
      orderBy: { name: order },
    });

    return products.map((product) => ({
      ...product,
      price: product.price.toNumber(),
    }));
  }

  async findFirstByUserId(
    findFirstDto: FindFirstProductByUserIdDto,
  ): Promise<Product> {
    const { id, userId } = findFirstDto;

    const product = await this.prismaService.product.findFirst({
      where: { userId, id },
      select: this.prismaResponse(),
    });

    if (!product) {
      return null;
    }

    return {
      ...product,
      price: product.price.toNumber(),
    };
  }

  async create(createDto: CreateProductOnDBDto): Promise<Product> {
    const { data, userId } = createDto;

    const createdProduct = await this.prismaService.product.create({
      data: {
        userId,
        ...data,
      },
      select: this.prismaResponse(),
    });

    return {
      ...createdProduct,
      price: createdProduct.price.toNumber(),
    };
  }

  async update(updateDto: UpdateProductOnDBDto): Promise<Product> {
    const { data, productId } = updateDto;

    const createdProduct = await this.prismaService.product.update({
      where: { id: productId },
      data: {
        ...data,
      },
      select: this.prismaResponse(),
    });

    return {
      ...createdProduct,
      price: createdProduct.price.toNumber(),
    };
  }

  async delete(deleteDto: DeleteProductDto): Promise<void> {
    const { productId } = deleteDto;

    await this.prismaService.product.update({
      where: { id: productId },
      data: {
        isActive: false,
      },
    });
  }

  private prismaResponse(): Prisma.ProductSelect {
    return {
      id: true,
      name: true,
      description: true,
      price: true,
      imagePath: true,
      category: {
        select: {
          id: true,
          name: true,
          icon: true,
        },
      },
    };
  }
}
