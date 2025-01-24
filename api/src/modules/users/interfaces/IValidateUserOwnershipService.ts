import { User } from "../entities/user.entity";

export interface IValidateUserOwnershipService {
  validate(userId: string): Promise<User | null>;
}