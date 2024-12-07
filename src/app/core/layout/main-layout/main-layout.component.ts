import { Component } from '@angular/core';
import { MainMenuItemComponent } from '../../../shared/components/ui/main-menu-item/main-menu-item.component';
import { LogOutBtnComponent } from '../../../shared/components/business/log-out-btn/log-out-btn.component';
import { CustomModalComponent } from '../../../shared/components/ui/custom-modal/custom-modal.component';
import { PrimaryButtonComponent } from '../../../shared/components/ui/primary-button/primary-button.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    MainMenuItemComponent,
    LogOutBtnComponent,
    CustomModalComponent,
    PrimaryButtonComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
