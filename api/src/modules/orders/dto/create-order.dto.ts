import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { OrderItem } from 'src/modules/order-items/entities/order-item.entity';
export class CreateOrderDto {
  @IsNotEmpty({ message: 'O id do cliente é obrigatório.' })
  @IsString()
  @IsUUID('4', { message: 'O cliente precisa ter um id válido.' })
  clientId: string;

  @IsNotEmpty({ message: 'Os items não podem ser vazios.' })
  @IsArray({ message: 'Os items devem ser um array.' })
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O valor do desconto precisa ser um número válido.' },
  )
  discount: number;
}
