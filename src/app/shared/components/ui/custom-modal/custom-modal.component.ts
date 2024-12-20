import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-custom-modal',
  standalone: true,
  imports: [],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.scss',
})
export class CustomModalComponent {
  @Input() modalWidth?: number;
  @Input() modalMinWidth?: number;
}
