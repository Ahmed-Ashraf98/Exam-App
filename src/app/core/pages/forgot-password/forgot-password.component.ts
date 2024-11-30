import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { AuthButtonComponent } from '../../../shared/components/ui/auth-button/auth-button.component';
import { Router } from '@angular/router';
import { FormsManagerComponent } from '../../../shared/components/business/forms-manager/forms-manager.component';
import { formTypes } from '../../../shared/enums/formTypes';
import { InputValidationAlertComponent } from '../../../shared/components/business/input-validation-alert/input-validation-alert.component';
import { AuthApiManagerService } from 'auth-api-manager';
import { ToastComponent } from '../../../shared/components/ui/toast/toast.component';
import { EmailSignal } from '../../../features/services/email.signal.service';
import { baseUrl } from '../../environment/environment.prod';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    AuthButtonComponent,
    InputValidationAlertComponent,
    ToastComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  private readonly _AuthApiManagerService = inject(AuthApiManagerService);
  private readonly _Toaster = new ToastComponent();
  private readonly _Router = inject(Router);
  private readonly _EmailSignal = inject(EmailSignal);
  forgotPassForm = new FormsManagerComponent(formTypes.ForgotPass).getForm();
  isSubmitted = false;

  sendOTP(data: any) {
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
