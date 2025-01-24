import { Inject, Injectable } from '@nestjs/common';
import { IValidateUserOwnershipService } from 'src/modules/users/interfaces/validate-user-ownership-service.interface';
import { OrderItemsRepository } from 'src/shared/database/repositories/order-items.repository';
import { ProductsRespository } from 'src/shared/database/repositories/products.repository';
import { CreateOrderItemDto } from '../dto/create-order-items.dto';
import { UpdateOrderItemDto } from '../dto/update-ordem-item.dto';
import { ValidateOrderItemsOwnershipService } from './validate-product-order-item.service';

@Injectable()
export class OrderItemsService {
  constructor(
    private readonly productsRepository: ProductsRespository,
    private readonly orderItemsRepository: OrderItemsRepository,
    @Inject(IValidateUserOwnershipService)
    private readonly validateUserOwnershipService: IValidateUserOwnershipService,
    private readonly validateOrderItemsOwnershipService: ValidateOrderItemsOwnershipService,
  ) {}

  async findAll(userId: string) {
    await this.validateUserOwnershipService.validate(userId);

    return this.orderItemsRepository.findMany({
      where: { userId },
    });
  }

  async findOneById(userId: string, orderItemId: string) {
    await this.validateOrderItemsOwnershipService.validate(userId, orderItemId);

    return this.orderItemsRepository.findUnique({
      where: { id: orderItemId, userId },
    });
  }

  async create(
    userId: string,
    orderId: string,
    createOrderItemDto: CreateOrderItemDto,
  ) {
    await this.validateUserOwnershipService.validate(userId);

    const { quantity, ingredients, name, total, unitPrice } =
      createOrderItemDto;

    return this.orderItemsRepository.create({
      data: {
        order: { connect: { id: orderId } },
        user: { connect: { id: userId } },
        name,
        ingredients,
        quantity,
        unitPrice,
        total,
      },
    });
  }

  async update(
    userId: string,
    orderItemId: string,
    updateQuantityOrderItemDto: UpdateOrderItemDto,
  ) {
    await this.validateOrderItemsOwnershipService.validate(userId, orderItemId);
    return this.orderItemsRepository.update({
      where: { id: orderItemId },
      data: updateQuantityOrderItemDto,
    });
  }

  async delete(userId: string, orderItemId: string) {
    await this.validateOrderItemsOwnershipService.validate(userId, orderItemId);

    await this.orderItemsRepository.delete({
      where: { id: orderItemId, userId },
    });

    return { message: 'Pedido excluído com sucesso.' };
  }
}
