import { Inject, Injectable } from '@nestjs/common';
import { IOrdersRepository } from 'src/shared/database/interfaces/orders-repository.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';
import { IOrdersService } from '../interfaces/orders-service.interface';

import { Decimal } from '@prisma/client/runtime/library';
import { IUpdateCustomerBalanceService } from 'src/modules/customers/interfaces/update-customer-balance-service.interface';
import { IValidateCustomerOwnershipService } from 'src/modules/customers/interfaces/validate-customer-ownership-service.interface';
import { IValidateProductOwnershipService } from 'src/modules/products/interfaces/validate-products-ownership-service.interface';
import { IPaginatedResponse } from 'src/shared/types';
import { IValidateOrderOwnershipService } from '../interfaces/validate-order-ownership-service.interface';

@Injectable()
export class OrdersService implements IOrdersService {
  constructor(
    @Inject(IValidateProductOwnershipService)
    private readonly validateProductOwnershipService: IValidateProductOwnershipService,
    @Inject(IValidateCustomerOwnershipService)
    private readonly validateCustomerOwnershipService: IValidateCustomerOwnershipService,
    @Inject(IValidateOrderOwnershipService)
    private readonly validateOrderOwnershipService: IValidateOrderOwnershipService,
    @Inject(IUpdateCustomerBalanceService)
    private readonly updateCustomerBalanceService: IUpdateCustomerBalanceService,
    @Inject(IOrdersRepository)
    private readonly ordersRepository: IOrdersRepository,
  ) {}

  findAllByUserId(
    userId: string,
    filters: {
      order: string;
      page: number;
      perPage: number;
    },
  ): Promise<IPaginatedResponse<Order[]>> {
    return this.ordersRepository.findManyByUserId({
      userId,
      order: filters.order === 'asc' ? 'asc' : 'desc',
      page: filters.page,
      perPage: filters.perPage,
    });
  }

  async findAllByCustomerId(
    userId: string,
    customerId: string,
    order: 'asc' | 'desc',
    page: number,
    perPage: number,
  ): Promise<IPaginatedResponse<Order[]>> {
    await this.validateCustomerOwnershipService.validate(userId, customerId);

    return this.ordersRepository.findManyByCustomerId({
      customerId,
      userId,
      order,
      page,
      perPage,
    });
  }

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, items, date, type } = createOrderDto;

    await this.validateEntitiesOwnership({
      userId,
      customerId,
      items,
    });

    const amount = this.calculateAmount(items);

    const createdOrder = await this.ordersRepository.create({
      userId,
      data: {
        customerId,
        items,
        date,
        type,
        amount: amount,
      },
    });

    await this.updateCustomerBalanceService.update({
      customerId,
      userId,
      newValue: amount,
      operationType: 'DEBIT',
    });

    return createdOrder;
  }

  async update(
    userId: string,
    orderId: string,
    updateOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const { items, customerId, date, type } = updateOrderDto;

    const { order } = await this.validateEntitiesOwnership({
      userId,
      orderId,
      customerId,
      items,
    });

    const amount = this.calculateAmount(items);

    const updatedOrder = await this.ordersRepository.update({
      data: {
        customerId,
        date,
        items,
        type,
        amount,
      },
      orderId,
      customerId,
    });

    await this.updateCustomerBalanceService.update({
      customerId,
      userId,
      newValue: amount,
      previousValue: Number(order.amount),
      operationType: 'DEBIT',
    });

    return updatedOrder;
  }

  async delete(userId: string, orderId: string): Promise<void> {
    await this.validateEntitiesOwnership({
      userId,
      orderId,
    });

    const order = await this.ordersRepository.delete(orderId);

    await this.updateCustomerBalanceService.update({
      customerId: order.customer.id,
      userId,
      newValue: 0,
      previousValue: Number(order.amount),
      operationType: 'DEBIT',
    });
  }

  private async validateEntitiesOwnership({
    userId,
    customerId,
    orderId,
    items = [],
  }: {
    userId: string;
    customerId?: string;
    orderId?: string;
    items?: { productId: string }[];
  }) {
    const [customer, order, ...products] = await Promise.all([
      customerId &&
        this.validateCustomerOwnershipService.validate(userId, customerId),
      orderId &&
        this.validateOrderOwnershipService.validate({
          userId,
          orderId,
        }),
      ...items.map(({ productId }) =>
        this.validateProductOwnershipService.validate(userId, productId),
      ),
    ]);

    return { customer, products, order };
  }

  private calculateAmount(items: { quantity: number; unitPrice: number }[]) {
    return items
      .reduce((acc, item) => {
        const subtotal = new Decimal(item.unitPrice).times(item.quantity);
        return acc.plus(subtotal);
      }, new Decimal(0))
      .toNumber();
  }
}
