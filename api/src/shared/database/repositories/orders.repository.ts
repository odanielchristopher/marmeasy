import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrdersRespository {
  constructor(private readonly prismaService: PrismaService) {}
  
  create(createDto: Prisma.OrderCreateArgs) {
    return this.prismaService.order.create(createDto);
  }

}
