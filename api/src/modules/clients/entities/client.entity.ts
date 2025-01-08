import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum ClientType {
  FISICO = 'FISICO',
  JURIDICO = 'JURIDICO',
}

export class Client {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  phone?: string | null;

  @IsString()
  @IsOptional()
  address?: string | null;

  @IsEnum(ClientType)
  type: ClientType;

  @IsString()
  @IsOptional()
  document?: string | null;

  @IsNumber()
  @IsNotEmpty()
  balance: number;
}
