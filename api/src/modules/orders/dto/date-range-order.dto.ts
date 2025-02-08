import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsDateString,
  Validate,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'DateRange', async: false })
export class DateRangeValidator implements ValidatorConstraintInterface {
  validate(value: any) {
    if (!value.startDate || !value.endDate) {
      return false;
    }

    const start = new Date(value.startDate);
    const end = new Date(value.endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return false;
    }

    return start <= end;
  }

  defaultMessage() {
    return 'A data de início deve ser anterior ou igual à data de término.';
  }
}

export class DateRangeDto {
  @IsNotEmpty({ message: 'A data de início é obrigatória.' })
  @IsDateString(
    {},
    { message: 'A data de início deve estar no formato YYYY-MM-DD.' },
  )
  @ApiProperty({ example: '2025-01-01', description: 'Data de início.' })
  startDate: string;

  @IsNotEmpty({ message: 'A data de término é obrigatória.' })
  @IsDateString(
    {},
    { message: 'A data de término deve estar no formato YYYY-MM-DD.' },
  )
  @ApiProperty({ example: '2026-01-31', description: 'Data de término.' })
  endDate: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => (value ? parseInt(value, 10) : value))
  @ApiProperty({
    example: 10,
    description: 'Número de resultados por página (limit)',
    required: false,
  })
  limit?: number = 10;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => (value ? parseInt(value, 10) : value))
  @ApiProperty({
    example: 0,
    description: 'Número de resultados a pular (offset)',
    required: false,
  })
  offset?: number = 0;

  @Validate(DateRangeValidator)
  get dateRange() {
    return { startDate: this.startDate, endDate: this.endDate };
  }
}
