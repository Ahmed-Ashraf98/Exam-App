import { FormGroup } from '@angular/forms';
import { FormFields } from '../interfaces/forms-fields';

export abstract class FormsManager {
  abstract customFormBuilder(formFields: FormFields): FormGroup;
  abstract loginFormBuilder(): FormGroup;
  abstract registerFormBuilder(): FormGroup;
  abstract forgotPassFormBuilder(): FormGroup;
  abstract resetPassFormBuilder(): FormGroup;
  abstract verifyCodeFormBuilder(): FormGroup;
}
