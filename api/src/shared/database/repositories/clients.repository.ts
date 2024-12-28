import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ClientsRespository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(findManyDto: Prisma.ClientFindManyArgs) {
    return this.prismaService.client.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.ClientFindFirstArgs) {
    return this.prismaService.client.findFirst(findFirstDto);
  }

  create(createDto: Prisma.ClientCreateArgs) {
    return this.prismaService.client.create(createDto);
  }

  update(updateDto: Prisma.ClientUpdateArgs) {
    return this.prismaService.client.update(updateDto);
  }

  delete(deleteDto: Prisma.ClientDeleteArgs) {
    return this.prismaService.client.delete(deleteDto);
  }
}
