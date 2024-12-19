import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

import { UsersRespository } from 'src/shared/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRespository) {}

  findById(userId: string) {
    return { userId };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
