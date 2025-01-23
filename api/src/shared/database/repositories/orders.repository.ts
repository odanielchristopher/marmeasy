import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrdersRespository {
  constructor(private readonly prismaService: PrismaService) {}
  
  create(createDto: Prisma.OrderCreateArgs) {
    return this.prismaService.order.create(createDto);
  }

  findMany(findManyDto: Prisma.OrderFindManyArgs) {
    return this.prismaService.order.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.OrderFindFirstArgs) {
    return this.prismaService.order.findFirst(findFirstDto);
  }

  findUnique(findFirstDto: Prisma.OrderFindUniqueArgs) {
    return this.prismaService.order.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.OrderUpdateArgs) {
    return this.prismaService.order.update(updateDto);
  }

  delete(deleteDto: Prisma.OrderDeleteArgs) {
    return this.prismaService.order.delete(deleteDto);
  }
}
