import { inject, Injectable } from '@angular/core';
import { AppAdapter } from '../interface/app-adapter.interface';

@Injectable({
  providedIn: 'root',
})
export class APIAdapter implements AppAdapter {}
