import { Global, Module } from '@nestjs/common';
import { IClientsRepository } from './interfaces/clients-repository.interface';
import { IIngredientsRepository } from './interfaces/ingredients-repository.interface';
import { IProductCategoriesRepository } from './interfaces/product-categories-repository.interface';
import { IProductsRepository } from './interfaces/products-repository.interface';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { PrismaService } from './prisma.service';
import { ClientsRepository } from './repositories/clients.repository';
import { IngredientsRepository } from './repositories/ingredients.repository';
import { OrderItemsRepository } from './repositories/order-items.repository';
import { OrdersRespository } from './repositories/orders.repository';
import { ProductCategoriesRepository } from './repositories/product-categories.repository';
import { ProductsRepository } from './repositories/products.repository';
import { UsersRepository } from './repositories/users.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    OrdersRespository,
    OrderItemsRepository,
    {
      provide: IProductsRepository,
      useClass: ProductsRepository,
    },
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
    {
      provide: IProductCategoriesRepository,
      useClass: ProductCategoriesRepository,
    },
    {
      provide: IIngredientsRepository,
      useClass: IngredientsRepository,
    },
    {
      provide: IClientsRepository,
      useClass: ClientsRepository,
    },
  ],
  exports: [
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
    {
      provide: IProductCategoriesRepository,
      useClass: ProductCategoriesRepository,
    },
    {
      provide: IIngredientsRepository,
      useClass: IngredientsRepository,
    },
    {
      provide: IClientsRepository,
      useClass: ClientsRepository,
    },
    {
      provide: IProductsRepository,
      useClass: ProductsRepository,
    },
    OrdersRespository,
    OrderItemsRepository,
  ],
})
export class DatabaseModule {}
