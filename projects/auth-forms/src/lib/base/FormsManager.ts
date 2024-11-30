import { FormGroup } from '@angular/forms';

export abstract class FormsManager {
  abstract loginFormBuilder(): FormGroup;
  abstract registerFormBuilder(): FormGroup;
  abstract forgotPassFormBuilder(): FormGroup;
  abstract resetPassFormBuilder(): FormGroup;
  abstract verifyCodeFormBuilder(): FormGroup;
}
