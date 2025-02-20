import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ClientsController } from './clients.controller';
import { IClientsService } from './interfaces/clients-service.interface';
import { IUpdateClientBalanceService } from './interfaces/update-client-balance-service.interface';
import { IValidateClientOwnershipService } from './interfaces/validate-client-ownership-service.interface';
import { ClientsService } from './services/clients.service';
import { UpdateClientBalance } from './services/update-client-balance.service';
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
    {
      provide: IUpdateClientBalanceService,
      useClass: UpdateClientBalance,
    },
  ],
  exports: [
    {
      provide: IValidateClientOwnershipService,
      useClass: ValidateClientOwnershipService,
    },
    {
      provide: IUpdateClientBalanceService,
      useClass: UpdateClientBalance,
    },
  ],
})
export class ClientsModule {}
