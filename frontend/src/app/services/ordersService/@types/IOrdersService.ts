import { CreateOrderFn } from './CreateOrderFn';
import { GetAllOrdersFn } from './GetAllOrdersFn';
import { GetOneOrderFn } from './GetOneOrderFn';
import { UpdateOrderFn } from './UpdateOrderFn';

export interface IOrdersService {
  getAll: GetAllOrdersFn;
  getOne: GetOneOrderFn;
  create: CreateOrderFn;
  update: UpdateOrderFn;
}
