import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsEmoji } from 'src/shared/decorators/IsEmoji';

export class ProductCategory {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmoji()
  icon: string;
}
