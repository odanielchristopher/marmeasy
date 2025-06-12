import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { OrderEnum } from 'src/shared/types/order.enum';

export class PaginatedAndOrderedQueryDto {
  // eslint-disable-next-line quotes
  @IsEnum(OrderEnum, { message: "Deve ser um dos valores: 'asc' ou 'desc'" })
  @IsOptional()
  order: OrderEnum;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'A página precisa ser maior que zero.' })
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'O número por página precisa ser maior que zero.' })
  perPage = 20;
}
