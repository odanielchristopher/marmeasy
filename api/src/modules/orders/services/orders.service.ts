import { Injectable } from "@nestjs/common";
import { ValidateUserOwnershipService } from '../../users/services/validate-user-ownership.service';
import { OrdersRespository } from "src/shared/database/repositories/orders.repository";
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderItemsRepository } from "src/shared/database/repositories/order-items.repository";

@Injectable()
export class OrdersService {
    constructor(
        private readonly orderItemsRepository: OrderItemsRepository,
        private readonly ordersRepository: OrdersRespository,
        private readonly validateUserOwnershipService: ValidateUserOwnershipService,
    ) {}

    async create(
        userId: string,
        createOrderDto: CreateOrderDto,
    ) {
        await this.validateUserOwnershipService.validate(userId);

        const { clientId, items, discount } = createOrderDto;

        // Calculando o total do pedido com base nos itens
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
}
