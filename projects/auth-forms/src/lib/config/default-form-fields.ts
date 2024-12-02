import { Validators } from '@angular/forms';
import { FormFields } from '../interfaces/forms-fields';

// lib/default-form-fields.ts
export const DEFAULT_FORM_FIELDS: FormFields = {
  email: {
    default_val: '',
    field_rules: [Validators.required, Validators.email],
  },

  password: {
    default_val: '',
    field_rules: [
      Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{6,}$'),
    ],
  },

  rePassword: {
    default_val: '',
    field_rules: [Validators.required],
  },

  username: {
    default_val: '',
    field_rules: [Validators.required, Validators.pattern('^[A-Za-z]{4,25}$')],
  },

  firstName: {
    default_val: '',
    field_rules: [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
  },

  lastName: {
    default_val: '',
    field_rules: [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
  },

  phone: {
    default_val: '',
    field_rules: [
      Validators.required,
      Validators.pattern('^01[0125][0-9]{8}$'),
    ],
  },

  resetCode: {
    default_val: '',
    field_rules: [Validators.required],
  },
};
