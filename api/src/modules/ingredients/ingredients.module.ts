import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './services/ingredients.service';
import { ValidateIngredientOwnershipService } from './services/validate-ingredient-ownership.service';

@Module({
  imports: [UsersModule],
  controllers: [IngredientsController],
  providers: [IngredientsService, ValidateIngredientOwnershipService],
  exports: [ValidateIngredientOwnershipService],
})
export class IngredientsModule {}
