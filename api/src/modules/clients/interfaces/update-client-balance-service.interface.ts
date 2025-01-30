import { Client } from '../entities/client.entity';

export const IUpdateClientBalanceService = Symbol(
  'IUpdateClientBalanceService',
);

export type UpdateBalanceParams = {
  userId: string;
  clientId: string;
  previousValue: number;
  newValue: number;
};
export interface IUpdateClientBalanceService {
  update(params: UpdateBalanceParams): Promise<Client>;
}
