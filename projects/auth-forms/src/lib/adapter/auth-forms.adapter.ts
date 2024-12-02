import { FormControl, FormGroup } from '@angular/forms';
import { FormAdapter } from '../interfaces/form-adapter';
import { FormTypes } from '../enums/formTypes';
import { FormFields } from '../interfaces/forms-fields';
import { DEFAULT_FORM_FIELDS } from '../config/default-form-fields';
import { FormFieldKeys } from '../enums/default-field-keys';
import { CustomValidators } from '../config/custom-validators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthFormsAdapter implements FormAdapter {
  formAdapter(formType: FormTypes, formFields?: FormFields): FormGroup {
    const keys = formFields
      ? Object.keys(formFields)
      : this.getDefaultFormKeys(formType);

    const formData = this.createFormFields(
      keys,
      formFields ?? DEFAULT_FORM_FIELDS
    );

    const isMatchPassRequired =
      formType === FormTypes.REGISTER || formType === FormTypes.RESET_PASS;

    return isMatchPassRequired
      ? new FormGroup(formData, CustomValidators.ConfirmPassword)
      : new FormGroup(formData);
  }

  createFormFields(keys: string[], obj?: FormFields): any {
    let formObj: any = {};
    keys.forEach((key) => {
      let field = obj![key];
      formObj[key] = new FormControl(field?.default_val, field?.field_rules);
    });
    return formObj;
  }

  private getDefaultFormKeys(formType: FormTypes) {
    let keys: any;
    switch (formType) {
      case FormTypes.LOGIN:
        keys = [FormFieldKeys.Email, FormFieldKeys.Password];
        break;
      case FormTypes.REGISTER:
        keys = [
          FormFieldKeys.FirstName,
          FormFieldKeys.LastName,
          FormFieldKeys.UserName,
          FormFieldKeys.Email,
          FormFieldKeys.Phone,
          FormFieldKeys.Password,
          FormFieldKeys.Re_Password,
        ];
        break;

      case FormTypes.FORGOT_PASS:
        keys = [FormFieldKeys.Email];
        break;

      case FormTypes.RESET_PASS:
        keys = [
          FormFieldKeys.Email,
          FormFieldKeys.Password,
          FormFieldKeys.Re_Password,
        ];
        break;

      case FormTypes.VERIFY_CODE:
        keys = [FormFieldKeys.Reset_Code];
        break;
    }
    return keys;
  }
}
