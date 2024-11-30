import { Observable } from 'rxjs';
import { LoginReq } from '../interfaces/login';
import { RegisterReq } from '../interfaces/register';
import { ResetPasswordReq } from '../interfaces/resetPassword';
import { VerifyCodeReq } from '../interfaces/verify-otp';
import { ForgotPasswordReq } from '../interfaces/forgot-pass';

export abstract class AuthAPI {
  abstract login(baseURL: string, data: LoginReq): Observable<any>;
  abstract register(baseURL: string, data: RegisterReq): Observable<any>;
  abstract forgotPassword(
    baseURL: string,
    data: ForgotPasswordReq
  ): Observable<any>;
  abstract verifyCode(baseURL: string, data: VerifyCodeReq): Observable<any>;
  abstract resetPassword(
    baseURL: string,
    data: ResetPasswordReq
  ): Observable<any>;
}
