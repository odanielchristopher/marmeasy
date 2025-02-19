import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../entities/status.entity';

export class UpdateStatusOrderDto {
  @IsNotEmpty({ message: 'O status é obrigatório.' })
  @IsEnum(OrderStatus, {
    message: 'O status deve ser um dos valores permitidos: PENDING ou PAID.',
  })
  @ApiProperty({
    example: 'PAID',
    description: 'Status atualizado do pedido.',
    enum: OrderStatus,
  })
  status: OrderStatus;
}
