import { User } from './user';

export interface Register_Request {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface Register_Response {
  message: string;
  token: string;
  user: User;
}
