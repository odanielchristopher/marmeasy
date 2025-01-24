import { createByClientId } from './createByClientId';
import { getAllByClientId } from './getAllByClientId';
import { removeByClientId } from './removeByClientId';
import { updateByClientId } from './updateByClientId';

export const ordersService = {
  getAllByClientId,
  createByClientId,
  removeByClientId,
  updateByClientId,
};
