import { IsDateString, IsNotEmpty } from 'class-validator';

export class DateRangeDto {
  @IsNotEmpty({ message: 'A data de inicio é obrigatória.' })
  @IsDateString(
    {},
    { message: 'A data de inicio precisa ser um formato válido' },
  )
  from: string;

  @IsNotEmpty({ message: 'A data de fim é obrigatória.' })
  @IsDateString({}, { message: 'A data de fim precisa ser um formato válido' })
  to: string;
}
