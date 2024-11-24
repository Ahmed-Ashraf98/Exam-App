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
  registerForm = new FormsManagerComponent(formTypes.Register).getForm();

  receiveBtnAction(data: MouseEvent) {
    // Start Calling API
  }
  ngOnInit(): void {
    this.disableRePassword();
  }

  checkPassword() {
    console.log('Checking Password .....');
    if (this.registerForm.get('password')?.valid) {
      this.enableRePassword();
    } else {
      this.disableRePassword();
      this.clearRePassword();
    }
  }

  disableRePassword() {
    this.registerForm.get('rePassword')?.disable();
  }

  enableRePassword() {
    this.registerForm.get('rePassword')?.enable();
  }

  clearRePassword() {
    this.registerForm.get('rePassword')?.setValue('');
  }

  register(data: any) {
    this._AuthApiManagerService.register(data).subscribe({
      next: (res) => {
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
