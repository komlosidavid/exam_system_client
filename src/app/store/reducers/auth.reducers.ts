import { Action, createReducer, on } from '@ngrx/store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import {
  loginFailure,
  loginSuccess,
  logout,
  refreshTokenRequest,
} from '../actions/auth.actions';
import { State, initialState } from '../states/auth.state';

const _authReducer = createReducer(

  initialState,
  on(loginSuccess, (state, { loginSuccessResponse }) => {
    return {
      ...state,
      isAuthenticated: true,
      accessToken: loginSuccessResponse.accessToken,
      refreshToken: loginSuccessResponse.refreshToken,
      user: loginSuccessResponse.user,
    };
  }),
  on(refreshTokenRequest, (state, { token }) => {
    return {
      ...state,
      accessToken: token,
    };
  }),
  on(loginFailure, (state, { error }) => {
    return {
      ...state,
      isAuthenticated: false,
      loginError: error,
      accessToken: null,
      refreshToken: null,
      user: null,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      user: null,
    };
  })
);

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action);
}

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectAccessToken = createSelector(
  selectAuthState,
  (state) => state.accessToken
);
export const selectRefreshToken = createSelector(
  selectAuthState,
  (state) => state.refreshToken
);
export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);
export const selectErrorMessage = createSelector(
  selectAuthState,
  (state) => state.loginError
);
