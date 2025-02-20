import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { PaymentType } from '../entities/payment.entity';

export class CreatePaymentDto {
  @IsUUID()
  @IsNotEmpty({ message: 'O id é obrigatório.' })
  @ApiProperty({
    example: 'f4e8ed1b-95c8-4bff-b28c-e4fd14ac4b9c',
    description: 'ID único do cliente que será associado.',
  })
  clientId: string;

  @ApiProperty({
    description: 'O tipo do pagamento',
    enum: PaymentType,
    example: PaymentType.CASH,
  })
  @IsEnum(PaymentType)
  @IsNotEmpty({ message: 'O tipo do pagamento é obrigatório.' })
  type: PaymentType;

  @ApiProperty({
    description: 'A data do pagamento em formato ISO 8601',
    example: '2025-01-26T12:00:00.000Z',
  })
  @IsNotEmpty({ message: 'A data é obrigatória.' })
  @IsDateString({}, { message: 'A data precisa ser um formato válido' })
  date: string;

  @ApiProperty({
    description: 'O valor do pagamento',
    example: 150.75,
  })
  @IsNumber({}, { message: 'O valor precisa ser um número válido.' })
  @IsNotEmpty({ message: 'O valor é obrigatório.' })
  value: number;
}
