import { User } from './user';

export interface Login_Request {
  email: string;
  password: string;
}

export interface Login_Response {
  message: string;
  token: string;
  user: User;
}
