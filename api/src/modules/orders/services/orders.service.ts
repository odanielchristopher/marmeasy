import { Injectable, NotFoundException } from "@nestjs/common";
import { ValidateUserOwnershipService } from '../../users/services/validate-user-ownership.service';
import { OrdersRespository } from "src/shared/database/repositories/orders.repository";
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderItemsRepository } from "src/shared/database/repositories/order-items.repository";
import { UpdateStatusOrderDto } from "../dto/update-status-order.dto";
import { ValidateOrderOwnershipService } from "./validade-order-ownership.service";

@Injectable()
export class OrdersService {
    constructor(
        private readonly orderItemsRepository: OrderItemsRepository,
        private readonly ordersRepository: OrdersRespository,
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

        const totalValue = items.reduce(
            (sum, item) => sum + item.unitPrice * item.quantity,
            0,
        );

        const order = await this.ordersRepository.create({
            data: {
                user: { connect: { id: userId } },
                client: { connect: { id: clientId } },
                discount,
                totalValue: totalValue - (discount || 0), // Aplicando desconto, se houver
            },
        });

        await Promise.all(
            items.map(item =>
                this.orderItemsRepository.create({
                    data: {
                        orderId: order.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                        total: item.unitPrice * item.quantity,
                    },
                }),
            ),
        );

        return order;
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
}
