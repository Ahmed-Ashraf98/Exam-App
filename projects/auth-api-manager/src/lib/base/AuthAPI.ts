import { Observable } from 'rxjs';
import { Login_Request } from '../interfaces/login';
import { Register_Request } from '../interfaces/register';
import { ResetPWD_Request } from '../interfaces/resetPassword';
import { VerifyCode_Request } from '../interfaces/verify-otp';
import { ForgotPWD_Request } from '../interfaces/forgot-pass';

export abstract class AuthAPI {
  /**
   * @summary This method is used to submit the login details of the user and return the result from backend
   * @param baseURL the base URL for the API, for example : https://example.com/api/v1/
   * @param data the data submitted in [ Login ] Form
   * @returns Observable
   */
  abstract login(baseURL: string, data: Login_Request): Observable<any>;
  /**
   * @summary This method is used to submit the user registeration details and return the result from backend
   * @param baseURL the base URL for the API, for example : https://example.com/api/v1/
   * @param data the data submitted in [ Register ] Form
   * @returns Observable
   */
  abstract register(baseURL: string, data: Register_Request): Observable<any>;
  /**
   * @summary This method is used to send OTP to the User email
   * @param baseURL the base URL for the API, for example : https://example.com/api/v1/
   * @param data the data submitted in [ Forgot Password ] Form
   * @returns Observable
   */
  abstract forgotPassword(
    baseURL: string,
    data: ForgotPWD_Request
  ): Observable<any>;
  /**
   * @summary This method is used to verify the entered OTP code
   * @param baseURL the base URL for the API, for example : https://example.com/api/v1/
   * @param data the data submitted in [ Verify Code ] Form
   * @returns Observable
   */
  abstract verifyCode(
    baseURL: string,
    data: VerifyCode_Request
  ): Observable<any>;
  /**
   * @summary This method is used to reset password
   * @param baseURL the base URL for the API, for example : https://example.com/api/v1/
   * @param data the data submitted in [ Reset Password ] Form
   * @returns Observable
   */
  abstract resetPassword(
    baseURL: string,
    data: ResetPWD_Request
  ): Observable<any>;

  /**
   * @summary This method is used to change the password of the user by providing the old password
   * @param baseURL the base URL for the API, for example : https://example.com/api/v1/
   * @param data the object contains {oldPassword,password,rePassword}
   * @returns Observable
   */
  abstract changePassword(baseURL: string, data: any): Observable<any>;
  /**
   * @summary This method is used to delete user account
   * @param baseURL the base URL for the API, for example : https://example.com/api/v1/
   * @returns Observable
   */
  abstract deleteMyAcc(baseURL: string): Observable<any>;
  /**
   * @summary This method is used to edit user profile
   * @param baseURL the base URL for the API, for example : https://example.com/api/v1/
   * @param data the user data that need to be updated
   * @returns Observable
   */
  abstract editProfile(baseURL: string, data: any): Observable<any>;
  /**
   * @summary This method is used to logout the user from the system
   * @param baseURL the base URL for the API, for example : https://example.com/api/v1/
   * @returns Observable
   */
  abstract logout(baseURL: string): Observable<any>;
  /**
   * @summary This method is used to retrive User Info
   * @param baseURL the base URL for the API, for example : https://example.com/api/v1/
   * @returns Observable
   */
  abstract profileData(baseURL: string): Observable<any>;
}
