import { Component } from '@angular/core';
import { MainMenuItemComponent } from '../../../shared/components/ui/main-menu-item/main-menu-item.component';
import { LogOutBtnComponent } from '../../../shared/components/business/log-out-btn/log-out-btn.component';
import { PrimaryButtonComponent } from '../../../shared/components/ui/primary-button/primary-button.component';
import { ReportCardComponent } from '../../../shared/components/ui/report-card/report-card.component';
import { CustomSectionComponent } from '../../../shared/components/ui/custom-section/custom-section.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    MainMenuItemComponent,
    LogOutBtnComponent,
    PrimaryButtonComponent,
    ReportCardComponent,
    CustomSectionComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
