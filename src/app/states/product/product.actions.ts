import { createAction, props } from '@ngrx/store';

export const findProductsByCategoryRequest = createAction(
  '[Product] Find Products By Category Request'
);
export const findProductsByCategorySuccess = createAction(
  '[Product] Find Products By Category Success',
  props<{ payload: any }>()
);
export const findProductsByCategoryFailure = createAction(
  '[Product] Find Products By Category Failure',
  props<{ error: any }>()
);

export const findProductsByIdRequest = createAction(
  '[Product] Find Products By Id Request'
);
export const findProductsByIdSuccess = createAction(
  '[Product] Find Products By Id Success',
  props<{ payload: any }>()
);
export const findProductsByIdFailure = createAction(
  '[Product] Find Products By Id Failure',
  props<{ error: any }>()
);

export const deleteProductRequest = createAction(
  '[Product] Delete Product Request'
);
export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<{ payload: any }>()
);
export const deleteProductFailure = createAction(
  '[Product] Delete Product Failure',
  props<{ error: any }>()
);

export const createProductRequest = createAction(
  '[Product] Create Product Request'
);
export const createProductSuccess = createAction(
  '[Product] Create Product Success',
  props<{ payload: any }>()
);
export const createProductFailure = createAction(
  '[Product] Create Product Failure',
  props<{ error: any }>()
);

export const searchProductsRequest = createAction(
  '[Product] Search Products Request',
  props<{ searchQuery: string }>()
);

export const searchProductsSuccess = createAction(
  '[Product] Search Products Success',
  props<{ payload: any }>()
);

export const searchProductsFailure = createAction(
  '[Product] Search Products Failure',
  props<{ error: any }>()
);
