import { BadRequestException } from '@nestjs/common';
import { IsDateString, IsNotEmpty, validateSync } from 'class-validator';

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

  constructor({ from, to }: { from: string; to: string }) {
    this.from = from;
    this.to = to;

    const errors = validateSync(this);

    if (errors.length > 0) {
      const messages = errors.flatMap((err) =>
        Object.values(err.constraints || {}),
      );
      throw new BadRequestException(messages);
    }
  }
}
