import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { IngredientService } from './services/ingredient.service';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.ingredientService.findAllByUserId(userId);
  }

  @Get(':ingredientId')
  findOne(
    @ActiveUserId() userId: string,
    @Param('ingredientId', ParseUUIDPipe) ingredientId: string,
  ) {
    return this.ingredientService.findOneByUserId(userId, ingredientId);
  }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createIngredientDto: CreateIngredientDto,
  ) {
    return this.ingredientService.create(userId, createIngredientDto);
  }

  @Put(':ingredientId')
  update(
    @ActiveUserId() userId: string,
    @Param('ingredientId', ParseUUIDPipe) ingredientId: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientService.update(
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
    return this.ingredientService.remove(userId, ingredientId);
  }
}
