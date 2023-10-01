import { User } from './user.model';

export class UserClass implements User {
  fullname?: string | undefined;
  id?: number | undefined;
  password?: string | undefined;
  token?: string | undefined;
  username?: string | undefined;
}
