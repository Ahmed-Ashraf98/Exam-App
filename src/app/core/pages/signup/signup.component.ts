import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { PrimaryButtonComponent } from '../../../shared/components/ui/primary-button/primary-button.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { InputValidationAlertComponent } from '../../../shared/components/business/input-validation-alert/input-validation-alert.component';
import { AuthApiManagerService } from 'auth-api-manager';
import { ToastComponent } from '../../../shared/components/ui/toast/toast.component';
import { FormUtilsService } from 'auth-forms';
import { EmailSignal } from '../../../features/services/email.signal.service';
import { baseUrl } from '../../environment/environment.prod';
import { AuthFormsService } from 'auth-forms';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    PrimaryButtonComponent,
    RouterLink,
    RouterLinkActive,
    InputValidationAlertComponent,
    ToastComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  // inject services
  private readonly _AuthApiManagerService = inject(AuthApiManagerService);
  private readonly _Router = inject(Router);
  private readonly _EmailSignal = inject(EmailSignal);
  private readonly _FormUtilsService = inject(FormUtilsService);
  private readonly _AuthFormsService = inject(AuthFormsService);

  // Create instance from toaster
  private readonly _Toaster = new ToastComponent();

  // initialize the variables
  registerForm = this._AuthFormsService.registerFormBuilder();
  isSubmitted = false;

  // Run functions when component is initialized
  ngOnInit(): void {
    this._EmailSignal.setData(null);
    this._FormUtilsService.disableField(this.registerForm, 'rePassword');
  }

  /**
   * @summary Check if the [ Password ] input entered without validation error, if so then enable the [ Re-Password ] input otherwise disable the [ Re-Password ] input
   */
  control_RePassword() {
    if (this.registerForm.get('password')?.valid) {
      this._FormUtilsService.enableField(this.registerForm, 'rePassword');
    } else {
      this._FormUtilsService.disableField(this.registerForm, 'rePassword');
      this._FormUtilsService.clearField(this.registerForm, 'rePassword');
    }
  }

  /**
   * @summary  Submit data to register API
   * @param data  The form data
   */
  register(data: any) {
    this.isSubmitted = true;
    this._AuthApiManagerService.register(baseUrl, data).subscribe({
      next: (res) => {
        this.isSubmitted = false;
        let severity = '';
        let title = '';
        let message = '';

        if (res.message == 'success') {
          severity = 'success';
          title = 'Welcome!';
          message = 'You have created an account successfully';
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
