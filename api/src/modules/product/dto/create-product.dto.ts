import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'O nome do produto é obrigatório.' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'A descrição do produto é obrigatório.' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'O valor do priduto é obrigatório.' })
  @IsString()
  price: number;

  @IsNotEmpty({ message: 'O id da categoria do produto é obrigatório.' })
  @IsString()
  @IsUUID()
  categoryId: string;
}
