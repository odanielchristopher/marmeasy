import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ExpenseType } from '../entities/expense.entity';

export class CreateExpenseDto {
  @ApiProperty({
    description: 'O tipo do gasto',
    enum: ExpenseType,
    example: ExpenseType.DELIVERY,
  })
  @IsEnum(ExpenseType)
  @IsNotEmpty({ message: 'O tipo do gasto é obrigatório.' })
  type: ExpenseType;

  @ApiProperty({
    description: 'A data do gasto em formato ISO 8601',
    example: '2025-01-26T12:00:00.000Z',
  })
  @IsNotEmpty({ message: 'A data é obrigatória.' })
  @IsDateString({}, { message: 'A data precisa ser um formato válido' })
  date: string;

  @ApiProperty({
    description: 'O valor do gasto',
    example: 150.75,
  })
  @IsNumber({}, { message: 'O valor precisa ser um número válido.' })
  @IsNotEmpty({ message: 'O valor é obrigatório.' })
  value: number;
}
