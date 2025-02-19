import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'Coca-Cola',
    description: 'Nome do produto.',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Refrigerante de cola, 350ml',
    description: 'Descrição detalhada do produto.',
  })
  description?: string;

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
  @ApiProperty({
    example: 5.99,
    description: 'Preço do produto.',
  })
  price: number;

  @IsOptional()
  @IsString()
  @IsUUID('4', { message: 'A categoria precisa ter um id válido.' })
  @ApiProperty({
    example: 'f4e8ed1b-95c8-4bff-b28c-e4fd14ac4b9c',
    description: 'ID da categoria do produto.',
  })
  categoryId?: string;

  @IsOptional()
  @Transform(({ value }) => {
    // Converte o valor enviado (string JSON) para array
    try {
      return JSON.parse(value); // Converte o JSON stringificado em array
    } catch {
      throw new BadRequestException(
        'Os ingredientes devem ser passados como um array válido.',
      );
    }
  })
  @IsArray({ message: 'Os ingredientes devem ser passados como um array.' })
  @IsUUID('4', {
    each: true,
    message: 'Cada ingrediente precisa ter um UUID válido.',
  })
  @ApiProperty({
    example: ['b4e8ed1b-95c8-4bff-b28c-e4fd14ac4b9c'],
    description: 'Lista de IDs de ingredientes relacionados ao produto.',
  })
  ingredientsIds?: string[];

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '/images/coca-cola.jpg',
    description: 'Caminho da imagem do produto.',
  })
  imagePath?: string;
}
