export interface ResetPWD_Request {
  email: string;
  newPassword: string;
}

export interface ResetPWD_Response {
  message: string;
  token: string;
}
