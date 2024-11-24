import { User } from './user';

export interface RegisterReq {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface RegisterSuccessRes {
  message: string;
  token: string;
  user: User;
}
