import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

export interface IIngredientsRepository {
  findMany(findManyDto: Prisma.IngredientFindManyArgs);

  findFirst(findFirstDto: Prisma.IngredientFindFirstArgs);

  create(createDto: Prisma.IngredientCreateArgs);

  update(updateDto: Prisma.IngredientUpdateArgs);

  delete(deleteDto: Prisma.IngredientDeleteArgs);
}

@Injectable()
export class IngredientsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(findManyDto: Prisma.IngredientFindManyArgs) {
    return this.prismaService.ingredient.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.IngredientFindFirstArgs) {
    return this.prismaService.ingredient.findFirst(findFirstDto);
  }

  create(createDto: Prisma.IngredientCreateArgs) {
    return this.prismaService.ingredient.create(createDto);
  }

  update(updateDto: Prisma.IngredientUpdateArgs) {
    return this.prismaService.ingredient.update(updateDto);
  }

  delete(deleteDto: Prisma.IngredientDeleteArgs) {
    return this.prismaService.ingredient.delete(deleteDto);
  }
}
