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
    }

    return resultObj;
  }
}
