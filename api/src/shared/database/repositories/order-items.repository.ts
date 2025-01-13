import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderItemsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.OrderItemCreateArgs) {
    return this.prismaService.orderItem.create(createDto);
  }

  findFirst(findFirstDto: Prisma.OrderItemFindFirstArgs) {
    return this.prismaService.orderItem.findFirst(findFirstDto);
  }

  findMany(findManyDto: Prisma.OrderItemFindManyArgs) {
    return this.prismaService.orderItem.findMany(findManyDto);
  }

  findUnique(findUniqueDto: Prisma.OrderItemFindUniqueArgs) {
    return this.prismaService.orderItem.findFirst(findUniqueDto);
  }

  update(updateDto: Prisma.OrderItemUpdateArgs) {
    return this.prismaService.orderItem.update(updateDto);
  }

  delete(deleteDto: Prisma.OrderItemDeleteArgs) {
    return this.prismaService.orderItem.delete(deleteDto);
  }
}
