import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ClientsRespository } from './repositories/clients.repository';
import { IngredientsRespository } from './repositories/ingredients.repository';
import { ProductCategoriesRespository } from './repositories/product-categories.repository';
import { ProductsRespository } from './repositories/products.repository';
import { UsersRespository } from './repositories/users.repository';
import { OrderItemsRepository } from './repositories/order-items.repository';
import { OrdersRespository } from './repositories/orders.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRespository,
    ClientsRespository,
    ProductCategoriesRespository,
    IngredientsRespository,
    ProductsRespository,
    OrdersRespository,
    OrderItemsRepository
  ],
  exports: [
    UsersRespository,
    ClientsRespository,
    ProductCategoriesRespository,
    IngredientsRespository,
    ProductsRespository,
    OrdersRespository,
    OrderItemsRepository
  ],
})
export class DatabaseModule {}
