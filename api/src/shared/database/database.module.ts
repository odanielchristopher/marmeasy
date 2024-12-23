import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ClientsRespository } from './repositories/clients.repository';
import { UsersRespository } from './repositories/users.repository';

@Global()
@Module({
  providers: [PrismaService, UsersRespository, ClientsRespository],
  exports: [UsersRespository, ClientsRespository],
})
export class DatabaseModule {}
