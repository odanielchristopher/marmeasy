import { BadRequestException } from '@nestjs/common';
import { Client as PrismaClient } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum ClientType {
  FISICO = 'FISICO',
  JURIDICO = 'JURIDICO',
}

export class Client {
  @IsUUID()
  @IsNotEmpty({ message: 'O id é obrigatório.' })
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(2, { message: 'O nome precisa ter pelo menos 2 caracteres.' })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(11, { message: 'O número precisa ter no maximo 11 digitos.' })
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsNotEmpty({ message: 'O tipo é obrigatório.' })
  @IsEnum(ClientType)
  type: ClientType;

  @IsString()
  @IsOptional()
  @MinLength(11, { message: 'Um documento precisa ser válido.' })
  @MaxLength(14, { message: 'Um documento precisa ser válido.' })
  document?: string;

  @Transform(({ value }) => {
    try {
      return Number(value);
    } catch {
      throw new BadRequestException('Saldo deve ser válido.');
    }
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O saldo válido.' })
  @IsNotEmpty({ message: 'O saldo inicial é obrigatório.' })
  balance: number;

  active?: boolean;

  static parse(persistenteEntity: PrismaClient | null): Client {
    if (!persistenteEntity) {
      return null;
    }

    const { id, name, type, address, balance, document, phone } =
      persistenteEntity;

    return {
      id,
      name,
      balance,
      phone: phone ?? undefined,
      document: document ?? undefined,
      address: address ?? undefined,
      type: ClientType[type],
    };
  }
}
