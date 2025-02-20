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

export class CreateClientDto {
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
  @MaxLength(11, { message: 'O número precisa ter no maximo 11 dígitos.' })
  @ApiProperty({
    example: '11987654321',
    description: 'Número de telefone do cliente (opcional).',
  })
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Rua das Flores, 123',
    description: 'Endereço do cliente (opcional).',
  })
  address?: string;

  @IsNotEmpty({ message: 'O tipo é obrigatório.' })
  @IsEnum(ClientType)
  @ApiProperty({
    example: ClientType['FISICO'],
    description: 'Tipo de cliente. Pode ser "FISICO" ou "JURIDICO".',
  })
  type: ClientType;

  @IsString()
  @IsOptional()
  @MinLength(11, { message: 'Um documento precisa ser válido.' })
  @MaxLength(14, { message: 'Um documento precisa ser válido.' })
  @ApiProperty({
    example: '12345678901',
    description: 'Número do documento do cliente, como CPF ou CNPJ.',
  })
  document?: string;

  @Transform(({ value }) => {
    try {
      return Number(value);
    } catch {
      throw new BadRequestException('Saldo deve ser válido.');
    }
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O saldo precisa ser um valor numérico válido.' },
  )
  @IsNotEmpty({ message: 'O saldo inicial é obrigatório.' })
  @ApiProperty({
    example: 1000.5,
    description: 'Saldo inicial do cliente.',
  })
  initialBalance: number;
}
