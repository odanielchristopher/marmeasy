import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'O nome do produto é obrigatório.' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @Transform(({ value }) => {
    try {
      return Number(value);
    } catch {
      throw new BadRequestException(
        'O valor do produto precisa ser um número válido.',
      );
    }
  })
  @IsNotEmpty({ message: 'O valor do produto é obrigatório.' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O valor do produto precisa ser um número válido.' },
  )
  price: number;

  @IsNotEmpty({ message: 'O id da categoria do produto é obrigatório.' })
  @IsString()
  @IsUUID('4', { message: 'A categoria precisa ter um id válido.' })
  categoryId: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value;
    }
    throw new BadRequestException(
      'Os ingredientes devem ser passados como um array válido.',
    );
  })
  @IsArray({ message: 'Os ingredientes devem ser passados como um array.' })
  @IsUUID('4', {
    each: true,
    message: 'Cada ingrediente precisa ter um UUID válido.',
  })
  ingredientsIds: string[];
}

