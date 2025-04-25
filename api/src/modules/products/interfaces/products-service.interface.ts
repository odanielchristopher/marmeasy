import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

export const IProductsService = Symbol('IProductsService');

export interface IProductsService {
  findAllByUserId(userId: string, categoryName: string): Promise<Product[]>;
  create(
    userId: string,
    createProductDto: CreateProductDto,
    image?: Express.Multer.File,
  ): Promise<Product>;
  update(
    userId: string,
    productId: string,
    removeImage: boolean,
    updateProductDto: UpdateProductDto,
    image?: Express.Multer.File,
  ): Promise<Product>;

  remove(userId: string, productId: string): Promise<void>;
}
