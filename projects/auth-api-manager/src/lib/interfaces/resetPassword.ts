export interface ResetPasswordReq {
  email: string;
  newPassword: string;
}

export interface ResetPasswordRes {
  message: string;
  token: string;
}
