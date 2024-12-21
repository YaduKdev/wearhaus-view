import { createReducer, on } from '@ngrx/store';
import {
  getUserProfile,
  getUserProfileSuccess,
  getUserProfileFailure,
  logoutSuccess,
} from './user.actions';

const initialState = {
  userProfile: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(getUserProfile, (state) => ({ ...state, loading: true, error: null })),
  on(getUserProfileSuccess, (state, { userProfile }) => ({
    ...state,
    loading: false,
    error: null,
    userProfile,
  })),
  on(getUserProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(logoutSuccess, () => initialState)
);
