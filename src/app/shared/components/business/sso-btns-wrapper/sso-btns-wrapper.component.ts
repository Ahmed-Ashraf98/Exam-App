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
import {
  baseUrl,
  Default_Pass,
  Default_Phone,
} from '../../../../core/environment/environment.prod';
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

  signUp_Obj: any = {};
  login_Obj: any = {};
  resetPass_Obj: any = {};

  constructor(private authService: SocialAuthService) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      console.log('-------------- user --------------');
      console.log(user);
      this.user = user;
      this.loggedIn = user != null;
      if (this.loggedIn) {
        this._CookieManagerService.setCookie('photoUrl', user.photoUrl);
        this.signUp_Obj = {
          email: user.email,
          username: user.email.slice(0, user.email.indexOf('@')),
          firstName: user.firstName,
          lastName: user.lastName,
          phone: Default_Phone,
          password: Default_Pass,
          rePassword: Default_Pass,
        };
        this.login_Obj = {
          email: user.email,
          password: Default_Pass,
        };
        this.resetPass_Obj = {
          email: user.email,
          newPassword: Default_Pass,
        };
        this.register();
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

  register() {
    this._AuthApiManagerService.register(baseUrl, this.signUp_Obj).subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this._TokenManagerService.setToken(res.token);
          this._Router.navigate(['/main/dashboard']);
        } else {
          let errorMsg = res.error.message;
          console.log(errorMsg);
          this.login();
        }
      },
    });
  }

  login() {
    this._AuthApiManagerService.login(baseUrl, this.login_Obj).subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this._TokenManagerService.setToken(res.token);
          this.canNavigate = true;
        } else {
          let errorMsg = res.error.message;

          console.log(errorMsg);
        }
        this.canNavigate && this._Router.navigate(['/main/dashboard']);
      },
    });
  }
}
