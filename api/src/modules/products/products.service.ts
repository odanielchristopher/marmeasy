import { Injectable } from '@nestjs/common';
import { ProductsRespository } from 'src/shared/database/repositories/products.repository';
import { ValidateUserOwnershipService } from '../users/services/validate-user-ownership.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRespository,
    private readonly validateUserOwnershipService: ValidateUserOwnershipService,
  ) {}

  async create(userId: string, createProductDto: CreateProductDto) {
    await this.validateUserOwnershipService.validate(userId);

    const { name, description, price, imagePath, categoryId, ingredientsIds } =
      createProductDto;

    return this.productsRepository.create({
      data: {
        userId,
        name,
        description,
        price,
        imagePath,
        categoryId,
        ingredients: {
          connect: ingredientsIds.map((id) => ({ id })),
        },
      },
      select: {
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
      },
    });
  }

  findAll() {
    return 'This action returns all product';
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
