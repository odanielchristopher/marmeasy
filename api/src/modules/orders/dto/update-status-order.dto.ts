import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../entities/status.entity';

export class UpdateStatusOrderDto {
  @IsNotEmpty({ message: 'O status é obrigatório.' })
  @IsEnum(OrderStatus, {
    message:
      'O status deve ser um dos valores permitidos: PENDING, PAID, CANCELED, SHIPPED, DELIVERED.',
  })
  status: OrderStatus;
}
