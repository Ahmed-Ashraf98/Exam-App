import { FormControl, FormGroup } from '@angular/forms';
import { FormTypes } from '../enums/formTypes';
import { FormField } from './forms-fields';

export interface FormAdapter {
  formAdapter(formType: FormTypes): FormGroup;
  fieldCreation(fieldObj: FormField): FormControl;
}
