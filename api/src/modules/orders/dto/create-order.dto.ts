import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Min,
  Validate,
  ValidateNested,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { OrderType } from '../entities/order.entity';

@ValidatorConstraint({ name: 'maxTwoDecimalPlaces', async: false })
export class MaxTwoDecimalPlaces implements ValidatorConstraintInterface {
  validate(value: number) {
    if (value === undefined || value === null) return true; // Não valida se não existe valor
    return /^\d+(\.\d{1,2})?$/.test(value.toString());
  }
  defaultMessage() {
    return 'O preço deve ter no máximo 2 casas decimais.';
  }
}
export class CreateOrderItemDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsUUID('4', { message: 'O id do produto deve ser um UUID válido.' })
  productId: string;

  @ApiProperty({ type: 'number' })
  @IsInt({ message: 'A quantidade deve ser um número inteiro.' })
  @Min(1, { message: 'A quantidade deve ser maior que zero.' })
  quantity: number;

  @ApiProperty({ type: 'number', example: 10.66 })
  @IsNumber({}, { message: 'O preço unitário deve ser um número.' })
  @Min(0.01, { message: 'O preço unitário deve ser maior que zero.' })
  @Validate(MaxTwoDecimalPlaces)
  unitPrice: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Id do cliente',
    example: 'a0e1c2d3-e4f5-6789-abcd-ef0123456789',
    type: String,
    format: 'uuid',
    required: true,
    nullable: false,
  })
  @IsNotEmpty({ message: 'O id do cliente é obrigatório.' })
  @IsUUID('4', { message: 'O id do cliente deve ser um UUID válido.' })
  customerId: string;

  @ApiProperty({
    description: 'Data do pedido',
    example: '2025-01-26T12:00:00.000Z',
    type: Date,
    format: 'date-time',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({
    description: 'Tipo do pedido',
    enum: OrderType,
    example: 'LUNCH',
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsEnum(OrderType, {
    message: 'O tipo do pedido deve ser BREAKFAST, LUNCH ou DINNER.',
  })
  type: OrderType;

  @ApiProperty({
    description: 'Itens do pedido',
    type: [CreateOrderItemDto],
    required: true,
    nullable: false,
    isArray: true,
  })
  @IsNotEmpty({ message: 'Os itens do pedido são obrigatórios.' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
