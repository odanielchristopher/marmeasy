import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategoryService } from './services/product-category.service';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.productCategoryService.findAllByUserId(userId);
  }

  @Get(':productCategory')
  findOne(
    @ActiveUserId() userId: string,
    @Param('productCategory', ParseUUIDPipe) productCategoryId: string,
  ) {
    return this.productCategoryService.findOneByUserId(
      userId,
      productCategoryId,
    );
  }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createProductCategoryDto: CreateProductCategoryDto,
  ) {
    return this.productCategoryService.create(userId, createProductCategoryDto);
  }

  @Put(':productCategory')
  update(
    @ActiveUserId() userId: string,
    @Param('productCategory', ParseUUIDPipe) productCategoryId: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoryService.update(
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
    return this.productCategoryService.remove(userId, productCategoryId);
  }
}
