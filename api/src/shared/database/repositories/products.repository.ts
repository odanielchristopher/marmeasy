import { Injectable } from '@nestjs/common';
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

const prismaResponse = {
  id: true,
  name: true,
  description: true,
  price: true,
  imagePath: true,
  ingredients: {
    select: {
      id: true,
      name: true,
      icon: true,
    },
  },
  category: {
    select: {
      id: true,
      name: true,
      icon: true,
    },
  },
};

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByFilters(
    findManyByUserIdDto: FindManyProductsByFiltersDto,
  ): Promise<Product[]> {
    const {
      filters: { userId, categoryName },
      order,
    } = findManyByUserIdDto;

    const filters = {
      userId,
      ...(categoryName && { category: { name: categoryName } }), // Se tiver uma categoryName entao é adicionado nos filtros
    };

    return this.prismaService.product.findMany({
      where: filters,
      select: prismaResponse,
      orderBy: {
        name: order,
      },
    });
  }

  async findFirstByUserId(
    findFirstDto: FindFirstProductByUserIdDto,
  ): Promise<Product> {
    const { userId, id } = findFirstDto;

    return this.prismaService.product.findFirst({
      where: { userId, id },
      select: prismaResponse,
    });
  }

  async create(createDto: CreateProductOnDBDto): Promise<Product> {
    const { data, userId } = createDto;

    const { name, price, categoryId, description, imagePath, ingredientsIds } =
      data;

    const product = await this.prismaService.product.create({
      data: {
        userId,
        name,
        price,
        categoryId,
        description,
        imagePath,
        ingredients: {
          connect: ingredientsIds ? ingredientsIds.map((id) => ({ id })) : [],
        },
      },
      select: prismaResponse,
    });

    return product;
  }

  async update(updateDto: UpdateProductOnDBDto): Promise<Product> {
    const { data, userId } = updateDto;

    const {
      ingredientsIds,
      categoryId,
      id,
      name,
      price,
      description,
      imagePath,
    } = data;

    const updatedProduct = await this.prismaService.product.update({
      where: { userId, id: data.id },
      data: {
        id,
        name,
        price,
        description,
        imagePath,
        categoryId,
        ingredients: {
          set: [], // Limpa os ingredientes antigos
          connect: ingredientsIds ? ingredientsIds.map((id) => ({ id })) : [],
        },
      },
      select: prismaResponse,
    });

    return updatedProduct;
  }

  async delete(deleteDto: DeleteProductDto): Promise<void> {
    const { id, userId } = deleteDto;

    await this.prismaService.product.delete({
      where: { userId, id },
    });
  }
}
