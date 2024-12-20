import { Component } from '@angular/core';
import { MainMenuItemComponent } from '../../../shared/components/ui/main-menu-item/main-menu-item.component';
import { LogOutBtnComponent } from '../../../shared/components/business/log-out-btn/log-out-btn.component';
import { RouterOutlet } from '@angular/router';
import { MainNavBarComponent } from '../../pages/main-nav-bar/main-nav-bar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    MainMenuItemComponent,
    LogOutBtnComponent,
    RouterOutlet,
    MainNavBarComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
