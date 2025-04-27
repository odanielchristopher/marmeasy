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

  @IsOptional()
  @IsPhoneNumber('BR')
  phone?: string;

  @IsNotEmpty()
  @IsNumber()
  balance: number;
}
