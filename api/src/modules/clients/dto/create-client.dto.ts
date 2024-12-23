import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ClientType } from '../entities/Client';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(2, { message: 'O nome precisa ter pelo menos 2 caracteres.' })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(11, { message: 'O número precisa ter no maximo 11 digitos.' })
  phone: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsNotEmpty({ message: 'O tipo do cliente é obrigatório.' })
  @IsEnum(ClientType)
  type: ClientType;

  @IsString()
  @IsOptional()
  @MinLength(11, { message: 'Um CPF precisa ser válido.' })
  @MaxLength(14)
  document: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;
}
