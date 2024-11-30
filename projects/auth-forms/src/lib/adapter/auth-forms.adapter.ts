import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formTypes } from '../enums/formTypes';
import { FormAdapter } from '../interfaces/form-adapter';

export class AuthFormsAdapter implements FormAdapter {
  formsFields = {
    email: new FormControl<string | null>('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string | null>('', [
      Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{6,}$'),
    ]),

    rePassword: new FormControl<string | null>('', [Validators.required]),

    username: new FormControl<string | null>('', [
      Validators.required,
      Validators.pattern('^[A-Za-z]{4,25}$'),
    ]),

    firstName: new FormControl<string | null>('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    lastName: new FormControl<string | null>('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    phone: new FormControl<string | null>('', [
      Validators.required,
      Validators.pattern('^01[0125][0-9]{8}$'),
    ]),
    resetCode: new FormControl<string | null>('', [Validators.required]),
  };

  formAdapter(formType: formTypes): FormGroup {
    switch (formType) {
      case formTypes.Login: //TODO Return the Form
        return new FormGroup({});
      case formTypes.Register: //TODO Return the Form
        return;
      case formTypes.ForgotPass: //TODO Return the Form
        return;
      case formTypes.ResetPass: //TODO Return the Form
        return;
      case formTypes.VerifyCode: //TODO Return the Form
        return;
    }
  }
}
