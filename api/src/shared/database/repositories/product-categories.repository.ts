import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductCategoriesRespository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(findManyDto: Prisma.ProductCategoryFindManyArgs) {
    return this.prismaService.productCategory.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.ProductCategoryFindFirstArgs) {
    return this.prismaService.productCategory.findFirst(findFirstDto);
  }

  create(createDto: Prisma.ProductCategoryCreateArgs) {
    return this.prismaService.productCategory.create(createDto);
  }

  update(updateDto: Prisma.ProductCategoryUpdateArgs) {
    return this.prismaService.productCategory.update(updateDto);
  }

  delete(deleteDto: Prisma.ProductCategoryDeleteArgs) {
    return this.prismaService.productCategory.delete(deleteDto);
  }
}
