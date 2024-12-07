import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageManagerService {
  setData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getData(key: string) {
    return localStorage.getItem(key);
  }
}
