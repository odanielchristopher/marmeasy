import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from './services/users.service';
import { ValidateUserOwnershipService } from './services/validate-user-ownership.service';
import { UsersController } from './users.controller';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService, ValidateUserOwnershipService],
  exports: [ValidateUserOwnershipService],
})
export class UsersModule {}
