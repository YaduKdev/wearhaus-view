import { createReducer, on } from '@ngrx/store';
import {
  addItemToCartFailure,
  addItemToCartRequest,
  addItemToCartSuccess,
  getCartFailure,
  getCartRequest,
  getCartSuccess,
  removeCartItemFailure,
  removeCartItemRequest,
  removeCartItemSuccess,
  updateCartItemFailure,
  updateCartItemRequest,
  updateCartItemSuccess,
} from './cart.actions';

export interface CartState {
  cartItems: any[];
  loading: boolean;
  error: any;
  cart: any;
}

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
  cart: null,
};

export const cartReducer = createReducer(
  initialState,
  on(
    addItemToCartRequest,
    getCartRequest,
    removeCartItemRequest,
    updateCartItemRequest,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),

  on(addItemToCartSuccess, (state, action) => ({
    ...state,
    loading: false,
    cartItems: [...state.cartItems, action.payload],
  })),
  on(getCartSuccess, (state, action) => ({
    ...state,
    loading: false,
    cartItems: action.payload.cartItems,
    cart: action.payload,
  })),
  on(removeCartItemSuccess, (state, action) => ({
    ...state,
    loading: false,
    cartItems: state.cartItems.filter((item) => item._id !== action.cartItemId),
  })),
  on(updateCartItemSuccess, (state, action) => ({
    ...state,
    loading: false,
    cartItems: state.cartItems.map((item) =>
      item._id === action.payload.cartItem._id ? action.payload.cartItem : item
    ),
    cart: action.payload.cart,
  })),

  on(
    addItemToCartFailure,
    getCartFailure,
    removeCartItemFailure,
    updateCartItemFailure,
    (state, action) => ({
      ...state,
      loading: false,
      error: action.error,
    })
  )
);
