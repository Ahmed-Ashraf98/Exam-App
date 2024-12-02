import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static ConfirmPassword(control: AbstractControl) {
    if (control.get('password')?.value == control.get('rePassword')?.value) {
      return null;
    }
    return { mismatch: true };
  }
}
