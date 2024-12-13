import { Component, inject } from '@angular/core';
import { AuthApiManagerService } from 'auth-api-manager';
import { baseUrl } from '../../../../core/environment/environment.prod';

@Component({
  selector: 'app-log-out-btn',
  standalone: true,
  imports: [],
  templateUrl: './log-out-btn.component.html',
  styleUrl: './log-out-btn.component.scss',
})
export class LogOutBtnComponent {
  // Inject Services
  private readonly _AuthApiManagerService = inject(AuthApiManagerService);
  showLogoutDialog() {}

  logout() {
    this._AuthApiManagerService.logout(baseUrl).subscribe({
      next: (res) => {
        console.log(res);
        //TODO: Navigate to signon page
      },
    });
  }
}
