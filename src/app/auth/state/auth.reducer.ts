import * as AuthActions from './auth.actions';

export interface AuthState {
  accessToken: string;
  refreshToken: string;
}

export const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
};

export function setAccessToken(state = initialState): AuthState {
  return { ...state, accessToken: state.accessToken };
}
