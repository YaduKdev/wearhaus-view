import { createReducer, on } from '@ngrx/store';
import {
  cancelOrderFailure,
  cancelOrderRequest,
  cancelOrderSuccess,
  confirmOrderFailure,
  confirmOrderRequest,
  confirmOrderSuccess,
  createOrderFailure,
  createOrderRequest,
  createOrderSuccess,
  deleteOrderFailure,
  deleteOrderRequest,
  deleteOrderSuccess,
  deliverOrderFailure,
  deliverOrderRequest,
  deliverOrderSuccess,
  getAllOrdersFailure,
  getAllOrdersRequest,
  getAllOrdersSuccess,
  getOrderByIdFailure,
  getOrderByIdRequest,
  getOrderByIdSuccess,
  getOrderHistoryFailure,
  getOrderHistoryRequest,
  getOrderHistorySuccess,
  placeOrderFailure,
  placeOrderRequest,
  placeOrderSuccess,
  shipOrderFailure,
  shipOrderRequest,
  shipOrderSuccess,
} from './order.actions';

export interface OrderState {
  loading: boolean;
  error: string | null;
  order: any | null;
  orders: any[];
}

const initialState: OrderState = {
  loading: false,
  error: null,
  order: null,
  orders: [],
};

export const orderReducer = createReducer(
  initialState,
  on(
    createOrderRequest,
    getOrderByIdRequest,
    getOrderHistoryRequest,
    getAllOrdersRequest,
    placeOrderRequest,
    confirmOrderRequest,
    cancelOrderRequest,
    shipOrderRequest,
    deliverOrderRequest,
    deleteOrderRequest,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),

  on(createOrderSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    order,
  })),
  on(getOrderByIdSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    order,
  })),
  on(getOrderHistorySuccess, (state, { orders }) => ({
    ...state,
    loading: false,
    orders,
  })),
  on(getAllOrdersSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    orders: payload,
  })),
  on(placeOrderSuccess, cancelOrderSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    orders: state.orders.filter((order) => order.id === payload),
  })),
  on(
    confirmOrderSuccess,
    shipOrderSuccess,
    deliverOrderSuccess,
    (state, { payload }) => ({
      ...state,
      loading: false,
      orders: state.orders.map((order) =>
        order.id === payload.id ? payload : order
      ),
    })
  ),
  on(deleteOrderSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    orders: state.orders.filter((order) => order.id !== payload),
  })),

  on(
    createOrderFailure,
    getOrderByIdFailure,
    getOrderHistoryFailure,
    getAllOrdersFailure,
    placeOrderFailure,
    confirmOrderFailure,
    cancelOrderFailure,
    shipOrderFailure,
    deliverOrderFailure,
    deleteOrderFailure,
    (state, { error }) => ({
      ...state,
      loading: true,
      error,
    })
  )
);
