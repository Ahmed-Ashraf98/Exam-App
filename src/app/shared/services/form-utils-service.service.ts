import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  checkPassword(form: FormGroup): FormGroup {
    console.log('Validating password and managing rePassword control...');
    if (form.get('password')?.valid) {
      this.enableRePassword(form);
    } else {
      this.disableRePassword(form);
      this.clearRePassword(form);
    }
    console.log(form);
    return form;
  }

  disableRePassword(form: FormGroup): void {
    form.get('rePassword')?.disable();
  }

  enableRePassword(form: FormGroup): void {
    form.get('rePassword')?.enable();
  }

  clearRePassword(form: FormGroup): void {
    form.get('rePassword')?.setValue('');
  }
}
