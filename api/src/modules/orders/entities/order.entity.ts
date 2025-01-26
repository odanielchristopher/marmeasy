import { BadRequestException } from '@nestjs/common';
import { Order as PrismaOrder } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { OrderItem } from 'src/modules/order-items/entities/order-item.entity';
import { OrderStatus } from './status.entity';

interface IPrismaOrderResponse extends PrismaOrder {
  items: OrderItem[];
}

export class Order {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @Transform(({ value }) => {
    // Converte o valor enviado (string JSON) para array
    try {
      return JSON.parse(value); // Converte o JSON stringificado em array
    } catch {
      throw new BadRequestException(
        'Os items devem ser passados como um array válido.',
      );
    }
  })
  @IsArray()
  @ArrayNotEmpty()
  items: OrderItem[];

  @IsNotEmpty()
  discount: number;

  @IsNotEmpty()
  totalValue: number;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;

  static parse(persistenteEntity: IPrismaOrderResponse | null): Order {
    if (!persistenteEntity) {
      return null;
    }

    return {
      ...persistenteEntity,
      status: OrderStatus[persistenteEntity.status],
    };
  }
}
