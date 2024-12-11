import { inject, Injectable } from '@angular/core';
import { AuthAPI } from './base/AuthAPI';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthEndpoint } from './enums/AuthAPI.endpoint';
import { AuthAPIAdapter } from './adapter/auth-api.adapter';
import { Login_Request } from './interfaces/login';
import { Register_Request } from './interfaces/register';
import { ErrorResponse } from './interfaces/error-response';
import { ForgotPWD_Request } from './interfaces/forgot-pass';
import { RequestCategory } from './enums/requestCategory';
import { VerifyCode_Request } from './interfaces/verify-otp';
import { ResetPWD_Request } from './interfaces/resetPassword';

@Injectable({
  providedIn: 'root',
})
export class AuthApiManagerService implements AuthAPI {
  // Inject Services
  private readonly _HttpClient = inject(HttpClient);
  // Initalize the object with adapter
  constructor(private _AuthAPIAdapter: AuthAPIAdapter) {}

  login(baseURL: string, data: Login_Request): Observable<any> {
    return this._HttpClient.post(baseURL + AuthEndpoint.LOGIN, data).pipe(
      map((res: any) => this._AuthAPIAdapter.adapt(res, RequestCategory.Login)),
      catchError((err: ErrorResponse) => of(err))
    );
  }

  register(baseURL: string, data: Register_Request): Observable<any> {
    return this._HttpClient.post(baseURL + AuthEndpoint.REGISTER, data).pipe(
      map((res: any) =>
        this._AuthAPIAdapter.adapt(res, RequestCategory.Register)
      ),
      catchError((err: ErrorResponse) => of(err))
    );
  }

  forgotPassword(baseURL: string, data: ForgotPWD_Request): Observable<any> {
    return this._HttpClient
      .post(baseURL + AuthEndpoint.FORGOT_PASSWORD, data)
      .pipe(
        map((res: any) =>
          this._AuthAPIAdapter.adapt(res, RequestCategory.ForgotPass)
        ),
        catchError((err: ErrorResponse) => of(err))
      );
  }

  verifyCode(baseURL: string, data: VerifyCode_Request): Observable<any> {
    return this._HttpClient.post(baseURL + AuthEndpoint.VERIFY_CODE, data).pipe(
      map((res: any) =>
        this._AuthAPIAdapter.adapt(res, RequestCategory.VerifyCode)
      ),
      catchError((err: ErrorResponse) => of(err))
    );
  }

  resetPassword(baseURL: string, data: ResetPWD_Request): Observable<any> {
    return this._HttpClient
      .put(baseURL + AuthEndpoint.RESET_PASSWORD, data)
      .pipe(
        map((res: any) =>
          this._AuthAPIAdapter.adapt(res, RequestCategory.ResetPassword)
        ),
        catchError((err: ErrorResponse) => of(err))
      );
  }

  changePassword(baseURL: string, data: any): Observable<any> {
    return this._HttpClient
      .patch(baseURL + AuthEndpoint.CHANGE_PASSWORD, data)
      .pipe(
        map((res: any) =>
          this._AuthAPIAdapter.adapt(res, RequestCategory.ChangePassword)
        ),
        catchError((err: ErrorResponse) => of(err))
      );
  }

  deleteMyAcc(baseURL: string): Observable<any> {
    return this._HttpClient.delete(baseURL + AuthEndpoint.DELETE_MY_ACC).pipe(
      map((res: any) =>
        this._AuthAPIAdapter.adapt(res, RequestCategory.DeleteMyAcc)
      ),
      catchError((err: ErrorResponse) => of(err))
    );
  }

  editProfile(baseURL: string, data: any): Observable<any> {
    return this._HttpClient.put(baseURL + AuthEndpoint.EDIT_PROFILE, data).pipe(
      map((res: any) =>
        this._AuthAPIAdapter.adapt(res, RequestCategory.EditProfile)
      ),
      catchError((err: ErrorResponse) => of(err))
    );
  }

  logout(baseURL: string): Observable<any> {
    return this._HttpClient.get(baseURL + AuthEndpoint.LOGOUT).pipe(
      map((res: any) =>
        this._AuthAPIAdapter.adapt(res, RequestCategory.Logout)
      ),
      catchError((err: ErrorResponse) => of(err))
    );
  }

  profileData(baseURL: string): Observable<any> {
    return this._HttpClient.get(baseURL + AuthEndpoint.PROFILE_INFO).pipe(
      map((res: any) =>
        this._AuthAPIAdapter.adapt(res, RequestCategory.ProfileData)
      ),
      catchError((err: ErrorResponse) => of(err))
    );
  }
}
