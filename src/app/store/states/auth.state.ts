import { User } from 'src/app/models/user.model';

export interface State {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  loginError?: string;
}

export const initialState: State = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: null,
};
