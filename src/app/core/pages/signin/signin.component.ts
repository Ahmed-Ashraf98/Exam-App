import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { PrimaryButtonComponent } from '../../../shared/components/ui/primary-button/primary-button.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { InputValidationAlertComponent } from '../../../shared/components/business/input-validation-alert/input-validation-alert.component';
import { AuthApiManagerService } from 'auth-api-manager';
import { ToastComponent } from '../../../shared/components/ui/toast/toast.component';
import { baseUrl } from '../../environment/environment.prod';
import { AuthFormsService } from 'auth-forms';
import { TokenManagerService } from '../../services/token-manager.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-signin',
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
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  // inject services
  private readonly _AuthApiManagerService = inject(AuthApiManagerService);
  private readonly _AuthFormsService = inject(AuthFormsService);
  private readonly _TokenManagerService = inject(TokenManagerService);
  private readonly _Router = inject(Router);
  private readonly _AuthService = inject(SocialAuthService);
  // Create instance from toaster
  private readonly _Toaster = new ToastComponent();
  // initialize the variables
  signinForm = this._AuthFormsService.loginFormBuilder();
  isSubmitted = false;
  canNavigate = false;

  /**
   * @summary Send the form data to Login API
   * @param data The form data
   */
  login(data: any) {
    this.isSubmitted = true;
    this._AuthApiManagerService.login(baseUrl, data).subscribe({
      next: (res) => {
        this.isSubmitted = false;
        let severity = '';
        let title = '';
        let message = '';
        if (res.message == 'success') {
          severity = 'success';
          title = 'Welcome!';
          message = 'You have logged-in successfully';
          this._TokenManagerService.setToken = res.token;
          this.canNavigate = true;
        } else {
          let errorMsg = res.error.message;
          severity = 'error';
          title = 'Error!';
          message = errorMsg;
        }

        this._Toaster.showToaster(severity, title, message);
        this.canNavigate && this._Router.navigate(['/main/dashboard']);
      },
    });
  }
}
