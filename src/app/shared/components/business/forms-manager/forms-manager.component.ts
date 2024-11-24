import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { formTypes } from '../../../enums/formTypes';

@Component({
  selector: 'app-forms-manager',
  standalone: true,
  imports: [],
  templateUrl: './forms-manager.component.html',
  styleUrl: './forms-manager.component.scss',
})
export class FormsManagerComponent {
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
