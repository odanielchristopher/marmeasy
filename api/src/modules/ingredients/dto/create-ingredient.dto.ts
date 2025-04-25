import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsEmoji } from 'src/shared/decorators/IsEmoji';

export class CreateIngredientDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'Precisa ser um nome válido.' })
  @ApiProperty({
    example: 'Tomate',
    description: 'Nome do ingrediente.',
  })
  name: string;

  @IsNotEmpty({ message: 'O emoji é obrigatório.' })
  @IsEmoji({ message: 'Precisa ser um emoji válido.' })
  @ApiProperty({
    example: '🍅',
    description: 'Ícone do ingrediente em forma de emoji.',
  })
  icon: string;
}
