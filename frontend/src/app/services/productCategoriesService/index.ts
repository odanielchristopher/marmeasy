import { IProductCategoriesService } from './@types/IProductCategoriesService';
import { getAll } from './getAll';

export const productCategoriesService: IProductCategoriesService = {
  getAll,
};
