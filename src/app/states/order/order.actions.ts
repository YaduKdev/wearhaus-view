import { createAction, props } from '@ngrx/store';

export const createOrderRequest = createAction('[Order] Create Order Request');
export const createOrderSuccess = createAction(
  '[Order] Create Order Success',
  props<{ order: any }>()
);
export const createOrderFailure = createAction(
  '[Order] Create Order Failure',
  props<{ error: any }>()
);

export const getOrderByIdRequest = createAction(
  '[Order] Get Order By Id Request',
  props<{ orderId: string }>()
);
export const getOrderByIdSuccess = createAction(
  '[Order] Get Order By Id Success',
  props<{ order: any }>()
);
export const getOrderByIdFailure = createAction(
  '[Order] Get Order By Id Failure',
  props<{ error: any }>()
);

export const getOrderHistoryRequest = createAction(
  '[Order] Get Order History Request'
);
export const getOrderHistorySuccess = createAction(
  '[Order] Get Order History Success',
  props<{ orders: any }>()
);
export const getOrderHistoryFailure = createAction(
  '[Order] Get Order History Failure',
  props<{ error: any }>()
);

export const getAllOrdersRequest = createAction(
  '[Order] Get All Orders Request'
);
export const getAllOrdersSuccess = createAction(
  '[Order] Get All Orders Success',
  props<{ payload: any }>()
);
export const getAllOrdersFailure = createAction(
  '[Order] Get All Orders Failure',
  props<{ error: any }>()
);

export const placeOrderRequest = createAction('[Order] Place Order Request');
export const placeOrderSuccess = createAction(
  '[Order] Place Order Success',
  props<{ payload: any }>()
);
export const placeOrderFailure = createAction(
  '[Order] Place Order Failure',
  props<{ error: any }>()
);

export const confirmOrderRequest = createAction(
  '[Order] Confirm Order Request'
);
export const confirmOrderSuccess = createAction(
  '[Order] Confirm Order Success',
  props<{ payload: any }>()
);
export const confirmOrderFailure = createAction(
  '[Order] Confirm Order Failure',
  props<{ error: any }>()
);

export const cancelOrderRequest = createAction('[Order] Cancel Order Request');
export const cancelOrderSuccess = createAction(
  '[Order] Cancel Order Success',
  props<{ payload: any }>()
);
export const cancelOrderFailure = createAction(
  '[Order] Cancel Order Failure',
  props<{ error: any }>()
);

export const shipOrderRequest = createAction('[Order] Ship Order Request');
export const shipOrderSuccess = createAction(
  '[Order] Ship Order Success',
  props<{ payload: any }>()
);
export const shipOrderFailure = createAction(
  '[Order] Ship Order Failure',
  props<{ error: any }>()
);

export const deliverOrderRequest = createAction(
  '[Order] Deliver Order Request'
);
export const deliverOrderSuccess = createAction(
  '[Order] Deliver Order Success',
  props<{ payload: any }>()
);
export const deliverOrderFailure = createAction(
  '[Order] Deliver Order Failure',
  props<{ error: any }>()
);

export const deleteOrderRequest = createAction('[Order] Delete Order Request');
export const deleteOrderSuccess = createAction(
  '[Order] Delete Order Success',
  props<{ payload: any }>()
);
export const deleteOrderFailure = createAction(
  '[Order] Delete Order Failure',
  props<{ error: any }>()
);
