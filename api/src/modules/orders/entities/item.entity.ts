import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class Item {
  @IsNotEmpty({ message: 'O id do produto é obrigatório.' })
  @IsUUID('4', { message: 'O id do produto precisa ser um UUID válido.' })
  productId: string;

  @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
  @IsNumber({}, { message: 'A quantidade precisa ser um número válido.' })
  quantity: number;

  @IsNotEmpty({ message: 'O preço unitário é obrigatório.' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O preço unitário precisa ser um número válido.' },
  )
  unitPrice: number;
}
