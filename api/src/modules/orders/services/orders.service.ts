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
    const { customerId, items } = createOrderDto;

    await Promise.all(
      items.map((item) =>
        this.validateProductOwnershipService.validate(userId, item.productId),
      ),
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
