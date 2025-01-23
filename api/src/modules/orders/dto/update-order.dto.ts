import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UpdateOrderDto {
  @Transform(({ value }) => Number(value))
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O valor do desconto precisa ser um número válido.' },
  )
  discount: number;
}
