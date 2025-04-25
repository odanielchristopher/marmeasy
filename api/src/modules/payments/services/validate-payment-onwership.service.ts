import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPaymentsRepository } from 'src/shared/database/interfaces/payments-repository.interface';
import { Payment } from '../entities/payment.entity';
import { IValidatePaymentOwnershipService } from '../interfaces/validate-payment-onwership-service.interface';

@Injectable()
export class ValidatePaymentOwnershipService
  implements IValidatePaymentOwnershipService
{
  constructor(
    @Inject(IPaymentsRepository)
    private readonly paymentsRepository: IPaymentsRepository,
  ) {}

  async validate(userId: string, paymentId: string): Promise<Payment> {
    const isOwner = await this.paymentsRepository.findFirstByUserId({
      userId,
      id: paymentId,
    });

    if (!isOwner) {
      throw new NotFoundException('Pagamento não encontrado.');
    }

    return isOwner;
  }
}
