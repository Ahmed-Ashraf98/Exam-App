import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { formTypes } from '../../../enums/formTypes';
import {
  NAME_PATTERN,
  PASSWORD_PATTERN,
  USERNAME_PATTERN,
} from '../../../../core/environment/environment.prod';

@Component({
  selector: 'app-forms-manager',
  standalone: true,
  imports: [],
  templateUrl: './forms-manager.component.html',
  styleUrl: './forms-manager.component.scss',
})
export class FormsManagerComponent {
  // formFields_2: FormField = {
  //   email: {
  //     default_val: '',
  //     field_rules: [Validators.required, Validators.email],
  //   },

  //   password: {
  //     default_val: '',
  //     field_rules: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
  //   },

  //   rePassword: {
  //     default_val: '',
  //     field_rules: [Validators.required],
  //   },

  //   username: {
  //     default_val: '',
  //     field_rules: [Validators.required, Validators.pattern(USERNAME_PATTERN)],
  //   },

  //   firstName: {
  //     default_val: '',
  //     field_rules: [Validators.required, Validators.pattern(NAME_PATTERN)],
  //   },

  //   lastName: {
  //     default_val: '',
  //     field_rules: [Validators.required, Validators.pattern(NAME_PATTERN)],
  //   },

  //   phone: {
  //     default_val: '',
  //     field_rules: [Validators.required, Validators.pattern(NAME_PATTERN)],
  //   },

  //   resetCode: {
  //     default_val: '',
  //     field_rules: [Validators.required],
  //   },
  // };

  formType: formTypes;

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

  constructor(formType: formTypes) {
    this.formType = formType;
  }

  getForm() {
    return this.generateForm();
  }

  generateForm(): FormGroup {
    switch (this.formType) {
      case formTypes.Login:
        return this.loginForm();
      case formTypes.Register:
        return this.registerForm();
      case formTypes.ForgotPass:
        return this.forgotPassForm();
      case formTypes.ResetPass:
        return this.ResetPassForm();
      case formTypes.VerifyCode:
        return this.verifyCodeForm();
    }
  }

  loginForm(): FormGroup {
    return new FormGroup({
      email: this.formsFields.email,
      password: this.formsFields.password,
    });
  }

  confirmPassword(control: AbstractControl) {
    if (control.get('password')?.value == control.get('rePassword')?.value) {
      return null;
    }
    return { mismatch: true };
  }

  registerForm() {
    return new FormGroup(
      {
        firstName: this.formsFields.firstName,
        lastName: this.formsFields.lastName,
        username: this.formsFields.username,
        email: this.formsFields.email,
        phone: this.formsFields.phone,
        password: this.formsFields.password,
        rePassword: this.formsFields.rePassword,
      },
      this.confirmPassword
    );
  }

  forgotPassForm() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ResetPassForm() {
    return new FormGroup(
      {
        email: this.formsFields.email,
        password: this.formsFields.password,
        rePassword: this.formsFields.rePassword,
      },
      this.confirmPassword
    );
  }

  verifyCodeForm() {
    return new FormGroup({
      resetCode: this.formsFields.resetCode,
    });
  }
}
