import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ClientsRespository } from './repositories/clients.repository';
import { IngredientsRespository } from './repositories/ingredients.repository';
import { ProductCategoriesRespository } from './repositories/product-categories.repository';
import { ProductsRespository } from './repositories/products.repository';
import { UsersRepository } from './repositories/users.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    ClientsRespository,
    ProductCategoriesRespository,
    IngredientsRespository,
    ProductsRespository,
  ],
  exports: [
    UsersRepository,
    ClientsRespository,
    ProductCategoriesRespository,
    IngredientsRespository,
    ProductsRespository,
  ],
})
export class DatabaseModule {}
