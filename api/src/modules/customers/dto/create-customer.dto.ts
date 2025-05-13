import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { CustomerType } from '../entities/customer.entity';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(CustomerType)
  @IsNotEmpty()
  type: CustomerType;

  @IsHexColor()
  @IsNotEmpty()
  color: string;

  @IsPhoneNumber('BR')
  @IsOptional()
  phone?: string;

  @IsNotEmpty()
  @IsNumber()
  initialBalance: number;
}
