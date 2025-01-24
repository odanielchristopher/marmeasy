import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class Item {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsArray()
  @IsOptional()
  ingredients: string[];

  @IsNumber()
  @IsNotEmpty({ message: 'O preço unitário é obrigatório.' })
  unitPrice: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O preço total é obrigatório.' })
  total: number;

  @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
  @IsNumber({}, { message: 'A quantidade precisa ser um número válido.' })
  quantity: number;
}
