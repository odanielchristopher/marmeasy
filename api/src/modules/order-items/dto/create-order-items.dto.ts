import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

interface ICreateOrderItemInput {
  name: string;
  ingredients: string[];
  unitPrice: number;
  quantity: number;
  total: number;
}

export class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @ApiProperty({
    example: 'Hambúrguer',
    description: 'Nome do item do pedido.',
  })
  name: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: ['Alface', 'Tomate', 'Queijo'],
    description: 'Lista de ingredientes do item do pedido.',
  })
  ingredients: string[];

  @Transform(({ value }) => {
    try {
      return Number(value);
    } catch {
      throw new BadRequestException(
        'Preço unitário precisa ser um número válido.',
      );
    }
  })
  @IsNumber()
  @IsNotEmpty({ message: 'O preço unitário é obrigatório.' })
  @ApiProperty({
    example: 10.99,
    description: 'Preço unitário do item.',
  })
  unitPrice: number;

  @Transform(({ value }) => {
    try {
      return Number(value);
    } catch {
      throw new BadRequestException(
        'Preço total precisa ser um número válido.',
      );
    }
  })
  @IsNumber()
  @IsNotEmpty({ message: 'O preço total é obrigatório.' })
  @ApiProperty({
    example: 21.98,
    description: 'Preço total do item (quantidade * preço unitário).',
  })
  total: number;

  @Transform(({ value }) => {
    try {
      return Number(value);
    } catch {
      throw new BadRequestException('Quantidade precisa ser um número válido.');
    }
  })
  @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
  @IsNumber({}, { message: 'A quantidade precisa ser um número válido.' })
  @ApiProperty({
    example: 2,
    description: 'Quantidade do item no pedido.',
  })
  quantity: number;
}
