import { BadRequestException, Injectable } from "@nestjs/common";
import { ValidateUserOwnershipService } from '../../users/services/validate-user-ownership.service';
import { ProductsRespository } from "src/shared/database/repositories/products.repository";
import { CreateOrderItemDto } from '../dto/create-order-items.dto';
import { OrderItemsRepository } from "src/shared/database/repositories/order-items.repository";

@Injectable()
export class OrderItemsService {
    constructor(
        private readonly productsRepository: ProductsRespository,
        private readonly orderItemsRepository: OrderItemsRepository,
        private readonly validateUserOwnershipService: ValidateUserOwnershipService,
    ) {}

    async create(
        userId: string,
        createOrderItemDto: CreateOrderItemDto,
    ) {
        await this.validateUserOwnershipService.validate(userId);
        
        const { productId, quantity, unitPrice } = createOrderItemDto;

        const productAlreadyExists = await this.productsRepository.findFirst({
            where: { userId, id: productId },
        });

        if (!productAlreadyExists) {
            throw new BadRequestException('Produto não encontrado.');
        }

        const total = quantity * unitPrice;

        return this.orderItemsRepository.create({
            data: {
                product: { connect: { id: productId } },
                quantity,
                unitPrice,
                total,
            },
        });
    }
}

