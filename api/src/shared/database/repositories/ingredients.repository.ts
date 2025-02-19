import { Injectable } from '@nestjs/common';
import { Ingredient } from 'src/modules/ingredients/entities/ingredient.entity';
import {
  CreateIngredientDto,
  DeleteIngredientDto,
  FindFirstIngredientDto,
  FindManyIngredientsByIdDto,
  IIngredientsRepository,
  UpdateIngredientDto,
} from '../interfaces/ingredients-repository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class IngredientsRepository implements IIngredientsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByUserId(
    findManyDto: FindManyIngredientsByIdDto,
  ): Promise<Ingredient[]> {
    const { userId, order } = findManyDto;

    const ingredients = await this.prismaService.$queryRaw<Ingredient[]>`
      SELECT id, name, icon
      FROM ingredients
      WHERE user_id = ${userId}::uuid
      ORDER BY
        CASE WHEN ${order} = 'DESC' THEN name END DESC,
        CASE WHEN ${order} = 'ASC' THEN name END ASC;
    `;

    return ingredients;
  }

  async findFirstByUserId(
    findFirstByIdDto: FindFirstIngredientDto,
  ): Promise<Ingredient> {
    const { userId, id } = findFirstByIdDto;

    const findedIngredient = await this.prismaService.ingredient.findFirst({
      where: { userId, id },
      select: {
        id: true,
        name: true,
        icon: true,
      },
    });

    return findedIngredient;
  }

  async create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    const { data, userId } = createIngredientDto;

    const createdIngredient = await this.prismaService.ingredient.create({
      data: {
        ...data,
        userId,
      },
      select: {
        id: true,
        name: true,
        icon: true,
      },
    });

    return createdIngredient;
  }

  async update(updateIngredientDto: UpdateIngredientDto): Promise<Ingredient> {
    const { data, userId } = updateIngredientDto;

    const updatedIngredient = await this.prismaService.ingredient.update({
      where: { userId, id: data.id },
      data,
      select: {
        id: true,
        name: true,
        icon: true,
      },
    });

    return updatedIngredient;
  }

  async delete(deleteIngredientDto: DeleteIngredientDto): Promise<void> {
    const { id, userId } = deleteIngredientDto;

    await this.prismaService.ingredient.delete({
      where: { userId, id },
    });
  }
}
