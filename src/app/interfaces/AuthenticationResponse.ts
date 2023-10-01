import { User } from "../models/user.model";

export interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
  user: User
}
