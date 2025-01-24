import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsUUID,
} from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty({ message: 'O id do produto é obrigatório.' })
  @IsUUID('4', { message: 'O id do produto precisa ser um UUID válido.' })
  productId: string;

  @Transform(({ value }) => {
    try {
      return Number(value);
    } catch {
      throw new BadRequestException('Quantidade precisa ser um número válido.');
    }
  })
  @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
  @IsNumber({}, { message: 'A quantidade precisa ser um número válido.' })
  quantity: number;
}
