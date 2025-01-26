import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateQuantityOrderItemDto {
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
  @IsInt({ message: 'A quantidade precisa ser um número válido.' })
  @ApiProperty({
    example: 5,
    description: 'Quantidade atualizada do item no pedido.',
  })
  quantity: number;
}
