import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieManagerService {
  private readonly _platform = inject(PLATFORM_ID);
  private readonly _CookieService = inject(CookieService);

  setCookie(name: string, value: string) {
    if (isPlatformBrowser(this._platform)) {
      this._CookieService.set(name, value);
    }
  }

  getCookie(name: string): string | null {
    if (isPlatformBrowser(this._platform)) {
      return this._CookieService.get(name);
    }
    return null;
  }

  deleteCookie(name: string) {
    if (isPlatformBrowser(this._platform)) {
      this._CookieService.delete(name);
    }
  }
}
