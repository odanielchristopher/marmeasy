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
}
