import { inject, Injectable } from '@angular/core';
import { LocalStorageManagerService } from './local-storage-manager.service';

@Injectable({
  providedIn: 'root',
})
export class TokenManagerService {
  private readonly tokenKeyName = 'token';
  private readonly _LocalStorageManagerService = inject(
    LocalStorageManagerService
  );

  set saveToken(token: string) {
    this._LocalStorageManagerService.setData(this.tokenKeyName, token);
  }

  get getToken(): string | null {
    return this._LocalStorageManagerService.getData(this.tokenKeyName);
  }
}
