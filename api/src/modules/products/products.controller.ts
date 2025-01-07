import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query('category') categoryName: string,
  ) {
    return this.productsService.findAllByUserId(userId, categoryName);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @ActiveUserId() userId: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(userId, createProductDto, image);
  }

  @Put(':productId')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @ActiveUserId() userId: string,
    @Param('productId') productId: string,
    @Query('removeImage') removeImage: boolean,
    @UploadedFile() image: Express.Multer.File,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(
      userId,
      productId,
      removeImage,
      updateProductDto,
      image,
    );
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('productId') productId: string,
  ) {
    return this.productsService.remove(userId, productId);
  }
}
