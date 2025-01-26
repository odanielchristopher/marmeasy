import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ClientsController } from './clients.controller';
import { IClientsService } from './interfaces/clients-service.interface';
import { IValidateClientOwnershipService } from './interfaces/validate-client-ownership-service.interface';
import { ClientsService } from './services/clients.service';
import { ValidateClientOwnershipService } from './services/validate-client-ownership.service';

@Module({
  imports: [UsersModule],
  controllers: [ClientsController],
  providers: [
    {
      provide: IClientsService,
      useClass: ClientsService,
    },
    {
      provide: IValidateClientOwnershipService,
      useClass: ValidateClientOwnershipService,
    },
  ],
})
export class ClientsModule {}
