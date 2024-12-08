import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LocalStorageManagerService } from './local-storage-manager.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TokenManagerService {
  private readonly tokenKeyName = 'token';
  private readonly _LocalStorageManagerService = inject(
    LocalStorageManagerService
  );
  private readonly _platform = inject(PLATFORM_ID);

  set setToken(token: string) {
    if (isPlatformBrowser(this._platform)) {
      this._LocalStorageManagerService.setData(this.tokenKeyName, token);
    }
  }

  get getToken(): string | null {
    if (isPlatformBrowser(this._platform)) {
      return this._LocalStorageManagerService.getData(this.tokenKeyName);
    }
    return null;
  }
}
