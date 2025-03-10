import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Put,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUsersService } from './interfaces/users-service.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(IUsersService) private readonly usersService: IUsersService,
  ) {}

  @Get('/me')
  me(@ActiveUserId() userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Put('/edit-me')
  update(@ActiveUserId() userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete('/delete-me')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@ActiveUserId() userId: string) {
    return this.usersService.remove(userId);
  }
}
