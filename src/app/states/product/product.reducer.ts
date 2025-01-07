import { createReducer, on } from '@ngrx/store';
import {
  createProductFailure,
  createProductRequest,
  createProductSuccess,
  deleteProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  findProductsByCategoryFailure,
  findProductsByCategoryRequest,
  findProductsByCategorySuccess,
  findProductsByIdFailure,
  findProductsByIdRequest,
  findProductsByIdSuccess,
  searchProductsFailure,
  searchProductsRequest,
  searchProductsSuccess,
} from './product.actions';

export interface ProductState {
  products: {
    content: any[];
    currentPage: any;
    totalPages: any;
  };
  loading: boolean;
  error: any | null;
  product: any | null;
  searchResults: any;
}

const initialState: ProductState = {
  products: {
    content: [],
    currentPage: null,
    totalPages: null,
  },
  loading: false,
  error: null,
  product: null,
  searchResults: [],
};

export const productReducer = createReducer(
  initialState,
  on(
    findProductsByCategoryRequest,
    findProductsByIdRequest,
    deleteProductRequest,
    createProductRequest,
    searchProductsRequest,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(findProductsByCategorySuccess, (state, { payload }) => ({
    ...state,
    products: payload,
    content: payload.content,
    loading: false,
  })),
  on(findProductsByIdSuccess, (state, { payload }) => ({
    ...state,
    product: payload,
    loading: false,
  })),
  on(deleteProductSuccess, (state, { payload }) => ({
    ...state,
    products: {
      content: state.products.content.filter(
        (product) => product._id !== payload
      ),
      currentPage: state.products.currentPage,
      totalPages: state.products.totalPages,
    },
    loading: false,
  })),
  on(createProductSuccess, (state, { payload }) => ({
    ...state,
    product: payload,
    loading: false,
  })),
  on(searchProductsSuccess, (state, { payload }) => ({
    ...state,
    searchResults: payload,
    loading: false,
  })),
  on(
    findProductsByCategoryFailure,
    findProductsByIdFailure,
    deleteProductFailure,
    createProductFailure,
    searchProductsFailure,
    (state, { error }) => ({
      ...state,
      error: error,
      loading: false,
    })
  )
);
