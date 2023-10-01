import { UserClass } from 'src/app/models/userClass.model';

export interface State {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: UserClass | null;
  loginError?: string;
}

export const initialState: State = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: null,
};
