import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ClientsRespository } from './repositories/clients.repository';
import { IngredientsRespository } from './repositories/ingredients.repository';
import { ProductCategoriesRespository } from './repositories/product-categories.repository';
import { ProductsRespository } from './repositories/products.repository';
import { UsersRespository } from './repositories/users.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRespository,
    ClientsRespository,
    ProductCategoriesRespository,
    IngredientsRespository,
    ProductsRespository,
  ],
  exports: [
    UsersRespository,
    ClientsRespository,
    ProductCategoriesRespository,
    IngredientsRespository,
    ProductsRespository,
  ],
})
export class DatabaseModule {}
