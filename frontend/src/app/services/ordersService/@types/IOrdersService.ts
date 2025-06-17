import { GetAllOrdersFn } from './GetAllOrdersFn';
import { GetOneOrderFn } from './GetOneOrderFn';

export interface IOrdersService {
  getAll: GetAllOrdersFn;
  getOne: GetOneOrderFn;
}
