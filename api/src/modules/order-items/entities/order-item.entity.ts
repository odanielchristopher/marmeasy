import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class OrderItem {
  @IsUUID('4', { message: 'O id precisa ser um UUID válido.' })
  @IsNotEmpty({ message: 'O id é obrigatório.' })
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Identificador único do item.',
  })
  id: string;

  @IsString({ message: 'O nome precisa ser uma string.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @ApiProperty({
    example: 'Marmita de Frango',
    description: 'Nome do item.',
  })
  name: string;

  @IsArray({ message: 'Os ingredientes devem ser uma lista de strings.' })
  @IsOptional()
  @ApiProperty({
    example: ['Frango', 'Arroz', 'Feijão'],
    description: 'Lista de ingredientes do item (opcional).',
  })
  ingredients: string[];

  @IsNumber({}, { message: 'O preço unitário deve ser um número válido.' })
  @IsNotEmpty({ message: 'O preço unitário é obrigatório.' })
  @ApiProperty({
    example: 12.5,
    description: 'Preço unitário do item.',
  })
  unitPrice: number;

  @IsNumber({}, { message: 'O preço total deve ser um número válido.' })
  @IsNotEmpty({ message: 'O preço total é obrigatório.' })
  @ApiProperty({
    example: 25.0,
    description: 'Preço total do item (quantidade * preço unitário).',
  })
  total: number;

  @IsNumber({}, { message: 'A quantidade deve ser um número válido.' })
  @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
  @ApiProperty({
    example: 2,
    description: 'Quantidade do item.',
  })
  quantity: number;

  @IsUUID('4', { message: 'O id do pedido precisa ser um UUID válido.' })
  @IsNotEmpty({ message: 'O id do pedido é obrigatório.' })
  @ApiProperty({
    example: '987e6543-b21c-34d5-a789-123456789abc',
    description: 'Identificador único do pedido associado.',
  })
  orderId: string;
}
