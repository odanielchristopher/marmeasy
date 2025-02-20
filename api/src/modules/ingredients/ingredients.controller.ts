import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { IIngredientsService } from './interfaces/ingredients-service.interface';

@Controller('ingredients')
export class IngredientsController {
  constructor(
    @Inject(IIngredientsService)
    private readonly ingredientsService: IIngredientsService,
  ) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.ingredientsService.findAllByUserId(userId);
  }

  @Get(':ingredientId')
  findOne(
    @ActiveUserId() userId: string,
    @Param('ingredientId', ParseUUIDPipe) ingredientId: string,
  ) {
    return this.ingredientsService.findOneByUserId(userId, ingredientId);
  }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createIngredientDto: CreateIngredientDto,
  ) {
    return this.ingredientsService.create(userId, createIngredientDto);
  }

  @Put(':ingredientId')
  update(
    @ActiveUserId() userId: string,
    @Param('ingredientId', ParseUUIDPipe) ingredientId: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(
      userId,
      ingredientId,
      updateIngredientDto,
    );
  }

  @Delete(':ingredientId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('ingredientId', ParseUUIDPipe) ingredientId: string,
  ) {
    return this.ingredientsService.remove(userId, ingredientId);
  }
}
