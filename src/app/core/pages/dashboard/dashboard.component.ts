import { Component } from '@angular/core';
import { ReportCardComponent } from '../../../shared/components/ui/report-card/report-card.component';
import { CustomProgressBarComponent } from '../../../shared/components/ui/custom-progress-bar/custom-progress-bar.component';
import { CustomSectionComponent } from '../../../shared/components/ui/custom-section/custom-section.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ReportCardComponent,
    CustomProgressBarComponent,
    CustomSectionComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
