import { Component, inject, OnInit } from '@angular/core';
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
import { FormUtilsService } from '../../../shared/services/form-utils-service.service';
import { baseUrl } from '../../environment/environment.prod';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    AuthButtonComponent,
    InputValidationAlertComponent,
    ToastComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  private readonly _AuthApiManagerService = inject(AuthApiManagerService);
  private readonly _Toaster = new ToastComponent();
  private readonly _Router = inject(Router);
  private readonly _EmailSignal = inject(EmailSignal);
  resetPassForm = new FormsManagerComponent(formTypes.ResetPass).getForm();
  private readonly _FormUtilsService = inject(FormUtilsService);
  isSubmitted = false;

  ngOnInit(): void {
    this.setTheEmail();
    this._FormUtilsService.disableRePassword(this.resetPassForm);
  }

  handlePasswordsMatching() {
    this._FormUtilsService.checkPassword(this.resetPassForm);
  }

  setTheEmail() {
    let email = this._EmailSignal.getData();
    console.log('The email..........> ', email);
    this.resetPassForm.get('email')?.setValue(email);
  }

  resetPass(data: any) {
    data = {
      email: data.email,
      newPassword: data.password,
    };
    console.log(data);
    this._AuthApiManagerService.resetPassword(baseUrl, data).subscribe({
      next: (res) => {
        this.isSubmitted = false;

        let severity = '';
        let title = '';
        let message = '';

        if (res.message == 'success') {
          severity = 'success';
          title = 'Password Changed!';
          message = res.info;
          this._Router.navigate(['auth/signin']);
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
