import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from 'src/modules/order-items/dto/create-order-items.dto';
import { IOrderItemsService } from 'src/modules/order-items/interfaces/order-items-service.interface';
import { IValidateUserOwnershipService } from 'src/modules/users/interfaces/validate-user-ownership-service.interface';
import { OrdersRepository } from 'src/shared/database/repositories/orders.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { UpdateStatusOrderDto } from '../dto/update-status-order.dto';
import { OrderStatus } from '../entities/status.entity';
import { ValidateOrderOwnershipService } from './validade-order-ownership.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(IOrderItemsService)
    private readonly orderItemsService: IOrderItemsService,
    @Inject(IValidateUserOwnershipService)
    private readonly validateUserOwnershipService: IValidateUserOwnershipService,
    private readonly validateOrderOwnershipService: ValidateOrderOwnershipService,
  ) {}

  async findOneById(userId: string, orderId: string) {
    const order = await this.ordersRepository.findUnique({
      where: { userId, id: orderId },
      include: {
        items: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado.');
    }

    return order;
  }

  async findAllByUserId(userId: string) {
    return this.ordersRepository.findMany({
      where: { userId },
      include: {
        items: true,
      },
    });
  }

  async create(userId: string, createOrderDto: CreateOrderDto) {
    await this.validateUserOwnershipService.validate(userId);

    const { clientId, items, discount } = createOrderDto;

    const order = await this.ordersRepository.create({
      data: {
        user: { connect: { id: userId } },
        client: { connect: { id: clientId } },
        discount,
      },
    });

    let totalItems = 0;

    await Promise.all(
      items.map(async (item) => {
        const { name, ingredients, quantity, unitPrice, total } = item;

        const createOrderItemDto = new CreateOrderItemDto({
          name,
          ingredients,
          quantity,
          unitPrice,
          total,
        });

        const createdItem = await this.orderItemsService.create(
          userId,
          order.id,
          createOrderItemDto,
        );

        totalItems += createdItem.total;
      }),
    );

    const totalValueOrder = totalItems - (discount ?? 0);

    const updatedOrder = await this.ordersRepository.update({
      where: { id: order.id },
      data: { totalValue: totalValueOrder },
      select: {
        id: true,
        clientId: true,
        date: true,
        totalValue: true,
        discount: true,
        items: true,
      },
    });

    return updatedOrder;
  }

  async update(userId: string, orderId: string, updateOrder: UpdateOrderDto) {
    await this.validateOrderOwnershipService.validate(userId, orderId);

    const { discount, items } = updateOrder;

    const order = await this.ordersRepository.findUnique({
      where: { userId, id: orderId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado.');
    }

    const newTotalValue =
      order.totalValue + (order.discount ?? 0) - (discount ?? 0);

    const updatedItems = items.map((item) => ({
      where: { id: item.id },
      data: { ...item },
    }));

    return this.ordersRepository.update({
      where: { id: orderId },
      data: {
        discount,
        totalValue: newTotalValue,
        items: {
          update: updatedItems,
        },
      },
      select: {
        id: true,
        clientId: true,
        date: true,
        totalValue: true,
        discount: true,
        items: true,
      },
    });
  }

  async updateStatus(
    userId: string,
    orderId: string,
    updateOrderStatusDto: UpdateStatusOrderDto,
  ) {
    await this.validateOrderOwnershipService.validate(userId, orderId);

    const order = await this.ordersRepository.findUnique({
      where: { userId, id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado.');
    }

    return this.ordersRepository.update({
      where: { id: orderId },
      data: { status: updateOrderStatusDto.status },
    });
  }

  async delete(userId: string, orderId: string) {
    await this.validateOrderOwnershipService.validate(userId, orderId);

    await this.ordersRepository.delete({
      where: { id: orderId },
    });

    return { message: 'Pedido excluído com sucesso.' };
  }

  async deleteItem(userId: string, orderId: string, orderItemId: string) {
    await this.validateOrderOwnershipService.validate(userId, orderId);

    await this.orderItemsService.delete(userId, orderItemId);

    const order = (await this.ordersRepository.findUnique({
      where: { id: orderId },
      include: { items: true },
    })) as {
      id: string;
      userId: string;
      clientId: string;
      date: Date;
      totalValue: number;
      discount: number;
      status: OrderStatus;
      items: { total: number }[];
    };

    if (!order) {
      throw new NotFoundException('Pedido não encontrado.');
    }

    const totalItems = order.items.reduce((sum, item) => sum + item.total, 0);

    const newTotalValue = totalItems - order.discount;

    await this.ordersRepository.update({
      where: { id: orderId },
      data: { totalValue: newTotalValue },
    });

    return { message: 'Item excluído e pedido atualizado com sucesso.' };
  }
}
