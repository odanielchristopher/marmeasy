import { IUser } from '@app/entities/User';

export interface IUsersService {
  me(): Promise<IUser>;
}
