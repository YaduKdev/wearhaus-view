import { createAction, props } from '@ngrx/store';

export const createPaymentRequest = createAction(
  '[Payment] Create Payment Request'
);
export const createPaymentSuccess = createAction(
  '[Payment] Create Payment Success',
  props<{ payload: any }>()
);
export const createPaymentFailure = createAction(
  '[Payment] Create Payment Failure',
  props<{ error: any }>()
);

export const updatePaymentInfoRequest = createAction(
  '[Payment] Update Payment Info Request'
);
export const updatePaymentInfoSuccess = createAction(
  '[Payment] Update Payment Info Success',
  props<{ payload: any }>()
);
export const updatePaymentInfoFailure = createAction(
  '[Payment] Update Payment Info Failure',
  props<{ error: any }>()
);
