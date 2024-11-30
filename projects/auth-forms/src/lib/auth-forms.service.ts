import { Injectable } from '@angular/core';
import { FormsManager } from './base/FormsManager';
import { FormGroup } from '@angular/forms';

import { AuthFormsAdapter } from './adapter/auth-forms.adapter';
import { FormTypes } from './enums/formTypes';

@Injectable({
  providedIn: 'root',
})
export class AuthFormsService implements FormsManager {
  constructor(private _AuthFormsAdapter: AuthFormsAdapter) {}

  loginFormBuilder(): FormGroup {
    return this._AuthFormsAdapter.formAdapter(FormTypes.Login);
  }
  registerFormBuilder(): FormGroup {
    return this._AuthFormsAdapter.formAdapter(FormTypes.Register);
  }
  forgotPassFormBuilder(): FormGroup {
    return this._AuthFormsAdapter.formAdapter(FormTypes.ForgotPass);
  }
  resetPassFormBuilder(): FormGroup {
    return this._AuthFormsAdapter.formAdapter(FormTypes.ResetPass);
  }
  verifyCodeFormBuilder(): FormGroup {
    return this._AuthFormsAdapter.formAdapter(FormTypes.VerifyCode);
  }
}
