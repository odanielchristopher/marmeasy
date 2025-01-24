import { Injectable, NotFoundException } from "@nestjs/common";
import { ValidateUserOwnershipService } from '../../users/services/validate-user-ownership.service';
import { OrdersRespository } from "src/shared/database/repositories/orders.repository";
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateStatusOrderDto } from "../dto/update-status-order.dto";
import { ValidateOrderOwnershipService } from "./validade-order-ownership.service";
import { OrderItemsService } from "src/modules/order-items/services/order-items.service";
import { CreateOrderItemDto } from "src/modules/order-items/dto/create-order-items.dto";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { OrderStatus } from "../entities/status.entity";
import { UpdateQuantityOrderItemDto } from "../dto/update-order-item.dto";

@Injectable()
export class OrdersService {
    constructor(

        private readonly ordersRepository: OrdersRespository,
        private readonly orderItemsService: OrderItemsService,
        private readonly validateUserOwnershipService: ValidateUserOwnershipService,
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


    async create(
        userId: string,
        createOrderDto: CreateOrderDto,
    ) {
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
                const createOrderItemDto = new CreateOrderItemDto();
                createOrderItemDto.productId = item.productId;
                createOrderItemDto.quantity = item.quantity;
    
                const createdItem = await this.orderItemsService.create(userId, order.id, createOrderItemDto);
    
                totalItems += createdItem.total;
            }),
        );

        const totalValueOrder = totalItems - discount;

        const updatedOrder = await this.ordersRepository.update({ 
            where: { id: order.id },
            data: { totalValue: totalValueOrder },
            include: { items: true },
        });

        return updatedOrder;
    }

    async update(
        userId: string,
        orderId: string,
        updateOrder: UpdateOrderDto
    ) {
        await this.validateOrderOwnershipService.validate(userId, orderId);

        const { discount } = updateOrder;

        const order = await this.ordersRepository.findUnique({
            where: { userId, id: orderId }, include: { items: true }, 
        });

        if (!order) {
            throw new NotFoundException('Pedido não encontrado.');
        }

        console.log(order);

        const newtotalValue = (order.totalValue + order.discount) - discount;
        
        return this.ordersRepository.update({
            where: { id: orderId },
            data: { discount, totalValue: newtotalValue },
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

    async updateQuantityItem(userId: string, orderId: string, orderItemId: string, updateQuantityOrderItemDto: UpdateQuantityOrderItemDto) {
        await this.validateOrderOwnershipService.validate(userId, orderId);
        
        const { quantity } = updateQuantityOrderItemDto;

        const order = await this.ordersRepository.findUnique({
            where: { id: orderId },
            include: { items: true },
        }) as { id: string; 
                userId: string; 
                clientId: string; 
                date: Date; 
                totalValue: number; 
                discount: number; 
                status: OrderStatus; 
                items: { id: string; 
                         total: number;
                         unitPrice: number; 
                         quantity: number }[];
                        };
        if (!order) {
            throw new NotFoundException('Pedido não encontrado.');
        }

        const item = order.items.find((i) => i.id === orderItemId);

        if (!item) {
            throw new NotFoundException('Item do pedido não encontrado.');
        }

        const newItemTotal = item.unitPrice * quantity;

        await this.orderItemsService.update(userId, orderItemId, { quantity, total: newItemTotal });

        const totalItems = order.items.reduce((sum, i) => {
            if (i.id === orderItemId) {
                return sum + newItemTotal; 
            }
            return sum + i.total;
        }, 0);

        const newOrderTotalValue = totalItems - order.discount;

        await this.ordersRepository.update({
            where: { id: orderId },
            data: { totalValue: newOrderTotalValue },
        });

        return { message: 'Quantidade do item atualizada com sucesso.', totalValue: newOrderTotalValue };
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
    
        const order = await this.ordersRepository.findUnique({
            where: { id: orderId },
            include: { items: true },
        }) as { id: string; userId: string; clientId: string; date: Date; totalValue: number; discount: number; status: OrderStatus; items: { total: number }[] };
    
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
