import { Inject, Injectable } from '@nestjs/common';
import { IOrdersService } from '../interfaces/orders-service.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';
import { IOrdersRepository } from 'src/shared/database/interfaces/orders-repository.interface';
import { ValidateCustomerOwnershipService } from 'src/modules/customers/validate-customer-ownership.service';

import { IValidateProductOwnershipService } from 'src/modules/products/interfaces/validate-products-ownership-service.interface';
import { ValidateOrderService } from './validate-order.service';
import { IValidateOrdersService } from '../interfaces/validate-order-service.interface';
import { ComputeCustomerOwnershipService } from './compute-balance-customer.service';

@Injectable()
export class OrdersService implements IOrdersService {
  constructor(
    @Inject(IValidateProductOwnershipService)
    private readonly validateProductOwnershipService: IValidateProductOwnershipService,

    private readonly validateCustomerOwnershipService: ValidateCustomerOwnershipService,

    private readonly computeBalanceCustomerService: ComputeCustomerOwnershipService,

    @Inject(IValidateOrdersService)
    private readonly validateOrderService: ValidateOrderService,

    @Inject(IOrdersRepository)
    private readonly ordersRepository: IOrdersRepository,
  ) {}

  async listAllOdersByCustomerId(
    userId: string,
    customerId: string,
  ): Promise<Order[]> {
    await this.validateCustomerOwnershipService.validate(userId, customerId);

    return null;
  }

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, items, amount } = createOrderDto;

    const itemsIds = items.map((item) => item.productId);

    const response = await this.validateEntitiesOwnership({
      userId,
      customerId,
      itemsIds,
    });

    await this.validateOrderService.validate(
      items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      response.products,
      amount,
    );

    await this.computeBalanceCustomerService.compute(
      customerId,
      amount,
      response.customer.balance,
    );

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
    const customer = await this.validateCustomerOwnershipService.validate(
      userId,
      customerId,
    );

    const products = await Promise.all(
      itemsIds.map(
        (productId) =>
          itemsIds &&
          this.validateProductOwnershipService.validate(userId, productId),
      ),
    );

    return { customer, products };
  }
}
