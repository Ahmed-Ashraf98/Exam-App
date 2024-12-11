import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
import { RequestCategory } from '../enums/requestCategory';

@Injectable({
  providedIn: 'root',
})
export class AuthAPIAdapter implements Adapter {
  constructor() {}

  adapt(data: any, requestCategory: RequestCategory): any {
    let resultObj;
    switch (requestCategory) {
      case RequestCategory.Login:
      case RequestCategory.Register:
        resultObj = {
          message: data.message,
          token: data.token,
          user: data.user,
        };
        break;

      case RequestCategory.ForgotPass:
        resultObj = {
          message: data.message,
          info: data.info,
        };
        break;

      case RequestCategory.ResetPassword:
        resultObj = {
          message: data.message,
          token: data.token,
        };
        break;

      case RequestCategory.VerifyCode:
        resultObj = { status: data.status };
        break;

      case RequestCategory.ChangePassword:
        resultObj = {};
        break;

      case RequestCategory.DeleteMyAcc:
        resultObj = {};
        break;

      case RequestCategory.EditProfile:
        resultObj = {};
        break;

      case RequestCategory.Logout:
        resultObj = { message: data.message };
        break;

      case RequestCategory.ProfileData:
        resultObj = {
          message: data.message,
          _id: data.user._id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          role: data.user.role,
        };
        break;
    }

    return resultObj;
  }
}
