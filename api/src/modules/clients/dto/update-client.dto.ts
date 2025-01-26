import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
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

export class UpdateClientDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(2, { message: 'O nome precisa ter pelo menos 2 caracteres.' })
  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome completo do cliente.',
  })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(11, { message: 'O número precisa ter no máximo 11 dígitos.' })
  @ApiProperty({
    example: '11987654321',
    description: 'Número de telefone do cliente.',
  })
  phone: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Rua Exemplo, 123',
    description: 'Endereço do cliente.',
  })
  address: string;

  @IsNotEmpty({ message: 'O tipo do cliente é obrigatório.' })
  @IsEnum(ClientType)
  @ApiProperty({
    example: ClientType['FISICO'],
    description: 'Tipo de cliente (ex: FISICO ou JURIDICO).',
  })
  type: ClientType;

  @IsString()
  @IsOptional()
  @MinLength(11, { message: 'Um CPF precisa ser válido.' })
  @MaxLength(14)
  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF ou CNPJ do cliente (se aplicável).',
  })
  document: string;

  @Transform(({ value }) => {
    try {
      return Number(value);
    } catch {
      throw new BadRequestException('O valor do saldo deve ser numérico.');
    }
  })
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 5000.75,
    description: 'Saldo atual do cliente.',
  })
  balance: number;
}
