import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import {
  NAME_PATTERN,
  PASSWORD_PATTERN,
  PHONE_PATTERN,
  USERNAME_PATTERN,
} from '../environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class FormsManagerService {
  constructor() {}
}
