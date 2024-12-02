import { FormGroup } from '@angular/forms';
import { FormTypes } from '../enums/formTypes';
import { FormFields } from './forms-fields';
export interface FormAdapter {
  formAdapter(formType: FormTypes, formFields?: FormFields): FormGroup;
  createFormFields(data: any): any;
}
