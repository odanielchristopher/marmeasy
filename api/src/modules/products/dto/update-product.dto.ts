import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends CreateProductDto {
  @IsUUID()
  @IsNotEmpty({ message: 'O id é obrigatório.' })
  @ApiProperty({
    example: 'f4e8ed1b-95c8-4bff-b28c-e4fd14ac4b9c',
    description: 'ID único do produto que será atualizado.',
  })
  id: string;
}
