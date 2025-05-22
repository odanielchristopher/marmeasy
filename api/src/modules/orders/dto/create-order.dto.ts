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

  @ApiProperty({
    description: 'Itens do pedido',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        productId: {
          type: 'string',
          format: 'uuid',
        },
        quantity: {
          type: 'number',
        },
        unitPrice: {
          type: 'number',
        },
      },
    },
  })
  @IsNotEmpty({ message: 'Os itens do pedido são obrigatórios.' })
  @IsUUID('4', {
    each: true,
    message: 'O id do produto deve ser um UUID válido.',
  })
  @IsNumber()
  @IsNotEmpty({ message: 'A quantidade do produto é obrigatória.' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'O valor unitário deve ser um número com até 2 casas decimais.',
    },
  )
  @IsNotEmpty({ message: 'O valor unitário do produto é obrigatório.' })
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
}
