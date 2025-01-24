import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { IngredientsController } from './ingredients.controller';
import { IIngredientsService } from './interfaces/ingredients-service.interface';
import { IValidateIngredientOwnershipService } from './interfaces/validate-ingredient-ownership-service.interface';
import { IngredientsService } from './services/ingredients.service';
import { ValidateIngredientOwnershipService } from './services/validate-ingredient-ownership.service';

@Module({
  imports: [UsersModule],
  controllers: [IngredientsController],
  providers: [
    IngredientsService,
    ValidateIngredientOwnershipService,
    {
      provide: IValidateIngredientOwnershipService,
      useClass: ValidateIngredientOwnershipService,
    },
    {
      provide: IIngredientsService,
      useClass: IngredientsService,
    },
  ],
  exports: [
    ValidateIngredientOwnershipService,
    {
      provide: IValidateIngredientOwnershipService,
      useClass: ValidateIngredientOwnershipService,
    },
  ],
})
export class IngredientsModule {}
