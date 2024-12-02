import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimaryButtonComponent } from '../../../shared/components/ui/primary-button/primary-button.component';
import { Router } from '@angular/router';
import { formTypes } from '../../../shared/enums/formTypes';
import { InputTextModule } from 'primeng/inputtext';
import { InputValidationAlertComponent } from '../../../shared/components/business/input-validation-alert/input-validation-alert.component';
import { AuthApiManagerService } from 'auth-api-manager';
import { ToastComponent } from '../../../shared/components/ui/toast/toast.component';
import { baseUrl } from '../../environment/environment.prod';
import { EmailSignal } from '../../../features/services/email.signal.service';
import { AuthFormsService } from 'auth-forms';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PrimaryButtonComponent,
    InputTextModule,
    InputValidationAlertComponent,
    ToastComponent,
  ],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss',
})
export class VerifyCodeComponent {
  // inject services
  private readonly _AuthApiManagerService = inject(AuthApiManagerService);
  private readonly _Router = inject(Router);
  private readonly _EmailSignal = inject(EmailSignal);
  private readonly _AuthFormsService = inject(AuthFormsService);
  // Create instance from toaster
  private readonly _Toaster = new ToastComponent();

  // initialize the variables
  verifyCodeForm = this._AuthFormsService.verifyCodeFormBuilder();
  isSubmitted = false;
  isReSendCodeClicked: boolean = false;
  displayOTPTime: any;

  /**
   * @summary  Submit data to register API
   * @param data  The form data
   */
  verifyCode(data: any) {
    this.isSubmitted = true;
    this._AuthApiManagerService.verifyCode(baseUrl, data).subscribe({
      next: (res) => {
        this.isSubmitted = false;
        let severity = '';
        let title = '';
        let message = '';
        if (res.status == 'Success') {
          severity = 'success';
          title = 'OTP Match';
          message = 'Successfully OTP check';
          this._Router.navigate(['auth/resetPass']);
        } else {
          console.log(res);
          let errorMsg = res.error.message;
          severity = 'error';
          title = 'Error!';
          message = errorMsg;
        }
        this._Toaster.showToaster(severity, title, message);
      },
    });
  }

  /**
   * @summary  This function resend the OTP to the user email
   */
  resendOTP() {
    this.isReSendCodeClicked = true;
    this.timerOfOTP(1);
    let data = { email: this._EmailSignal.getData()! };
    this._AuthApiManagerService.forgotPassword(baseUrl, data).subscribe({
      next: (res) => {
        this.isSubmitted = false;
        let severity = '';
        let title = '';
        let message = '';

        if (res.message == 'success') {
          severity = 'success';
          title = 'OTP Sent';
          message = res.info;
        } else {
          let errorMsg = res.error.message;
          severity = 'error';
          title = 'Error!';
          message = errorMsg;
        }
        this._Toaster.showToaster(severity, title, message);
      },
    });
  }

  /**
   * @summary Set timer for re-send OTP (You can re-send every number of "minute" passed to this function )
   * @param minute Number of minutes to enable re-send the OTP again
   */
  timerOfOTP(minute: any) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.displayOTPTime = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log('finished');
        clearInterval(timer);
        this.isReSendCodeClicked = false;
      }
    }, 1000);
  }
}
