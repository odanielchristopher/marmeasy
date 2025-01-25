import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends CreateProductDto {
  @IsUUID()
  @IsNotEmpty({ message: 'O id é obrigatório.' })
  id: string;
}
