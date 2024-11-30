import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { AuthButtonComponent } from '../../../shared/components/ui/auth-button/auth-button.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsManagerComponent } from '../../../shared/components/business/forms-manager/forms-manager.component';
import { formTypes } from '../../../shared/enums/formTypes';
import { InputValidationAlertComponent } from '../../../shared/components/business/input-validation-alert/input-validation-alert.component';
import { AuthApiManagerService } from 'auth-api-manager';
import { ToastComponent } from '../../../shared/components/ui/toast/toast.component';
import { FormUtilsService } from '../../../shared/services/form-utils-service.service';
import { EmailSignal } from '../../../features/services/email.signal.service';
import { baseUrl } from '../../environment/environment.prod';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    AuthButtonComponent,
    RouterLink,
    RouterLinkActive,
    InputValidationAlertComponent,
    ToastComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  private readonly _AuthApiManagerService = inject(AuthApiManagerService);
  private readonly _Toaster = new ToastComponent();
  private readonly _Router = inject(Router);
  private readonly _EmailSignal = inject(EmailSignal);
  registerForm = new FormsManagerComponent(formTypes.Register).getForm();
  private readonly _FormUtilsService = inject(FormUtilsService);
  isSubmitted = false;
  ngOnInit(): void {
    this._EmailSignal.setData(null);
    this._FormUtilsService.disableRePassword(this.registerForm);
  }

  handlePasswordsMatching() {
    this._FormUtilsService.checkPassword(this.registerForm);
  }

  test() {
    console.log(this.registerForm);
    console.log(
      this.registerForm.get('rePassword')?.touched ||
        this.registerForm.get('rePassword')?.dirty
    );
    console.log(this.registerForm.getError('mismatch'));
    console.log('rePassword' === 'rePassword');
  }

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
