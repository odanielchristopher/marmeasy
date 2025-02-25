import { Client } from '../entities/client.entity';

export const IValidateClientOwnershipService = Symbol(
  'IValidateClientOwnershipService',
);

export interface IValidateClientOwnershipService {
  validate(userId: string, clientId: string): Promise<Client>;
}
