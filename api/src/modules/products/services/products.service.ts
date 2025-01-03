import { Injectable } from '@nestjs/common';
import { ValidateUserOwnershipService } from 'src/modules/users/services/validate-user-ownership.service';
import { ProductsRespository } from 'src/shared/database/repositories/products.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProducImagesService } from './product-images.service';
import { ValidateProductOwnershipService } from './validate-product-ownership.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRespository,
    private readonly validateUserOwnershipService: ValidateUserOwnershipService,
    private readonly validateProductOwnershipService: ValidateProductOwnershipService,
    private readonly productImagesService: ProducImagesService,
  ) {}

  findAllByUserId(userId: string, categoryName: string) {
    const filters = {
      userId,
      ...(categoryName && { category: { name: categoryName } }),
    };

    return this.productsRepository.findMany({
      where: filters,
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

  async create(
    userId: string,
    createProductDto: CreateProductDto,
    image?: Express.Multer.File,
  ) {
    await this.validateUserOwnershipService.validate(userId);

    const { name, description, price, categoryId, ingredientsIds } =
      createProductDto;

    let imagePath: string;

    if (image) {
      const path = await this.productImagesService.upload(image);

      imagePath = path.imagePath;
    }

    return this.productsRepository.create({
      data: {
        userId,
        name,
        description,
        price,
        imagePath,
        categoryId,
        ingredients: {
          connect: ingredientsIds ? ingredientsIds.map((id) => ({ id })) : [],
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

  async update(
    userId: string,
    productId: string,
    removeImage: boolean,
    updateProductDto: UpdateProductDto,
    image?: Express.Multer.File,
  ) {
    const currentProduct = await this.validateProductOwnershipService.validate(
      userId,
      productId,
    );

    const { name, categoryId, description, ingredientsIds, price } =
      updateProductDto;

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
      where: { userId, id: productId },
      data: {
        name,
        description,
        price,
        imagePath: updatedImagePath,
        categoryId,
        ingredients: {
          set: [], // Limpa os ingredientes antigos
          connect: ingredientsIds ? ingredientsIds.map((id) => ({ id })) : [],
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

  async remove(userId: string, productId: string) {
    const product = await this.validateProductOwnershipService.validate(
      userId,
      productId,
    );

    if (product.imagePath) {
      await this.productImagesService.remove(product.imagePath);
    }

    await this.productsRepository.delete({
      where: { userId, id: productId },
    });

    return null;
  }
}
