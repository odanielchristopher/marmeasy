import { IsNotEmpty, IsString } from 'class-validator';
import { IsEmoji } from 'src/shared/decorators/IsEmoji';

export class UpdateProductCategoryDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'Precisa ser um nome válido.' })
  name: string;

  @IsNotEmpty({ message: 'O emoji é obrigatório.' })
  @IsEmoji({ message: 'Precisa ser um emoji válido.' })
  icon: string;
}
