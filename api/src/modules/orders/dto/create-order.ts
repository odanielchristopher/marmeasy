import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsUUID,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Id do cliente',
    example: 'a0e1c2d3-e4f5-6789-abcd-ef0123456789',
    type: String,
    format: 'uuid',
    required: true,
    nullable: false,
  })
  @IsNotEmpty({ message: 'O id do cliente é obrigatório.' })
  @IsUUID('4', { message: 'O id do cliente deve ser um UUID válido.' })
  customerId: string;

  @ApiProperty({
    description: 'Data do pedido',
    example: '2025-01-26T12:00:00.000Z',
    type: String,
    format: 'date-time',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'Tipo do pedido',
    enum: ['BREAKFAST', 'LUNCH', 'DINNER'],
    example: 'LUNCH',
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsEnum(['BREAKFAST', 'LUNCH', 'DINNER'], {
    message: 'O tipo do pedido deve ser BREAKFAST, LUNCH ou DINNER.',
  })
  type: 'BREAKFAST' | 'LUNCH' | 'DINNER';

  @ApiProperty({
    description: 'Valor do pedido',
    example: 150.75,
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
