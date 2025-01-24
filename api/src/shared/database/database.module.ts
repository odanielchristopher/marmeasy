import { Global, Module } from '@nestjs/common';
import { IIngredientsRepository } from './interfaces/ingredients-repository.interface';
import { IProductCategoriesRepository } from './interfaces/product-categories-repository.interface';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { PrismaService } from './prisma.service';
import { ClientsRespository } from './repositories/clients.repository';
import { IngredientsRepository } from './repositories/ingredients.repository';
import { OrderItemsRepository } from './repositories/order-items.repository';
import { OrdersRespository } from './repositories/orders.repository';
import { ProductCategoriesRepository } from './repositories/product-categories.repository';
import { ProductsRespository } from './repositories/products.repository';
import { UsersRepository } from './repositories/users.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    ClientsRespository,
    ProductCategoriesRepository,
    IngredientsRepository,
    ProductsRespository,
    OrdersRespository,
    OrderItemsRepository,
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
    ClientsRespository,
    ProductCategoriesRepository,
    ProductsRespository,
    OrdersRespository,
    OrderItemsRepository,
  ],
})
export class DatabaseModule {}
