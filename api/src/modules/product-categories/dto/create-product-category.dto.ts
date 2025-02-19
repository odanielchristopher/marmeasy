import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsEmoji } from 'src/shared/decorators/IsEmoji';

export class CreateProductCategoryDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'Precisa ser um nome válido.' })
  @ApiProperty({
    example: 'Bebidas',
    description: 'Nome da categoria do produto.',
  })
  name: string;

  @IsNotEmpty({ message: 'O emoji é obrigatório.' })
  @IsEmoji({ message: 'Precisa ser um emoji válido.' })
  @ApiProperty({
    example: '🍹',
    description: 'Ícone (emoji) da categoria.',
  })
  icon: string;
}
