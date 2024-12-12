import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
import { RequestTypes } from '../enums/RequestTypes';

@Injectable({
  providedIn: 'root',
})
export class AuthAPIAdapter implements Adapter {
  constructor() {}

  adapt(data: any, requestCategory: RequestTypes): any {
    let resultObj;
    switch (requestCategory) {
      case RequestTypes.Login:
      case RequestTypes.Register:
        resultObj = {
          message: data.message,
          token: data.token,
          user: data.user,
        };
        break;

      case RequestTypes.ForgotPass:
        resultObj = {
          message: data.message,
          info: data.info,
        };
        break;

      case RequestTypes.ResetPassword:
        resultObj = {
          message: data.message,
          token: data.token,
        };
        break;

      case RequestTypes.VerifyCode:
        resultObj = { status: data.status };
        break;

      case RequestTypes.ChangePassword:
        resultObj = {};
        break;

      case RequestTypes.DeleteMyAcc:
        resultObj = {};
        break;

      case RequestTypes.EditProfile:
        resultObj = {};
        break;

      case RequestTypes.Logout:
        resultObj = { message: data.message };
        break;

      case RequestTypes.ProfileData:
        resultObj = {
          message: data.message,
          user: {
            _id: data.user._id,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            role: data.user.role,
          },
        };
        break;
    }

    return resultObj;
  }
}
