import { inject, Injectable } from '@angular/core';
import { FormsManager } from './base/FormsManager';
import { FormGroup } from '@angular/forms';

import { AuthFormsAdapter } from './adapter/auth-forms.adapter';
import { FormTypes } from './enums/formTypes';
import { FormFields } from '../public-api';

@Injectable({
  providedIn: 'root',
})
export class AuthFormsService implements FormsManager {
  constructor(private readonly _AuthFormsAdapter: AuthFormsAdapter) {}

  customFormBuilder(formFields: FormFields): FormGroup {
    return this._AuthFormsAdapter.formAdapter(FormTypes.CUSTOM, formFields);
  }

  loginFormBuilder(): FormGroup {
    return this._AuthFormsAdapter.formAdapter(FormTypes.LOGIN);
  }
  registerFormBuilder(): FormGroup {
    return this._AuthFormsAdapter.formAdapter(FormTypes.REGISTER);
  }
  forgotPassFormBuilder(): FormGroup {
    return this._AuthFormsAdapter.formAdapter(FormTypes.FORGOT_PASS);
  }
  resetPassFormBuilder(): FormGroup {
    return this._AuthFormsAdapter.formAdapter(FormTypes.RESET_PASS);
  }
  verifyCodeFormBuilder(): FormGroup {
    return this._AuthFormsAdapter.formAdapter(FormTypes.VERIFY_CODE);
  }
}
