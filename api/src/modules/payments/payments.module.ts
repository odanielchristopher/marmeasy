import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { IPaymentsService } from './interfaces/payments-service.interface';
import { IValidatePaymentOwnershipService } from './interfaces/validate-payment-onwership-service.interface';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './services/payments.service';
import { ValidatePaymentOwnershipService } from './services/validate-payment-onwership.service';

@Module({
  imports: [ClientsModule],
  controllers: [PaymentsController],
  providers: [
    {
      provide: IPaymentsService,
      useClass: PaymentsService,
    },
    {
      provide: IValidatePaymentOwnershipService,
      useClass: ValidatePaymentOwnershipService,
    },
  ],
})
export class PaymentsModule {}
