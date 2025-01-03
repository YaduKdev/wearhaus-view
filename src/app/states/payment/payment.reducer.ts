import { createReducer, on } from '@ngrx/store';
import {
  createPaymentFailure,
  createPaymentRequest,
  createPaymentSuccess,
  updatePaymentInfoFailure,
  updatePaymentInfoRequest,
  updatePaymentInfoSuccess,
} from './payment.actions';

const initialState = {
  payment: null,
  paymentInfo: null,
  loading: false,
  error: null,
};

export const paymentReducer = createReducer(
  initialState,
  on(createPaymentRequest, updatePaymentInfoRequest, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(createPaymentSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payment: payload,
  })),
  on(updatePaymentInfoSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    paymentInfo: payload,
  })),
  on(createPaymentFailure, updatePaymentInfoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
