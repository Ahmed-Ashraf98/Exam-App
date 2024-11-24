import { inject, Injectable } from '@angular/core';
import { AuthAPI } from './base/AuthAPI';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthEndpoint } from './enums/AuthAPI.endpoint';
import { AuthAPIAdapter } from './adapter/auth-api.adapter';
import { LoginReq, LoginSuccessRes } from './interfaces/login';
import { RegisterReq } from './interfaces/register';
import { ErrorResponse } from './interfaces/error-response';
import { ForgotPasswordReq } from './interfaces/forgot-pass';
import { RequestCategory } from './enums/requestCategory';
import { VerifyCodeReq } from './interfaces/verify-otp';
import { ResetPasswordReq } from './interfaces/resetPassword';

@Injectable({
  providedIn: 'root',
})
export class AuthApiManagerService implements AuthAPI {
  // Inject Services
  private readonly _HttpClient = inject(HttpClient);
  // Initalize the object with adapter
  constructor(private _AuthAPIAdapter: AuthAPIAdapter) {}

  /**
   * @summary This method is used to submit the login details of the user and return the result from backend
   * @param data the data submitted in [ Login ] Form
   * @returns Observable
   */
  login(data: LoginReq): Observable<any> {
    return this._HttpClient.post(AuthEndpoint.LOGIN, data).pipe(
      map((res: any) => this._AuthAPIAdapter.adapt(res, RequestCategory.Login)),
      catchError((err: ErrorResponse) => of(err))
    );
  }

  /**
   * @summary This method is used to submit the user registeration details and return the result from backend
   * @param data the data submitted in [ Register ] Form
   * @returns Observable
   */
  register(data: RegisterReq): Observable<any> {
    return this._HttpClient.post(AuthEndpoint.REGISTER, data).pipe(
      map((res: any) =>
        this._AuthAPIAdapter.adapt(res, RequestCategory.Register)
      ),
      catchError((err: ErrorResponse) => of(err))
    );
  }

  /**
   * @summary This method is used to send OTP to the User email
   * @param data the data submitted in [ Forgot Password ] Form
   * @returns Observable
   */
  forgotPassword(data: ForgotPasswordReq): Observable<any> {
    return this._HttpClient.post(AuthEndpoint.FORGOT_PASSWORD, data).pipe(
      map((res: any) =>
        this._AuthAPIAdapter.adapt(res, RequestCategory.ForgotPass)
      ),
      catchError((err: ErrorResponse) => of(err))
    );
  }

  /**
   * @summary This method is used to verify the entered OTP code
   * @param data the data submitted in [ Verify Code ] Form
   * @returns Observable
   */
  verifyCode(data: VerifyCodeReq): Observable<any> {
    return this._HttpClient.post(AuthEndpoint.VERIFY_CODE, data).pipe(
      map((res: any) =>
        this._AuthAPIAdapter.adapt(res, RequestCategory.VerifyCode)
      ),
      catchError((err: ErrorResponse) => of(err))
    );
  }

  /**
   * @summary This method is used to reset password
   * @param data the data submitted in [ Reset Password ] Form
   * @returns Observable
   */
  resetPassword(data: ResetPasswordReq): Observable<any> {
    return this._HttpClient.post(AuthEndpoint.RESET_PASSWORD, data).pipe(
      map((res: any) =>
        this._AuthAPIAdapter.adapt(res, RequestCategory.ResetPassword)
      ),
      catchError((err: ErrorResponse) => of(err))
    );
  }
}
