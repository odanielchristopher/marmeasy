import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ClientsRepository } from './repositories/clients.repository';
import { IngredientsRepository } from './repositories/ingredients.repository';
import { ProductCategoriesRespository } from './repositories/product-categories.repository';
import { ProductsRespository } from './repositories/products.repository';
import { UsersRepository } from './repositories/users.repository';

@Global()
@Module({
  providers: [
    UsersRepository,
    PrismaService,
    ClientsRepository,
    ProductCategoriesRespository,
    IngredientsRepository,
    ProductsRespository,
    {
      provide: 'IUsersRepository',
      useClass: UsersRepository,
    },
    {
      provide: 'IClientsRepository',
      useClass: ClientsRepository,
    },
  ],
  exports: [
    ProductCategoriesRespository,
    IngredientsRepository,
    ProductsRespository,
    {
      provide: 'IUsersRepository',
      useClass: UsersRepository,
    },
    {
      provide: 'IClientsRepository',
      useClass: ClientsRepository,
    },
  ],
})
export class DatabaseModule {}
