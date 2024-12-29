import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
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
import { ProductsService } from './products.service';

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

  @Get(':productId')
  findOne(
    @ActiveUserId() userId: string,
    @Param('productId') productId: string,
  ) {
    return this.productsService.findOneByUserId(userId, productId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @ActiveUserId() userId: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    // createProductDto = {
    //   ...createProductDto,
    //   imagePath: image.path,
    // };

    // return this.productsService.create(userId, createProductDto);

    if (image && !image.mimetype.startsWith('image/')) {
      throw new BadRequestException('Formato de arquivo inválido.');
    }

    return { image };
  }

  @Put(':productId')
  update(
    @ActiveUserId() userId: string,
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(userId, productId, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
