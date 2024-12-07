import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-report-card',
  standalone: true,
  imports: [],
  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.scss',
})
export class ReportCardComponent {
  @Input() classes: string = '';
  @Input() reportIcon: string = '';
  @Input() reportTitle: string = '';
  @Input() reportResult: string = '';
}
