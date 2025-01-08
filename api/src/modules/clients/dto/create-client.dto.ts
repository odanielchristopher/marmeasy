import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ClientType } from '../entities/client.entity';

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

  @IsNotEmpty({ message: 'O tipo é obrigatório.' })
  @IsEnum(ClientType)
  type: ClientType;

  @IsString()
  @IsOptional()
  @MinLength(11, { message: 'Um documento precisa ser válido.' })
  @MaxLength(14, { message: 'Um documento precisa ser válido.' })
  document: string;

  @Transform(({ value }) => {
    try {
      return Number(value);
    } catch {
      throw new BadRequestException('Saldo deve ser válido.');
    }
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O saldo válido.' })
  @IsNotEmpty({ message: 'O saldo inicial é obrigatório.' })
  initialBalance: number;
}
