import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { IProductCategoriesService } from './interfaces/product-categories-service.interface';

@Controller('product-categories')
export class ProductCategoriesController {
  constructor(
    @Inject('IProductCategoriesService')
    private readonly productCategoriesService: IProductCategoriesService,
  ) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.productCategoriesService.findAllByUserId(userId);
  }

  @Get(':productCategory')
  findOne(
    @ActiveUserId() userId: string,
    @Param('productCategory', ParseUUIDPipe) productCategoryId: string,
  ) {
    return this.productCategoriesService.findOneByUserId(
      userId,
      productCategoryId,
    );
  }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createProductCategoryDto: CreateProductCategoryDto,
  ) {
    return this.productCategoriesService.create(
      userId,
      createProductCategoryDto,
    );
  }

  @Put(':productCategory')
  update(
    @ActiveUserId() userId: string,
    @Param('productCategory', ParseUUIDPipe) productCategoryId: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoriesService.update(
      userId,
      productCategoryId,
      updateProductCategoryDto,
    );
  }

  @Delete(':productCategory')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('productCategory', ParseUUIDPipe) productCategoryId: string,
  ) {
    return this.productCategoriesService.remove(userId, productCategoryId);
  }
}
