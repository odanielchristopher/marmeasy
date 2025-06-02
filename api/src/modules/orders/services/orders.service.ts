import { Inject, Injectable } from '@nestjs/common';
import { IOrdersService } from '../interfaces/orders-service.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';
import { IOrdersRepository } from 'src/shared/database/interfaces/orders-repository.interface';
import { ValidateCustomerOwnershipService } from 'src/modules/customers/validate-customer-ownership.service';

import { IValidateProductOwnershipService } from 'src/modules/products/interfaces/validate-products-ownership-service.interface';

@Injectable()
export class OrdersService implements IOrdersService {
  constructor(
    @Inject(IValidateProductOwnershipService)
    private readonly validateProductOwnershipService: IValidateProductOwnershipService,

    private readonly validateCustomerOwnershipService: ValidateCustomerOwnershipService,

    @Inject(IOrdersRepository)
    private readonly ordersRepository: IOrdersRepository,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, items, amount } = createOrderDto;

    const itemsIds = items.map((item) => item.productId);

    await this.validateEntitiesOwnership({
      userId,
      customerId,
      itemsIds,
    });

    const calculatedAmount = items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0,
    );

    const roundedCalculatedAmount = Math.round(calculatedAmount * 100) / 100;

    if (roundedCalculatedAmount !== amount) {
      throw new Error(
        'O valor total do pedido não confere com a soma dos itens.',
      );
    }

    return this.ordersRepository.create({ data: createOrderDto });
  }

  private async validateEntitiesOwnership({
    userId,
    customerId,
    itemsIds = [],
  }: {
    userId: string;
    customerId: string;
    itemsIds?: string[];
  }) {
    await this.validateCustomerOwnershipService.validate(userId, customerId);

    const products = await Promise.all(
      itemsIds.map(
        (productId) =>
          itemsIds &&
          this.validateProductOwnershipService.validate(userId, productId),
      ),
    );

    return products;
  }
}
