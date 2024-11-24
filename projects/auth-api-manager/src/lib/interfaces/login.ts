import { User } from './user';

export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginSuccessRes {
  message: string;
  token: string;
  user: User;
}
