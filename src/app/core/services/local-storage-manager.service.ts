import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageManagerService {
  private readonly _platform = inject(PLATFORM_ID);

  setData(key: string, value: string) {
    if (isPlatformBrowser(this._platform)) {
      localStorage.setItem(key, value);
    }
  }

  getData(key: string): string | null {
    if (isPlatformBrowser(this._platform)) {
      return localStorage.getItem(key);
    }
    return null;
  }
}
