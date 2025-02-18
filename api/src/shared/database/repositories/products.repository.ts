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

    const products = await this.prismaService.$queryRaw<Product[]>`
      SELECT
        p.id,
        p.name,
        p.price,
        p.description,
        p."imagePath",
        jsonb_agg(
          jsonb_build_object(
            'id', i.id,
            'name', i.name,
            'icon', i.icon
          )
        ) FILTER (WHERE i.id IS NOT NULL) AS ingredients,
        jsonb_build_object(
          'id', c.id,
          'name', c.name,
          'icon', c.icon
        ) AS category
      FROM products p
      LEFT JOIN _product_ingredient pi ON pi."B" = p.id
      LEFT JOIN ingredients i ON pi."A" = i.id
      LEFT JOIN product_category c ON p.product_category_id = c.id
      WHERE p.user_id = ${userId}::uuid
      ${categoryName ? Prisma.sql`AND c.name = ${categoryName}` : Prisma.sql``}
      GROUP BY p.id, c.id
      ORDER BY p.name ${Prisma.raw(order)};
    `;

    return products.map((product) => ({
      ...product,
      ingredients: product.ingredients ?? [],
      category: product.category.id ? product.category : null,
    }));
  }

  async findFirstByUserId(
    findFirstDto: FindFirstProductByUserIdDto,
  ): Promise<Product | null> {
    const { userId, id } = findFirstDto;

    const [product] = await this.prismaService.$queryRaw<Product[]>`
      SELECT
        p.id,
        p.name,
        p.price,
        p.description,
        p."imagePath",
        jsonb_agg(
          jsonb_build_object(
            'id', i.id,
            'name', i.name,
            'icon', i.icon
          )
        ) FILTER (WHERE i.id IS NOT NULL) AS ingredients,
        jsonb_build_object(
          'id', c.id,
          'name', c.name,
          'icon', c.icon
        ) AS category
      FROM products p
      LEFT JOIN _product_ingredient pi ON pi."B" = p.id
      LEFT JOIN ingredients i ON pi."A" = i.id
      LEFT JOIN product_category c ON p.product_category_id = c.id
      WHERE p.user_id = ${userId}::uuid AND p.id = ${id}::uuid
      GROUP BY p.id, c.id
      LIMIT 1
    `;

    return product
      ? {
          ...product,
          ingredients: product.ingredients,
          category: product.category.id ? product.category : null,
        }
      : null;
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
        categoryId: categoryId ?? null,
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
