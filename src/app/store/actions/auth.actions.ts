import { createAction, props } from '@ngrx/store';
import { AuthenticationResponse } from 'src/app/interfaces/AuthenticationResponse';

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ payload: { username: string; password: string } }>()
);

export const refreshTokenRequest = createAction(
  '[AUTH] Refresh access token request',
  props<{ token: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ loginSuccessResponse: AuthenticationResponse }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
