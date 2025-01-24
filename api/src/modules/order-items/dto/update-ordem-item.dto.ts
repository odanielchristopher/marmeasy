import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateQuantityOrderItemDto {
  @Transform(({ value }) => {
    try {
      return Number(value);
    } catch {
      throw new BadRequestException('Quantidade precisa ser um número válido.');
    }
  })
  @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
  @IsInt()
  @IsNumber({}, { message: 'A quantidade precisa ser um número válido.' })
  quantity: number;

  @Transform(({ value }) => {
    try {
      return Number(value);
    } catch {
      throw new BadRequestException('Total precisa ser um número válido.');
    }
  })
  @IsNotEmpty({ message: 'O total é obrigatória.' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O total precisa ser um número válido.' },
  )
  total: number;
}
