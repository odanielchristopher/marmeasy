import { BadRequestException, Injectable } from '@nestjs/common';
import { Product } from 'src/modules/products/entities/product.entity';
import { IValidateOrdersService } from '../interfaces/validate-order-service.interface';

@Injectable()
export class ValidateOrderService implements IValidateOrdersService {
  async validate(
    items: {
      productId: string;
      quantity: number;
      unitPrice: number;
    }[],
    products: Product[],
    amount: number,
  ) {
    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new BadRequestException(
          `Produto ${item.productId} não encontrado.`,
        );
      }
      if (Number(product.price) !== Number(item.unitPrice)) {
        throw new BadRequestException(
          `O preço do produto ${item.productId} está incorreto.`,
        );
      }
    }

    const totalAmount = items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0,
    );

    if (totalAmount !== amount) {
      throw new BadRequestException(
        `O valor total do pedido está incorreto. Esperado: ${totalAmount}, recebido: ${amount}.`,
      );
    }
  }
}
