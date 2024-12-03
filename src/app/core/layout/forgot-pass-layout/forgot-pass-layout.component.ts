import { Component, effect, inject, OnDestroy } from '@angular/core';
import { ResetPassStepsSignalService } from '../../../features/services/reset-pass-steps-signal.service';
import { ForgotPasswordComponent } from '../../pages/forgot-password/forgot-password.component';
import { VerifyCodeComponent } from '../../pages/verify-code/verify-code.component';
import { ResetPasswordComponent } from '../../pages/reset-password/reset-password.component';

@Component({
  selector: 'app-forgot-pass-layout',
  standalone: true,
  imports: [
    ForgotPasswordComponent,
    VerifyCodeComponent,
    ResetPasswordComponent,
  ],
  templateUrl: './forgot-pass-layout.component.html',
  styleUrl: './forgot-pass-layout.component.scss',
})
export class ForgotPassLayoutComponent implements OnDestroy {
  private readonly _StepsSignal = inject(ResetPassStepsSignalService);
  currentStep: number | null = 1;

  constructor() {
    // Initialize currentStep from the signal
    this._StepsSignal.setStep(1);
    this.currentStep = this._StepsSignal.getCurrentStep();

    // Use effect to track changes in the signal
    effect(() => {
      this.currentStep = this._StepsSignal.getCurrentStep();
    });
  }

  ngOnDestroy(): void {
    // Reset the signal when the component is destroyed
    this._StepsSignal.setStep(null);
  }
}
