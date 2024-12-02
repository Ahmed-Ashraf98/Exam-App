import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { PrimaryButtonComponent } from '../../../shared/components/ui/primary-button/primary-button.component';
import { Router } from '@angular/router';
import { FormsManagerComponent } from '../../../shared/components/business/forms-manager/forms-manager.component';
import { formTypes } from '../../../shared/enums/formTypes';
import { InputValidationAlertComponent } from '../../../shared/components/business/input-validation-alert/input-validation-alert.component';
import { AuthApiManagerService } from 'auth-api-manager';
import { ToastComponent } from '../../../shared/components/ui/toast/toast.component';
import { EmailSignal } from '../../../features/services/email.signal.service';
import { baseUrl } from '../../environment/environment.prod';
import { AuthFormsService } from 'auth-forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    PrimaryButtonComponent,
    InputValidationAlertComponent,
    ToastComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  // inject services
  private readonly _AuthApiManagerService = inject(AuthApiManagerService);
  private readonly _Router = inject(Router);
  private readonly _EmailSignal = inject(EmailSignal);
  private readonly _AuthFormsService = inject(AuthFormsService);
  // Create instance from toaster
  private readonly _Toaster = new ToastComponent();
  // initialize the variables
  forgotPassForm = this._AuthFormsService.forgotPassFormBuilder();
  isSubmitted = false;

  /**
   * @summary Send the data to Forgot Pass API, after successful API Call the following should happen :
   *  - The app will re-direct the user to the Verify Code Page
   *  - The user should recieve the OTP over the email
   * @param data The form data
   */
  sendOTP(data: any) {
    this.isSubmitted = true;
    this._AuthApiManagerService.forgotPassword(baseUrl, data).subscribe({
      next: (res) => {
        this.isSubmitted = false;
        let severity = '';
        let title = '';
        let message = '';

        if (res.message == 'success') {
          this._EmailSignal.setData(data.email);
          severity = 'success';
          title = 'OTP Sent';
          message = res.info;
          this._Router.navigate(['auth/verifyCode']);
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
}
