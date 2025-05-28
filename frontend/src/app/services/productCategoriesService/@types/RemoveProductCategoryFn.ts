export type RemoveProductCategoryResponse = Promise<void>;

export type RemoveProductCategoryFn = (
  id: string,
) => RemoveProductCategoryResponse;
