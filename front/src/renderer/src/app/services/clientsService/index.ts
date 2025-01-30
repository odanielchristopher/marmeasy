import { create } from './create';
import { getAll } from './getAll';
import { getBySearchTerm } from './getAllBySearchTerm';
import { getOne } from './getOne';
import { remove } from './remove';
import { update } from './update';

export const clientsService = {
  create,
  getAll,
  getBySearchTerm,
  remove,
  update,
  getOne,
};
