import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  /**
   * @summary This function disable the [ inputName ] input field
   * @param form The Form object
   * @param inputName The input name that you want to disable
   */
  disableField(form: FormGroup, inputName: string): void {
    form.get(inputName)?.disable();
  }

  /**
   * @summary This function enable the [ inputName ] input field
   * @param form The Form object
   * @param inputName The input name that you want to enable
   */
  enableField(form: FormGroup, inputName: string): void {
    form.get(inputName)?.enable();
  }

  /**
   * @summary This function clear the value of the [ inputName ] input field
   * @param form The Form object
   * @param inputName The input name that you want to clear
   */
  clearField(form: FormGroup, inputName: string): void {
    form.get(inputName)?.setValue('');
  }
}
