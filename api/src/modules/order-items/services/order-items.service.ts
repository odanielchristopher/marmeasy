import { BadRequestException, Injectable } from "@nestjs/common";
import { OrderItemsRepository } from "src/shared/database/repositories/order-items.repository";
import { ProductsRespository } from "src/shared/database/repositories/products.repository";
import { ValidateUserOwnershipService } from '../../users/services/validate-user-ownership.service';
import { CreateOrderItemDto } from '../dto/create-order-items.dto';
import { UpdateQuantityOrderItemDto } from "../dto/update-ordem-item.dto";
import { ValidateOrderItemsOwnershipService } from "./validate-product-order-item.service";

@Injectable()
export class OrderItemsService {
    constructor(
        private readonly productsRepository: ProductsRespository,
        private readonly orderItemsRepository: OrderItemsRepository,
        private readonly validateUserOwnershipService: ValidateUserOwnershipService,
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
        
        const { productId, quantity } = createOrderItemDto;

        const productAlreadyExists = await this.productsRepository.findFirst({
            where: { userId, id: productId },
        });

        if (!productAlreadyExists) {
            throw new BadRequestException('Produto não encontrado.');
        }

        const total = quantity * productAlreadyExists.price;

        return this.orderItemsRepository.create({
            data: {
                product: { connect: { id: productId } },
                order: { connect: { id: orderId } },
                user: { connect: { id: userId } },
                quantity,
                unitPrice: productAlreadyExists.price,
                total,
            },
        });
    }

    async update(
        userId: string,
        orderItemId: string,
        updateQuantityOrderItemDto: UpdateQuantityOrderItemDto,
    ) {
        await this.validateOrderItemsOwnershipService.validate(userId, orderItemId);
        return this.orderItemsRepository.update({
            where: { id: orderItemId },
            data: updateQuantityOrderItemDto,
        });
    }

    async delete(
        userId: string,
        orderItemId: string,
    ) {
        await this.validateOrderItemsOwnershipService.validate(userId, orderItemId);

        await this.orderItemsRepository.delete({
            where: { id: orderItemId, userId },
        });

        return { message: 'Pedido excluído com sucesso.' };
    }
}

