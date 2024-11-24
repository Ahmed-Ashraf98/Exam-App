import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { SsoButtonComponent } from '../../../shared/components/ui/sso-button/sso-button.component';
import { Languages } from '../../../shared/enums/langOptions';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  ],
  templateUrl: './auth-layout.component.html',
  providers: [MessageService], // Add this line to provide the MessageService
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent implements OnInit {
  currentLang: Languages = Languages.en;
  otherLang: Languages = Languages.ar;

  items!: MenuItem[];

  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
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

  updateLang(newLang: Languages) {
    this.otherLang = this.currentLang;
    this.currentLang = newLang;
    this.setLangList();
    // this.messageService.add({
    //   severity: 'success',
    //   summary: 'Success',
    //   detail: 'Data Updated',
    // });
  }
}
