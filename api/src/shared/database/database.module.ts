import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ClientsRespository } from './repositories/clients.repository';
import { ProductCategoryRespository } from './repositories/product-category.repository';
import { UsersRespository } from './repositories/users.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRespository,
    ClientsRespository,
    ProductCategoryRespository,
  ],
  exports: [UsersRespository, ClientsRespository, ProductCategoryRespository],
})
export class DatabaseModule {}
