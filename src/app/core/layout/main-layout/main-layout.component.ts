import { Component, HostListener } from '@angular/core';
import { MainMenuItemComponent } from '../../../shared/components/ui/main-menu-item/main-menu-item.component';
import { LogOutBtnComponent } from '../../../shared/components/business/log-out-btn/log-out-btn.component';
import { RouterOutlet } from '@angular/router';
import { MainNavBarComponent } from '../../pages/main-nav-bar/main-nav-bar.component';
import { CollapsedNavBarComponent } from '../../pages/collapsed-nav-bar/collapsed-nav-bar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    MainMenuItemComponent,
    LogOutBtnComponent,
    RouterOutlet,
    MainNavBarComponent,
    CollapsedNavBarComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  public innerWidth: any;
  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    console.log(`Current Window Size is : ${this.innerWidth}`);
  }
}
