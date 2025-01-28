import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsDateString,
  Validate,
  ValidateIf,
} from 'class-validator';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'DateRange', async: false })
export class DateRangeValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const { startDate, endDate } = value;

    if (!startDate || !endDate) {
      return true;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return false;
    }

    return start <= end;
  }

  defaultMessage(args: ValidationArguments) {
    return 'A data de início deve ser anterior ou igual à data de término.';
  }
}

export class DateRangeDto {
  @IsNotEmpty({ message: 'A data de início é obrigatória.' })
  @IsDateString(
    {},
    { message: 'A data de início deve estar no formato YYYY-MM-DD.' },
  )
  @ApiProperty({
    example: '2025-01-01',
    description: 'Data de início do intervalo no formato YYYY-MM-DD.',
  })
  startDate: string;

  @IsNotEmpty({ message: 'A data de término é obrigatória.' })
  @IsDateString(
    {},
    { message: 'A data de término deve estar no formato YYYY-MM-DD.' },
  )
  @ApiProperty({
    example: '2025-01-31',
    description: 'Data de término do intervalo no formato YYYY-MM-DD.',
  })
  endDate: string;

  @IsOptional()
  @ApiProperty({
    example: true,
    description:
      'Indica se as datas devem incluir o início e o término no filtro.',
  })
  inclusive?: boolean;

  @Validate(DateRangeValidator, {
    message: 'O intervalo de datas fornecido não é válido.',
  })
  validateDateRange() {
    return { startDate: this.startDate, endDate: this.endDate };
  }
}
