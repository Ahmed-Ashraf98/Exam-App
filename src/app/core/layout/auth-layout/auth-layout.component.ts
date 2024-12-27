import { Component, inject, OnInit } from '@angular/core';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { SsoButtonComponent } from '../../../shared/components/ui/sso-button/sso-button.component';
import { Languages } from '../../../shared/enums/langOptions';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  SocialAuthService,
  GoogleSigninButtonModule,
  SocialUser,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    SplitButtonModule,
    ToastModule,
    ButtonModule,
    SsoButtonComponent,
    RouterLink,
    RouterLinkActive,
    GoogleSigninButtonModule,
  ],
  templateUrl: './auth-layout.component.html',
  providers: [MessageService], // Add this line to provide the MessageService
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent implements OnInit {
  private readonly _AuthService = inject(SocialAuthService);
  currentLang: Languages = Languages.en;
  otherLang: Languages = Languages.ar;
  items!: MenuItem[];
  user!: SocialUser;
  loggedIn!: boolean;

  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: SocialAuthService
  ) {
    this.setLangList();
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  setLangList() {
    this.items = [
      {
        label: this.otherLang,
        command: () => {
          this.updateLang(this.otherLang);
        },
      },
    ];
  }

  /**
   * @summary Login with Google
   */

  updateLang(newLang: Languages) {
    this.otherLang = this.currentLang;
    this.currentLang = newLang;
    this.setLangList();
  }
}
