import { inject, Injectable } from '@angular/core';
import { CookieManagerService } from './cookie-manager.service';

@Injectable({
  providedIn: 'root',
})
export class TokenManagerService {
  private readonly tokenKeyName = 'token';
  private readonly _CookieManagerService = inject(CookieManagerService);

  set setToken(token: string) {
    this._CookieManagerService.setCookie(this.tokenKeyName, token);
  }

  get getToken(): string | null {
    return this._CookieManagerService.getCookie(this.tokenKeyName);
  }

  clearToken() {
    this._CookieManagerService.deleteCookie(this.tokenKeyName);
  }
}
