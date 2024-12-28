import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ClientsController } from './clients.controller';
import { ClientsService } from './services/clients.service';
import { ValidateClientOwnershipService } from './services/validate-client-ownership.service';

@Module({
  imports: [UsersModule],
  controllers: [ClientsController],
  providers: [ClientsService, ValidateClientOwnershipService],
})
export class ClientsModule {}
