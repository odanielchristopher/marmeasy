import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateOrderItemDto } from 'src/modules/order-items/dto/create-order-items.dto';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'O id do cliente é obrigatório.' })
  @IsString()
  @IsUUID('4', { message: 'O cliente precisa ter um id válido.' })
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Id do cliente que está realizando o pedido.',
  })
  clientId: string;

  @IsNotEmpty({ message: 'Os items não podem ser vazios.' })
  @IsArray({ message: 'Os items devem ser um array.' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @ApiProperty({
    type: [CreateOrderItemDto],
    description:
      'Lista de itens do pedido. Cada item inclui detalhes como nome, quantidade e preço.',
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Marmita de Frango',
        ingredients: ['Frango', 'Arroz', 'Feijão'],
        unitPrice: 12.5,
        total: 25.0,
        quantity: 2,
        orderId: '987e6543-b21c-34d5-a789-123456789abc',
      },
    ],
  })
  items: CreateOrderItemDto[];

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '2025-01-26T14:00:00.000Z',
    description:
      'Data do pedido (opcional). Se não informada, a data atual será utilizada.',
  })
  date?: string;

  @IsNumber({}, { message: 'O valor precisa ser um valor válido.' })
  @IsOptional()
  total?: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O valor do desconto precisa ser um número válido.' },
  )
  @ApiProperty({
    example: 5.0,
    description:
      'Desconto aplicado ao pedido (opcional). Deve ser um valor numérico.',
  })
  discount: number;
}
