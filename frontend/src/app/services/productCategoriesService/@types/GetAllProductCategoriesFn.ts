import { IProductCategory } from '@app/entities/ProductCategories';

export type GetAllProductCategoriesFn = () => Promise<IProductCategory[]>;
