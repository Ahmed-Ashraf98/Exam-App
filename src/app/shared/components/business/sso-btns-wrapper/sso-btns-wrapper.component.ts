import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { SsoButtonComponent } from '../../ui/sso-button/sso-button.component';
import {
  GoogleLoginProvider,
  SocialAuthService,
  GoogleSigninButtonModule,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { CookieManagerService } from '../../../../core/services/cookie-manager.service';
import { AuthApiManagerService } from 'auth-api-manager';
import { TokenManagerService } from '../../../../core/services/token-manager.service';
import { baseUrl } from '../../../../core/environment/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sso-btns-wrapper',
  standalone: true,
  imports: [SsoButtonComponent, GoogleSigninButtonModule],
  templateUrl: './sso-btns-wrapper.component.html',
  styleUrl: './sso-btns-wrapper.component.scss',
})
export class SsoBtnsWrapperComponent {
  private _CookieManagerService = inject(CookieManagerService);
  private _TokenManagerService = inject(TokenManagerService);
  private _AuthApiManagerService = inject(AuthApiManagerService);
  private _Router = inject(Router);

  user: SocialUser | undefined;
  loggedIn: boolean | undefined;
  canNavigate: boolean = false;
  constructor(private authService: SocialAuthService) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      console.log('-------------- user --------------');
      console.log(user);
      this.user = user;
      this.loggedIn = user != null;
      if (this.loggedIn) {
        this._CookieManagerService.setCookie('photoUrl', user.photoUrl);
        this.register(user);
      }
    });
  }

  /**
   * @summary Login with Google
   */

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  register(data: SocialUser) {
    let dataSignUp = {
      email: data.email,
      username: data.email.slice(0, data.email.indexOf('@')),
      firstName: data.firstName,
      lastName: data.lastName,
      phone: '01272040125',
      password: 'P@ssw0rd',
      rePassword: 'P@ssw0rd',
    };

    let dataLogin = {
      email: data.email,
      password: 'P@ssw0rd',
    };

    this._AuthApiManagerService.register(baseUrl, dataSignUp).subscribe({
      next: (res) => {
        let severity = '';
        let title = '';
        let message = '';

        if (res.message == 'success') {
          severity = 'success';
          title = 'Welcome!';
          message = 'You have created an account successfully';
          this._TokenManagerService.setToken(res.token);
          this._Router.navigate(['/main/dashboard']);
        } else {
          let errorMsg = res.error.message;
          severity = 'error';
          title = 'Error!';
          message = errorMsg;
          console.log(errorMsg);
          this.login(dataLogin);
        }

        //this._Toaster.showToaster(severity, title, message);
      },
    });
  }

  login(data: any) {
    this._AuthApiManagerService.login(baseUrl, data).subscribe({
      next: (res) => {
        let severity = '';
        let title = '';
        let message = '';
        if (res.message == 'success') {
          severity = 'success';
          title = 'Welcome!';
          message = 'You have logged-in successfully';
          this._TokenManagerService.setToken(res.token);
          this.canNavigate = true;
        } else {
          let errorMsg = res.error.message;
          severity = 'error';
          title = 'Error!';
          message = errorMsg;
          console.log(errorMsg);
        }

        //this._Toaster.showToaster(severity, title, message);
        this.canNavigate && this._Router.navigate(['/main/dashboard']);
      },
    });
  }
}
