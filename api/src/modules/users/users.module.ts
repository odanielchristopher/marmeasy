import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { IUsersService } from './interfaces/users-service.interface';
import { IValidateUserOwnershipService } from './interfaces/validate-user-ownership-service.interface';
import { UsersService } from './services/users.service';
import { ValidateUserOwnershipService } from './services/validate-user-ownership.service';
import { UsersController } from './users.controller';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [
    {
      provide: IValidateUserOwnershipService,
      useClass: ValidateUserOwnershipService,
    },
    {
      provide: IUsersService,
      useClass: UsersService,
    },
  ],
  exports: [
    {
      provide: IValidateUserOwnershipService,
      useClass: ValidateUserOwnershipService,
    },
  ],
})
export class UsersModule {}
