import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResetPassStepsSignalService {
  private dataSignal = signal<number | null>(null);

  getCurrentStep() {
    return this.dataSignal();
  }

  setStep(value: number | null) {
    this.dataSignal.set(value);
  }
}
