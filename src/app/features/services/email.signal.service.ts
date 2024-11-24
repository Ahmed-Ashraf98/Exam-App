import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailSignal {
  private dataSignal = signal<string | null>(null);

  getData() {
    return this.dataSignal();
  }

  setData(value: string | null) {
    this.dataSignal.set(value);
  }
}
