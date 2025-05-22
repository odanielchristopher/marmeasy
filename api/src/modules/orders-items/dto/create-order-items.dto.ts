import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateOrdemItemsDto {
  @ApiProperty({
    description: 'Id do pedido',
    example: 'a0e1c2d3-e4f5-6789-abcd-ef0123456789',
    type: String,
    format: 'uuid',
    required: true,
    nullable: false,
  })
  @IsNotEmpty({ message: 'O id do pedido é obrigatório.' })
  @IsUUID('4', { message: 'O id do pedido deve ser um UUID válido.' })
  orderId: string;

  @ApiProperty({
    description: 'Id do produto',
    example: 'a0e1c2d3-e4f5-6789-abcd-ef0123456789',
    type: String,
    format: 'uuid',
    required: true,
    nullable: false,
  })
  @IsNotEmpty({ message: 'O id do produto é obrigatório.' })
  @IsUUID('4', { message: 'O id do produto deve ser um UUID válido.' })
  productId: string;

  @ApiProperty({
    description: 'Quantidade do produto',
    example: 2,
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'A quantidade do produto é obrigatória.' })
  quantity: number;

  @ApiProperty({
    description: 'Valor unitário do produto',
    example: 50.75,
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'O valor unitário do produto é obrigatório.' })
  unitPrice: number;
}
