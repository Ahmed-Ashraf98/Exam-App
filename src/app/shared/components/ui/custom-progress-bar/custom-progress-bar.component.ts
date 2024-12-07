import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './custom-progress-bar.component.html',
  styleUrl: './custom-progress-bar.component.scss',
})
export class CustomProgressBarComponent {
  @Input() progeressPrecentage: string = '0';
}
