import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthButtonComponent } from '../../../shared/components/ui/auth-button/auth-button.component';
import { Router } from '@angular/router';
import { FormsManagerComponent } from '../../../shared/components/business/forms-manager/forms-manager.component';
import { formTypes } from '../../../shared/enums/formTypes';
import { InputTextModule } from 'primeng/inputtext';
import { InputValidationAlertComponent } from '../../../shared/components/business/input-validation-alert/input-validation-alert.component';
import { AuthApiManagerService } from 'auth-api-manager';
import { ToastComponent } from '../../../shared/components/ui/toast/toast.component';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AuthButtonComponent,
    InputTextModule,
    InputValidationAlertComponent,
    ToastComponent,
  ],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss',
})
export class VerifyCodeComponent {
  private readonly _AuthApiManagerService = inject(AuthApiManagerService);
  private readonly _Toaster = new ToastComponent();
  private readonly _Router = inject(Router);
  verifyCodeForm = new FormsManagerComponent(formTypes.VerifyCode).getForm();

  verifyCode(data: any) {
    this._AuthApiManagerService.verifyCode(data).subscribe({
      next: (res) => {
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
}
