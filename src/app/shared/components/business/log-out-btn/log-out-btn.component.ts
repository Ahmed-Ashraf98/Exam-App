import { Component, inject } from '@angular/core';
import { AuthApiManagerService } from 'auth-api-manager';
import { baseUrl } from '../../../../core/environment/environment.prod';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
import { CustomModalComponent } from '../../ui/custom-modal/custom-modal.component';
import { TokenManagerService } from '../../../../core/services/token-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out-btn',
  standalone: true,
  imports: [LogoutModalComponent, CustomModalComponent],
  templateUrl: './log-out-btn.component.html',
  styleUrl: './log-out-btn.component.scss',
})
export class LogOutBtnComponent {
  // Inject Services
  private readonly _AuthApiManagerService = inject(AuthApiManagerService);
  private readonly _TokenManagerService = inject(TokenManagerService);
  private readonly _Router = inject(Router);
  showModal: boolean = false;

  showLogoutDialog() {
    this.showModal = true;
  }

  leaveAppDecision(val: boolean) {
    switch (val) {
      case true:
        this.logout();
        break;
      case false:
        this.closeLogoutDialog();
        break;
    }
  }

  closeLogoutDialog() {
    console.log('Ok stay');
    this.showModal = false;
    console.log(this.showModal);
  }

  logout() {
    this._AuthApiManagerService.logout(baseUrl).subscribe({
      next: (res) => {
        console.log(res);
        console.log('Ok Bye');
        this._TokenManagerService.clearToken();
        this._Router.navigate(['auth/signin']);
      },
    });
  }
}
