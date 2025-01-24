import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ClientsRespository } from './repositories/clients.repository';
import { IngredientsRespository } from './repositories/ingredients.repository';
import { OrderItemsRepository } from './repositories/order-items.repository';
import { OrdersRespository } from './repositories/orders.repository';
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
    OrdersRespository,
    OrderItemsRepository
  ],
  exports: [
    UsersRepository,
    ClientsRespository,
    ProductCategoriesRespository,
    IngredientsRespository,
    ProductsRespository,
    OrdersRespository,
    OrderItemsRepository
  ],
})
export class DatabaseModule {}
