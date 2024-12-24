import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ClientsRespository } from './repositories/clients.repository';
import { IngredientsRespository } from './repositories/ingredients.repository';
import { ProductCategoriesRespository } from './repositories/product-categories.repository';
import { UsersRespository } from './repositories/users.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRespository,
    ClientsRespository,
    ProductCategoriesRespository,
    IngredientsRespository,
  ],
  exports: [
    UsersRespository,
    ClientsRespository,
    ProductCategoriesRespository,
    IngredientsRespository,
  ],
})
export class DatabaseModule {}
