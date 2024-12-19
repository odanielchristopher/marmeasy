import { Global, Module } from '@nestjs/common';
import { UsersRespository } from '../repositories/users.repository';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService, UsersRespository],
  exports: [UsersRespository],
})
export class DatabaseModule {}
