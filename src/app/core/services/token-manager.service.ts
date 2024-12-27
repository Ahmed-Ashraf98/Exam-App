import { inject, Injectable } from '@angular/core';
import { CookieManagerService } from './cookie-manager.service';

@Injectable({
  providedIn: 'root',
})
export class TokenManagerService {
  private readonly tokenKeyName = 'token';
  private readonly _CookieManagerService = inject(CookieManagerService);

  setToken(token: string) {
    this._CookieManagerService.setCookie(this.tokenKeyName, token);
  }

  getToken(): string | null {
    return this._CookieManagerService.getCookie(this.tokenKeyName);
  }

  clearToken() {
    console.log('clearing token');
    this._CookieManagerService.deleteCookie(this.tokenKeyName);
  }
}
