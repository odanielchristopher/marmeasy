import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './services/ingredient.service';
import { ValidateIngredientOwnershipService } from './services/validate-ingredient-ownership.service';

@Module({
  imports: [UsersModule],
  controllers: [IngredientController],
  providers: [IngredientService, ValidateIngredientOwnershipService],
  exports: [ValidateIngredientOwnershipService],
})
export class IngredientModule {}
