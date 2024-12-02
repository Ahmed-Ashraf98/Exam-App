import { ValidatorFn, Validators } from '@angular/forms';

// interface ValidationRules {
//   isRequired: boolean;
//   use_default_email_pattern?: boolean;
//   minLength?: number;
//   maxLength?: number;
//   customPattern?: string;
// }

interface FieldSettings {
  default_val: string | number | boolean | null;
  field_rules: ValidatorFn[];
}

export interface FormFields {
  [key: string]: FieldSettings;
}
