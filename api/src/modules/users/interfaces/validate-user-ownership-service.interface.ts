import { User } from '../entities/user.entity';

export const IValidateUserOwnershipService = Symbol(
  'IValidateUserOwnershipService',
);

export interface IValidateUserOwnershipService {
  validate(userId: string): Promise<User | null>;
}
