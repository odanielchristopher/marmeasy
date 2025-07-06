import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { CustomerType } from 'src/modules/customers/entities/customer.entity';
import { OrderEnum } from 'src/shared/types/order.enum';
import { OrderType } from '../entities/order.entity';

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

export class FilterPaginatedDto extends PaginatedAndOrderedQueryDto {
  @IsEnum(CustomerType)
  @IsOptional()
  customerType?: CustomerType;

  @IsEnum(OrderType)
  @IsOptional()
  orderType?: OrderType;

  @IsString()
  @IsOptional()
  searchTerm?: string;
}
