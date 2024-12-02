import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { FormsManagerComponent } from '../../../shared/components/business/forms-manager/forms-manager.component';
import { formTypes } from '../../../shared/enums/formTypes';
import { InputValidationAlertComponent } from '../../../shared/components/business/input-validation-alert/input-validation-alert.component';
import { AuthApiManagerService } from 'auth-api-manager';
import { ToastComponent } from '../../../shared/components/ui/toast/toast.component';
import { EmailSignal } from '../../../features/services/email.signal.service';
import { FormUtilsService } from '../../../shared/services/form-utils-service.service';
import { baseUrl } from '../../environment/environment.prod';
import { PrimaryButtonComponent } from '../../../shared/components/ui/primary-button/primary-button.component';
import { AuthFormsService } from 'auth-forms';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    PrimaryButtonComponent,
    InputValidationAlertComponent,
    ToastComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  // inject services
  private readonly _AuthApiManagerService = inject(AuthApiManagerService);
  private readonly _Router = inject(Router);
  private readonly _EmailSignal = inject(EmailSignal);
  private readonly _AuthFormsService = inject(AuthFormsService);
  private readonly _FormUtilsService = inject(FormUtilsService);
  // Create instance from toaster
  private readonly _Toaster = new ToastComponent();
  // initialize the variables
  resetPassForm = this._AuthFormsService.resetPassFormBuilder();
  isSubmitted = false;

  // Run functions when the component is initialized
  ngOnInit(): void {
    this.setTheEmail();
    this._FormUtilsService.disableField(this.resetPassForm, 'rePassword');
  }

  /**
   * @summary Check if the [ Password ] input entered without validation error, if so then enable the [ Re-Password ] input otherwise disable the [ Re-Password ] input
   */
  control_RePassword() {
    if (this.resetPassForm.get('password')?.valid) {
      this._FormUtilsService.enableField(this.resetPassForm, 'rePassword');
    } else {
      this._FormUtilsService.disableField(this.resetPassForm, 'rePassword');
      this._FormUtilsService.clearField(this.resetPassForm, 'rePassword');
    }
  }

  /**
   * @summary This function set the email value stored in the signal into the reset form [ in the hidden email input ]
   */
  setTheEmail() {
    let email = this._EmailSignal.getData();
    console.log('The email..........> ', email);
    this.resetPassForm.get('email')?.setValue(email);
  }

  /**
   * @summary Send the data to Reset Pass API, after successful API Call the following should happen :
   *  - The app will re-direct the user to the Sign-In Page
   *  - The user password is updated
   * @param data The form data
   */
  resetPass(data: any) {
    this.isSubmitted = true;
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
